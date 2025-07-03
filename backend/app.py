from flask import Flask, request, jsonify
from flask_cors import CORS  
from db_config import create_connection
import requests
import json
import os
import bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity

app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = 'your-secret-key'  # Change this in production
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=False)
jwt = JWTManager(app)

@app.route('/register', methods=['POST'])
def register():
    print('Register endpoint received:', request.json)  # Debug log
    data = request.json
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    if not username or not email or not password:
        return jsonify({'error': 'Username, email and password are required'}), 400
    password_hash = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    conn = create_connection()
    if conn:
        cursor = conn.cursor()
        try:
            query = "INSERT INTO users (username, email, password_hash) VALUES (%s, %s, %s)"
            cursor.execute(query, (username, email, password_hash))
            conn.commit()
            return jsonify({'message': 'User registered successfully'}), 201
        except Exception as e:
            return jsonify({'error': str(e)}), 400
        finally:
            cursor.close()
            conn.close()
    else:
        return jsonify({'error': 'Database connection failed'}), 500

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    if not email or not password:
        return jsonify({'error': 'Email and password required'}), 400
    conn = create_connection()
    if conn:
        cursor = conn.cursor(dictionary=True)
        try:
            cursor.execute("SELECT * FROM users WHERE email=%s", (email,))
            user = cursor.fetchone()
            if user and bcrypt.checkpw(password.encode('utf-8'), user['password_hash'].encode('utf-8')):
                access_token = create_access_token(identity=user['id'])
                return jsonify({'token': access_token, 'email': user['email']}), 200
            else:
                return jsonify({'error': 'Invalid credentials'}), 401
        finally:
            cursor.close()
            conn.close()
    else:
        return jsonify({'error': 'Database connection failed'}), 500

@app.route('/submit', methods=['POST'])
@jwt_required()
def submit_data():
    data = request.json
    name = data.get('name')
    current_job = data.get('current_job')
    skills = data.get('skills')
    required_job = data.get('required_job')
    user_id = get_jwt_identity()
    if not name or not current_job or not skills or not required_job:
        return jsonify({"error": "Invalid input data"}), 400  
    skills_str = ",".join(skills)
    conn = create_connection()
    if conn:
        cursor = conn.cursor()
        try:
            query = "INSERT INTO user_inputs (user_id, name, current_job, required_job, skills) VALUES (%s, %s, %s, %s, %s)"
            cursor.execute(query, (user_id, name, current_job, required_job, skills_str))
            input_id = cursor.lastrowid
            conn.commit()
            return jsonify({"input_id": input_id, "name": name, "current_job": current_job, "skills": skills, "required_job": required_job}), 200
        except Exception as e:
            return jsonify({"error": "Database error", "details": str(e)}), 500
        finally:
            cursor.close()
            conn.close()
    else:
        return jsonify({"error": "Failed to connect to the database"}), 500

@app.route('/roadmap', methods=['POST'])
@jwt_required()
def save_roadmap():
    data = request.json
    input_id = data.get('input_id')
    roadmap = data.get('roadmap')
    user_id = get_jwt_identity()
    if not input_id or not roadmap:
        return jsonify({'error': 'Missing input_id or roadmap'}), 400
    conn = create_connection()
    if conn:
        cursor = conn.cursor()
        try:
            query = "INSERT INTO roadmaps (user_id, input_id, roadmap) VALUES (%s, %s, %s)"
            cursor.execute(query, (user_id, input_id, roadmap))
            conn.commit()
            return jsonify({'message': 'Roadmap saved'}), 201
        except Exception as e:
            return jsonify({'error': str(e)}), 500
        finally:
            cursor.close()
            conn.close()
    else:
        return jsonify({'error': 'Database connection failed'}), 500

@app.route('/api/chat', methods=['POST', 'OPTIONS'])
@jwt_required()
def chat():
    if request.method == 'OPTIONS':
        return '', 200
    try:
        data = request.json
        prompt = data.get('prompt', '')
        user_id = get_jwt_identity()
        if not prompt:
            return jsonify({'error': 'No prompt provided'}), 400
        response, error = run_ollama(prompt)
        if error:
            return jsonify({'error': error}), 500
        # Save chat log
        conn = create_connection()
        if conn:
            cursor = conn.cursor()
            try:
                query = "INSERT INTO chat_logs (user_id, question, answer) VALUES (%s, %s, %s)"
                cursor.execute(query, (user_id, prompt, response))
                conn.commit()
            finally:
                cursor.close()
                conn.close()
        return jsonify({'response': response})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ---- Ollama Chat endpoint ----
def run_ollama(prompt):
    try:
        url = "http://localhost:11434/api/generate"
        payload = {
            "model": "mistral",
            "prompt": prompt,
            "stream": False
        }
        response = requests.post(url, json=payload, timeout=60)
        response.raise_for_status()
        data = response.json()
        return data.get("response", "No response from mistral"), None
    except Exception as e:
        print(f"Error running Ollama: {str(e)}")
        return None, str(e)

if __name__ == "__main__":
    app.run(debug=True, port=5000)
