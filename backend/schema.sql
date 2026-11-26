CREATE DATABASE IF NOT EXISTS stadiecon
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE stadiecon;

-- =====================================================
-- Users — shared identity for athletes + brands + admin
-- =====================================================
CREATE TABLE IF NOT EXISTS users (
  id            INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name          VARCHAR(120) NOT NULL,
  email         VARCHAR(190) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role          ENUM('athlete','brand','admin') NOT NULL DEFAULT 'athlete',
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- =====================================================
-- Athlete profile — extends users
-- =====================================================
CREATE TABLE IF NOT EXISTS athlete_profiles (
  id            INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id       INT UNSIGNED NOT NULL UNIQUE,
  discipline    VARCHAR(80),
  date_of_birth DATE,
  gender        ENUM('male','female','other'),
  location      VARCHAR(120),
  bio           TEXT,
  personal_best VARCHAR(60),
  photo_url     VARCHAR(500),
  verified      BOOLEAN NOT NULL DEFAULT FALSE,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_athlete_user
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- =====================================================
-- Brand profile — extends users
-- =====================================================
CREATE TABLE IF NOT EXISTS brand_profiles (
  id           INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id      INT UNSIGNED NOT NULL UNIQUE,
  company_name VARCHAR(160),
  industry     VARCHAR(80),
  website      VARCHAR(255),
  description  TEXT,
  logo_url     VARCHAR(500),
  verified     BOOLEAN NOT NULL DEFAULT FALSE,
  created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_brand_user
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;