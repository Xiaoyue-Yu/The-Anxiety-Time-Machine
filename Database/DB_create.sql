-- ======================================================
-- The Anxiety Time Machine - Create Schema (Focus on Anxiety Upload)
-- ======================================================

drop schema if exists `The Anxiety Time Machine` ;

create schema `The Anxiety Time Machine` default character set utf8mb4 collate utf8mb4_unicode_ci;

-- ======================================================

use `The Anxiety Time Machine`;

-- ======================================================

CREATE TABLE IF NOT EXISTS User (
  user_id INT NOT NULL AUTO_INCREMENT,
  nickname VARCHAR(45) NOT NULL,
  gender VARCHAR(20) NULL,
  age INT NOT NULL,
  PRIMARY KEY (user_id)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS Tag (
  tag_id INT NOT NULL AUTO_INCREMENT,
  type VARCHAR(45) NOT NULL,            
  tag_description VARCHAR(255) NULL,
  PRIMARY KEY (tag_id)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS Message (
  message_id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  tag_id INT NOT NULL,
  message_description TEXT NOT NULL,
  PRIMARY KEY (message_id),
  CONSTRAINT fk_Message_User FOREIGN KEY (user_id) REFERENCES User (user_id) ON DELETE CASCADE,
  CONSTRAINT fk_Message_Tag FOREIGN KEY (tag_id) REFERENCES Tag (tag_id)
) ENGINE = InnoDB;