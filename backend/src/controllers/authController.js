import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { pool } from '../config/db.js'

function signToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  )
}

function publicUser(row) {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    role: row.role,
    created_at: row.created_at,
  }
}

/* ---------- POST /api/auth/register ---------- */
export async function register(req, res) {
  try {
    const { name, email, password, role } = req.body

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: 'All fields are required' })
    }
    if (!['athlete', 'brand'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' })
    }
    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: 'Password must be at least 8 characters' })
    }

    const normalizedEmail = email.trim().toLowerCase()

    const [existing] = await pool.query(
      'SELECT id FROM users WHERE email = ? LIMIT 1',
      [normalizedEmail]
    )
    if (existing.length > 0) {
      return res.status(409).json({ message: 'Email already registered' })
    }

    const password_hash = await bcrypt.hash(password, 10)

    const conn = await pool.getConnection()
    try {
      await conn.beginTransaction()

      const [userResult] = await conn.query(
        `INSERT INTO users (name, email, password_hash, role)
         VALUES (?, ?, ?, ?)`,
        [name.trim(), normalizedEmail, password_hash, role]
      )
      const userId = userResult.insertId

      // Auto-create empty profile row based on role
      if (role === 'athlete') {
        await conn.query(
          'INSERT INTO athlete_profiles (user_id) VALUES (?)',
          [userId]
        )
      } else {
        await conn.query(
          'INSERT INTO brand_profiles (user_id) VALUES (?)',
          [userId]
        )
      }

      await conn.commit()

      const user = {
        id: userId,
        name: name.trim(),
        email: normalizedEmail,
        role,
        created_at: new Date(),
      }

      return res.status(201).json({
        token: signToken(user),
        user: publicUser(user),
      })
    } catch (err) {
      await conn.rollback()
      throw err
    } finally {
      conn.release()
    }
  } catch (err) {
    console.error('register error:', err)
    return res.status(500).json({ message: 'Registration failed' })
  }
}

/* ---------- POST /api/auth/login ---------- */
export async function login(req, res) {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' })
    }

    const [rows] = await pool.query(
      'SELECT * FROM users WHERE email = ? LIMIT 1',
      [email.trim().toLowerCase()]
    )
    if (rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const user = rows[0]
    const match = await bcrypt.compare(password, user.password_hash)
    if (!match) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    return res.json({
      token: signToken(user),
      user: publicUser(user),
    })
  } catch (err) {
    console.error('login error:', err)
    return res.status(500).json({ message: 'Login failed' })
  }
}

/* ---------- GET /api/auth/me (protected) ---------- */
export async function me(req, res) {
  try {
    const [rows] = await pool.query(
      'SELECT id, name, email, role, created_at FROM users WHERE id = ? LIMIT 1',
      [req.user.id]
    )
    if (rows.length === 0) {
      return res.status(404).json({ message: 'User not found' })
    }
    return res.json({ user: rows[0] })
  } catch (err) {
    console.error('me error:', err)
    return res.status(500).json({ message: 'Failed to fetch user' })
  }
}