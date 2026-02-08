-- ======================================================
-- The Anxiety Time Machine - Create Schema (Focus on Anxiety Upload)
-- ======================================================

drop schema if exists `The_Anxiety_Time_Machine`;

create schema `The_Anxiety_Time_Machine` default character set utf8mb4 collate utf8mb4_unicode_ci;

-- ======================================================

use `The_Anxiety_Time_Machine`;

-- ======================================================

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nickname VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL DEFAULT '123456', 
    age INT NOT NULL,
    gender VARCHAR(20),
    tag VARCHAR(100),      
    description TEXT, 
    message_id INT,  

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;