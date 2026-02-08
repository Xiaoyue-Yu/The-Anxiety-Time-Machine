"""
Update user_messages table to include message_id and re-migrate data
"""

import pymysql

DB_CONFIG = {
    'host': 'localhost',
    'user': 'root',
    'password': 'Lucy0401()',
    'database': 'The_Anxiety_Time_Machine',
}

def update_and_migrate():
    try:
        conn = pymysql.connect(**DB_CONFIG)
        cursor = conn.cursor(pymysql.cursors.DictCursor)
        
        # Step 1: Add message_id column to user_messages table
        print("📝 Adding message_id column to user_messages table...")
        try:
            cursor.execute("""
                ALTER TABLE user_messages 
                ADD COLUMN message_id INT DEFAULT 1 AFTER tag
            """)
            conn.commit()
            print("✅ Column added successfully!")
        except Exception as e:
            if "Duplicate column name" in str(e):
                print("ℹ️  Column message_id already exists, skipping...")
            else:
                raise e
        
        # Step 2: Clear existing data
        print("🗑️  Clearing existing data from user_messages...")
        cursor.execute("DELETE FROM user_messages")
        conn.commit()
        
        # Step 3: Re-migrate all data with message_id
        print("📋 Re-migrating data from users table...")
        query_select = """
            SELECT id, nickname, description, tag, message_id, created_at 
            FROM users 
            WHERE description IS NOT NULL AND description != ''
        """
        cursor.execute(query_select)
        users_with_messages = cursor.fetchall()
        
        if not users_with_messages:
            print("ℹ️  No messages found to migrate.")
            cursor.close()
            conn.close()
            return
        
        print(f"📊 Found {len(users_with_messages)} records to migrate...")
        
        # Group by nickname to get the base user_id for each nickname
        nickname_to_user_id = {}
        query_insert = """
            INSERT INTO user_messages (user_id, description, tag, message_id, created_at)
            VALUES (%s, %s, %s, %s, %s)
        """
        
        migrated_count = 0
        for record in users_with_messages:
            nickname = record['nickname']
            
            # Use the first occurrence of this nickname as the base user_id
            if nickname not in nickname_to_user_id:
                # Get the earliest user ID for this nickname
                cursor.execute(
                    "SELECT id FROM users WHERE nickname = %s ORDER BY id ASC LIMIT 1",
                    (nickname,)
                )
                base_user = cursor.fetchone()
                nickname_to_user_id[nickname] = base_user['id']
            
            base_user_id = nickname_to_user_id[nickname]
            message_id = record.get('message_id', 1)  # Default to 1 if not set
            
            try:
                cursor.execute(query_insert, (
                    base_user_id,
                    record['description'],
                    record['tag'],
                    message_id,
                    record['created_at']
                ))
                migrated_count += 1
            except Exception as e:
                print(f"⚠️  Error migrating record: {e}")
        
        conn.commit()
        
        print(f"✅ Successfully migrated {migrated_count} messages!")
        print(f"👥 Unique users: {len(nickname_to_user_id)}")
        
        # Show summary by message_id
        cursor.execute("""
            SELECT message_id, COUNT(*) as count 
            FROM user_messages 
            GROUP BY message_id
        """)
        summary = cursor.fetchall()
        print("\n📊 Message breakdown:")
        for row in summary:
            msg_type = "Anxiety" if row['message_id'] == 1 else "Happy Moment"
            print(f"   {msg_type} (message_id={row['message_id']}): {row['count']} messages")
        
        cursor.close()
        conn.close()
        
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == '__main__':
    print("🚀 Starting database update and migration...")
    print("=" * 60)
    update_and_migrate()
    print("=" * 60)
    print("✨ Complete!")
