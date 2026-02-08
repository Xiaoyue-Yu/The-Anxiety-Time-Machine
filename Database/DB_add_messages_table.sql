-- ======================================================
-- Add Messages Table for User History Tracking
-- ======================================================

USE `The_Anxiety_Time_Machine`;

-- Create messages table to store all user messages
CREATE TABLE IF NOT EXISTS user_messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    description TEXT NOT NULL,
    tag VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_created_at (created_at)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- ======================================================
-- Optional: Migrate existing descriptions to new table
-- ======================================================
-- INSERT INTO user_messages (user_id, description, tag, created_at)
-- SELECT id, description, tag, created_at 
-- FROM users 
-- WHERE description IS NOT NULL;
