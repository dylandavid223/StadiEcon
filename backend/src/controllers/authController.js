import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { prisma } from '../config/prisma.js'

function signToken(user) {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET environment variable is not set')
  }
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  )
}

function publicUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    created_at: user.createdAt,
  }
}

export async function register(req, res) {
  try {
    const { name, email, password, role } = req.body

    if (!name || !email || !password || !role) {
      return res.status(400).json({
        message: 'All fields are required',
        received: { name: !!name, email: !!email, password: !!password, role: !!role },
      })
    }
    if (!['athlete', 'brand'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role', role })
    }
    if (password.length < 8) {
      return res.status(400).json({ message: 'Password must be at least 8 characters' })
    }

    const normalizedEmail = email.trim().toLowerCase()

    const existing = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    })
    if (existing) {
      return res.status(409).json({ message: 'Email already registered' })
    }

    const passwordHash = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        name: name.trim(),
        email: normalizedEmail,
        passwordHash,
        role,
        ...(role === 'athlete'
          ? { athleteProfile: { create: {} } }
          : { brandProfile: { create: {} } }),
      },
    })

    return res.status(201).json({
      token: signToken(user),
      user: publicUser(user),
    })
  } catch (err) {
    console.error('register error:', err)
    return res.status(500).json({
      message: 'Registration failed',
      error: err.message,
      code: err.code,
      stack: err.stack,
    })
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' })
    }

    const user = await prisma.user.findUnique({
      where: { email: email.trim().toLowerCase() },
    })
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const match = await bcrypt.compare(password, user.passwordHash)
    if (!match) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    return res.json({
      token: signToken(user),
      user: publicUser(user),
    })
  } catch (err) {
    console.error('login error:', err)
    return res.status(500).json({
      message: 'Login failed',
      error: err.message,
      code: err.code,
    })
  }
}

export async function me(req, res) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    })
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    return res.json({ user })
  } catch (err) {
    console.error('me error:', err)
    return res.status(500).json({
      message: 'Failed to fetch user',
      error: err.message,
      code: err.code,
    })
  }
}