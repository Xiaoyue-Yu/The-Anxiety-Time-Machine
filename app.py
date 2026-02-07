from flask import Flask, request, jsonify
from flask_cors import CORS
import pymysql  # Using pymysql because it is more stable on Windows than flask_mysqldb

app = Flask(__name__)
CORS(app)  # Enables Cross-Origin Resource Sharing for React

# ========================================================
# 🔧 Database Configuration
# ========================================================
DB_CONFIG = {
    'host': 'localhost',
    'user': 'root',
    'password': 'xxxx',  # Your MySQL Password
    'database': 'The_Anxiety_Time_Machine',  # Database name with underscores
    'cursorclass': pymysql.cursors.DictCursor
}

# ========================================================
# 🔌 Database Connection Helper
# ========================================================
def get_db_connection():
    """Establishes a new connection to the database."""
    return pymysql.connect(**DB_CONFIG)

# ========================================================
# 🏠 Root Route (To confirm server is running)
# ========================================================
@app.route('/') 
def home():
    return "<h1>Backend is Running!</h1> <p>Go to /api/get_all_cards to test data.</p>"

# ========================================================
# 📝 Register Route
# ========================================================
@app.route('/api/register', methods=['POST'])
def register():
    try:
        data = request.json
        # Extract data from the request
        nickname = data.get('nickname')
        password = data.get('password')
        age = data.get('age')
        gender = data.get('gender')
        tag = data.get('tag')
        description = data.get('description')

        conn = get_db_connection()
        cursor = conn.cursor()
        
        # Insert user into database
        query = """
            INSERT INTO users (nickname, password, age, gender, tag, description) 
            VALUES (%s, %s, %s, %s, %s, %s)
        """
        cursor.execute(query, (nickname, password, age, gender, tag, description))
        
        conn.commit()
        cursor.close()
        conn.close()

        return jsonify({"message": "Registration successful!", "status": "success"}), 201

    except Exception as e:
        print("Register Error:", e)
        return jsonify({"message": "Registration failed.", "error": str(e)}), 500

# ========================================================
# 🔐 Login Route
# ========================================================
@app.route('/api/login', methods=['POST'])
def login():
    try:
        data = request.json
        nickname = data.get('nickname')
        password = data.get('password')

        conn = get_db_connection()
        cursor = conn.cursor()
        
        # Check if user exists
        query = "SELECT * FROM users WHERE nickname = %s AND password = %s"
        cursor.execute(query, (nickname, password))
        account = cursor.fetchone()
        
        cursor.close()
        conn.close()

        if account:
            return jsonify({
                "message": "Login successful",
                "user_id": account['id'],
                "nickname": account['nickname']
            }), 200
        else:
            return jsonify({"message": "Incorrect username or password!"}), 401

    except Exception as e:
        print("Login Error:", e)
        return jsonify({"message": "Internal server error", "error": str(e)}), 500

# ========================================================
# 🃏 Get All Cards Route
# ========================================================
@app.route('/api/get_all_cards', methods=['GET'])
def get_all_cards():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        # Fetch relevant fields. 
        # Note: Renaming 'description' to 'content' for Frontend compatibility if needed
        query = "SELECT id, nickname, age, tag, description as content, gender FROM users"
        cursor.execute(query)
        cards = cursor.fetchall()
        
        cursor.close()
        conn.close()

        return jsonify(cards), 200

    except Exception as e:
        print("Get Cards Error:", e)
        return jsonify({"cards": [], "error": str(e)}), 500

# ========================================================
# 🚀 Main Execution
# ========================================================
if __name__ == '__main__':
    app.run(debug=True, port=5000)