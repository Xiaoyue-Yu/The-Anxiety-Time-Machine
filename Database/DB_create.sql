-- ======================================================
-- The Anxiety Time Machine - Create Schema (Focus on Anxiety Upload)
-- ======================================================

drop schema if exists `The Anxiety Time Machine` ;

create schema `The Anxiety Time Machine` default character set utf8mb4 collate utf8mb4_unicode_ci;

-- ======================================================

use `The Anxiety Time Machine`;

-- ======================================================

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nickname VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL DEFAULT '123456', 
    age INT NOT NULL,
    gender VARCHAR(20),
    tag VARCHAR(100),      
    description TEXT,  
  
    anxiety_level INT DEFAULT 5,  -- Optional: 1-10 scale for anxiety level
    likes INT DEFAULT 0,  -- Optional: Count of likes for the message
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci; 