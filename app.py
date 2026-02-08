from flask import Flask, request, jsonify
from flask_cors import CORS
import pymysql
import google.generativeai as genai
import random

app = Flask(__name__)
CORS(app)  # Enables Cross-Origin Resource Sharing for React

# ========================================================
# 🔧 Database Configuration
# ========================================================
DB_CONFIG = {
    'host': 'localhost',
    'user': 'root',
    'password': 'xxxx',  # 🔴Your MySQL Password
    'database': 'The_Anxiety_Time_Machine',  # Database name with underscores
    'cursorclass': pymysql.cursors.DictCursor
}

# ========================================================
# 🤖 Gemini API Configuration
# ========================================================
GOOGLE_API_KEY = "xxxx"     # 🔴 Your Gemini API Key
genai.configure(api_key=GOOGLE_API_KEY)
model = genai.GenerativeModel('gemini-3-flash-preview')

TAG_CATEGORIES = ["Career", "Family", "Love", "Health", "Self", "Money", "Future", "Life"]

def analyze_tag_with_gemini(text):
    try:
        # Prompt design for Gemini AI
        prompt = f"""
        Analyze the emotional content of the following text and categorize it into exactly one of these tags: {TAG_CATEGORIES}.
        Text: "{text}"
        Return ONLY the tag name. If unsure, return 'Life'.
        """
        response = model.generate_content(prompt)
        tag = response.text.strip()
        
        for valid_tag in TAG_CATEGORIES:
            if valid_tag.lower() in tag.lower():
                return valid_tag
        return None 
    except Exception as e:
        print(f"Gemini AI Error: {e}")
        return None

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

        conn = get_db_connection()
        cursor = conn.cursor()
        
        # Insert user into database
        query = """
            INSERT INTO users (nickname, password, age, gender) 
            VALUES (%s, %s, %s, %s)
        """
        cursor.execute(query, (nickname, password, age, gender))
        conn.commit()
        
        # Get the ID of the newly created user
        user_id = cursor.lastrowid
        
        cursor.close()
        conn.close()

        return jsonify({
            "message": "Registration successful!", 
            "status": "success", 
            "user_id": user_id,
            "user_nickname": nickname
        }), 201

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
# 💭 Post Anxiety Message Route
# ========================================================
@app.route('/api/post_anxiety', methods=['POST'])
def post_anxiety():
    try:
        data = request.json
        user_id = data.get('user_id')
        description = data.get('description')

        # Validate required fields
        if not user_id or not description:
            return jsonify({"message": "Missing required fields: user_id or description"}), 400

        conn = get_db_connection()
        cursor = conn.cursor()
        
        # Update user's anxiety message (description field)
        query = """
            UPDATE users SET description = %s 
            WHERE id = %s
        """
        cursor.execute(query, (description, user_id))
        
        conn.commit()
        cursor.close()
        conn.close()

        return jsonify({"message": "Anxiety message posted successfully!", "status": "success"}), 201

    except Exception as e:
        print("Post Anxiety Error:", e)
        return jsonify({"message": "Failed to post anxiety message.", "error": str(e)}), 500

# ========================================================
# 🃏 Get All Anxiety Cards Route
# ========================================================
@app.route('/api/get_all_cards', methods=['GET'])
def get_all_cards():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        # Fetch users with anxiety messages
        query = """
            SELECT id, nickname, age, gender, description as content 
            FROM users 
            WHERE description IS NOT NULL
            AND message_id = 1
        """
        cursor.execute(query)
        cards = cursor.fetchall()
        
        cursor.close()
        conn.close()

        return jsonify(cards), 200

    except Exception as e:
        print("Get Cards Error:", e)
        return jsonify({"cards": [], "error": str(e)}), 500
    
# ========================================================
# Function 2
# ========================================================
@app.route('/api/pleasure/swap', methods=['POST'])
def swap_pleasure():
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        data = request.json
        user_id = data.get('user_id') 
        content = data.get('content')
        user_selected_tag = data.get('tag', 'Life')

        if not user_id:
            return jsonify({"error": "Identity missing. Please login."}), 401

        cursor.execute("SELECT nickname, age, gender FROM users WHERE id = %s", (user_id,))
        user_info = cursor.fetchone()

        if not user_info:
            return jsonify({"error": "User not found in archives."}), 404
        
        nickname = user_info['nickname']
        age = user_info['age']
        gender = user_info['gender']

        final_tag = None
        used_method = "Manual"
        
        # Method 1: Gemini AI Analysis
        try:
            ai_tag = analyze_tag_with_gemini(content)
            if ai_tag:
                final_tag = ai_tag
                used_method = "AI"
        except:
            pass
        
        # Method 2: User-selected Tag
        if not final_tag:
            final_tag = user_selected_tag

        query_insert = """
            INSERT INTO users (nickname, age, gender, tag, description, message_id, password) 
            VALUES (%s, %s, %s, %s, %s, 2, 'placeholder')
        """
        cursor.execute(query_insert, (nickname, age, gender, final_tag, content))
        conn.commit()
        
        # Prevent self-matching 
        current_msg_row_id = cursor.lastrowid

        query_swap = """
            SELECT nickname, age, gender, tag, description as content 
            FROM users 
            WHERE message_id = 2 
            AND tag LIKE %s 
            AND nickname != %s 
            AND id != %s
            ORDER BY RAND() 
            LIMIT 1
        """
        search_tag_param = f"%{final_tag}%"
        
        cursor.execute(query_swap, (search_tag_param,nickname, current_msg_row_id))
        match_result = cursor.fetchone()

        response_data = {
            "status": "success",
            "used_method": used_method,
            "final_tag": final_tag,
            "match_found": False
        }

        if match_result:
            response_data["match_found"] = True
            response_data["data"] = match_result
        else:
            response_data["message"] = f"You are the first light in the {final_tag} nebula."

        return jsonify(response_data), 201

    except Exception as e:
        print("Pleasure Swap Error:", e)
        conn.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        cursor.close()
        conn.close()

# ========================================================
# 🚀 Main Execution
# ========================================================
if __name__ == '__main__':
    app.run(debug=True, port=5000)