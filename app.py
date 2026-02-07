from flask import Flask, request, jsonify
from flask_mysqldb import MySQL
from flask_cors import CORS
import MySQLdb.cursors

app = Flask(__name__)

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'      
app.config['MYSQL_PASSWORD'] = '123456' # ⚠️ Change the password!
app.config['MYSQL_DB'] = 'anxiety_db'  

mysql = MySQL(app)
CORS(app) 

# --- Register ---

@app.route('/api/register', methods=['POST'])
def register():
    try:
        data = request.json
        nickname = data.get('nickname')
        password = data.get('password')
        age = data.get('age')
        gender = data.get('gender')
        tag = data.get('tag')
        description = data.get('description')

        cursor = mysql.connection.cursor()
        cursor.execute(
            'INSERT INTO users (nickname, password, age, gender, tag, description) VALUES (%s, %s, %s, %s, %s, %s)',
            (nickname, password, age, gender, tag, description)
        )
        mysql.connection.commit()
        cursor.close()

        return jsonify({"message": "Registration successful!", "status": "success"}), 201
    except Exception as e:
        print("Register Error:", e)
        return jsonify({"message": "Registration failed."}), 500

# --- Login ---
@app.route('/api/login', methods=['POST'])
def login():
    try:
        data = request.json
        nickname = data.get('nickname')
        password = data.get('password')

        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute('SELECT * FROM users WHERE nickname = %s AND password = %s', (nickname, password))
        account = cursor.fetchone()
        cursor.close()

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
        return jsonify({"message": "Internal server error"}), 500


@app.route('/api/get_all_cards', methods=['GET'])
def get_all_cards():
    try:
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute('SELECT id, nickname, age, tag, description as content, gender FROM users')
        cards = cursor.fetchall()
        cursor.close()

        return jsonify(cards), 200
    except Exception as e:
        print("Get Cards Error:", e)
        return jsonify({"cards": []}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)