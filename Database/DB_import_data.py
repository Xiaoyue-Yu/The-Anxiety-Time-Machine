import pandas as pd
from sqlalchemy import create_engine, text
import os

# ==================================
# 1. Database Configuration
# ==================================
DB_USER = 'root'
DB_PASSWORD = '0523'            # Your password
DB_HOST = 'localhost'
DB_NAME = 'The_Anxiety_Time_Machine'  # Your database name 

# ==================================
# 2. Smart File Path Retrieval
# ==================================
# Get the directory path where the current script is located
current_dir = os.path.dirname(os.path.abspath(__file__))

# Construct the Excel filename (assuming the file is next to the script)
excel_path = os.path.join(current_dir, 'Anxiety_Table.xlsx')

print(f"📂 Attempting to read file: {excel_path}")

# =================================
# 3. Connect to Database and Import
# =================================
connection_string = f"mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}/{DB_NAME}?charset=utf8mb4"

def import_data():
    if not os.path.exists(excel_path):
        print("❌ Error: Excel file not found!")
        print(f"Please confirm {excel_path} exists.")
        return

    try:
        # Create database engine
        engine = create_engine(connection_string)
        print("✅ Database connection successful!")

        # Read Excel
        df = pd.read_excel(excel_path, engine='openpyxl')
        print(f"📊 Successfully read Excel, preparing to import {len(df)} rows...")

        with engine.connect() as conn:
            trans = conn.begin()
            try:
                # Clear old data
                conn.execute(text("TRUNCATE TABLE users"))
                
                # Insert new data
                for index, row in df.iterrows():
                    insert_sql = text("""
                        INSERT INTO users (nickname, age, password, gender, tag, description, message_id) 
                        VALUES (:nick, :age, :pwd, :gen, :tag, :desc, :message_id)
                    """)
                    
                    conn.execute(insert_sql, {
                        "nick": row['nickname'], 
                        "age": row['age'], 
                        "pwd": str(row['password']), 
                        "gen": row['gender'],
                        "tag": row['tag'],          
                        "desc": row['description'],
                        "message_id": row['message_id']
                    })

                trans.commit()
                print("🎉 Congratulations! All data successfully imported into the database!")

            except Exception as e:
                trans.rollback()
                print(f"❌ Error inserting data: {e}")

    except Exception as e:
        print(f"❌ System error: {e}")

if __name__ == "__main__":
    import_data()