import pandas as pd
from sqlalchemy import create_engine, text
#from werkzeug.security import generate_password_hash

# ==================================
DB_USER = 'root'
DB_PASSWORD = 'password' # To-do: substitute with your actual MySQL password
DB_HOST = 'localhost'
DB_NAME = 'The Anxiety Time Machine'
CSV_FILE = 'The-Anxiety-Time-Machine/Database/Anxiety_Table.xlsx'

# =================================
connection_string = f"mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}/{DB_NAME}?charset=utf8mb4"
engine = create_engine(connection_string)

def import_data():
    try:
        df = pd.read_excel(CSV_FILE)
        print(f"{len(df)} pieces of data have been loaded...")
        with engine.connect() as conn:
            trans = conn.begin()
            try:
                conn.execute(text("TRUNCATE TABLE users"))
                
                # Insert data
                print("正在插入新数据...")
                for index, row in df.iterrows():
                    insert_sql = text("""
                        INSERT INTO users (nickname, age, password, gender, tag, description) 
                        VALUES (:nick, :age, :pwd, :gen, :tag, :desc)
                    """)
                    
                    conn.execute(insert_sql, {
                        "nick": row['nickname'], 
                        "age": row['age'], 
                        "pwd": row['password'],  
                        "gen": row['gender'],
                        "tag": row['tag'],          
                        "desc": row['description']
                    })

                trans.commit()
                print("✅")

            except Exception as e:
                trans.rollback()
                print(f"❌ : {e}")

    except Exception as e:
        print(f"Fail to connect the database: {e}")

if __name__ == "__main__":
    import_data()