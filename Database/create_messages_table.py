"""
Run this script to create the user_messages table in your database
"""

import pymysql

DB_CONFIG = {
    'host': 'localhost',
    'user': 'root',
    'password': 'Lucy0401()',  # Your MySQL Password
    'database': 'The_Anxiety_Time_Machine',
}

def create_table():
    try:
        conn = pymysql.connect(**DB_CONFIG)
        cursor = conn.cursor()
        
        # Create user_messages table
        create_table_query = """
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
        """
        
        cursor.execute(create_table_query)
        conn.commit()
        
        print("✅ Table 'user_messages' created successfully!")
        
        cursor.close()
        conn.close()
        
    except Exception as e:
        print(f"❌ Error creating table: {e}")

if __name__ == '__main__':
    create_table()
