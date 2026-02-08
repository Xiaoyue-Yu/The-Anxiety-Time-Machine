"""
Migrate existing descriptions from users table to user_messages table
Run this once to populate historical data
"""

import pymysql

DB_CONFIG = {
    'host': 'localhost',
    'user': 'root',
    'password': 'xxxx',  # Your MySQL Password
    'database': 'The_Anxiety_Time_Machine',
}

def migrate_data():
    try:
        conn = pymysql.connect(**DB_CONFIG)
        cursor = conn.cursor(pymysql.cursors.DictCursor)
        
        # Get all users with descriptions
        query_select = """
            SELECT id, description, tag, created_at 
            FROM users 
            WHERE description IS NOT NULL AND description != ''
        """
        cursor.execute(query_select)
        users_with_messages = cursor.fetchall()
        
        if not users_with_messages:
            print("ℹ️  No existing messages found to migrate.")
            cursor.close()
            conn.close()
            return
        
        print(f"📋 Found {len(users_with_messages)} users with messages to migrate...")
        
        # Insert into user_messages table
        query_insert = """
            INSERT INTO user_messages (user_id, description, tag, created_at)
            VALUES (%s, %s, %s, %s)
        """
        
        migrated_count = 0
        for user in users_with_messages:
            try:
                cursor.execute(query_insert, (
                    user['id'],
                    user['description'],
                    user['tag'],
                    user['created_at']
                ))
                migrated_count += 1
            except Exception as e:
                print(f"⚠️  Error migrating user {user['id']}: {e}")
        
        conn.commit()
        
        print(f"✅ Successfully migrated {migrated_count} messages to user_messages table!")
        print(f"📊 Users affected: {migrated_count}")
        
        cursor.close()
        conn.close()
        
    except Exception as e:
        print(f"❌ Error during migration: {e}")

if __name__ == '__main__':
    print("🚀 Starting data migration...")
    print("=" * 50)
    migrate_data()
    print("=" * 50)
    print("✨ Migration complete!")
