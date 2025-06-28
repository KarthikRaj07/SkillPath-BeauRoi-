from flask import Flask, request, jsonify
from flask_cors import CORS  
from db_config import create_connection
import requests
import json
import os

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=False)

@app.route('/submit', methods=['POST'])
def submit_data():
    data = request.json
    name = data.get('name')
    current_job = data.get('current_job')
    skills = data.get('skills')
    required_job = data.get('required_job')

    if not name or not current_job or not skills or not required_job:
        return jsonify({"error": "Invalid input data"}), 400  

    skills_str = ",".join(skills)

    conn = create_connection()
    if conn:
        print("✅ Database connection established inside route.")
        cursor = conn.cursor()
        try:
            query = "INSERT INTO users (name, current_job, skills, required_job) VALUES (%s, %s, %s, %s)"
            cursor.execute(query, (name, current_job, skills_str, required_job))
            conn.commit()
            print("✅ Data inserted successfully.")
            return jsonify({"name": name, "current_job": current_job, "skills": skills, "required_job": required_job}), 200
        except Exception as e:
            print(f"❌ Error inserting data: {e}")  
            return jsonify({"error": "Database error", "details": str(e)}), 500
        finally:
            cursor.close()
            conn.close()
            print("🔒 Connection closed.")
    else:
        print("❌ Failed to connect to the database inside route.")
        return jsonify({"error": "Failed to connect to the database"}), 500

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

@app.route('/api/chat', methods=['POST', 'OPTIONS'])
def chat():
    if request.method == 'OPTIONS':
        return '', 200
    try:
        data = request.json
        prompt = data.get('prompt', '')
        if not prompt:
            return jsonify({'error': 'No prompt provided'}), 400
        response, error = run_ollama(prompt)
        if error:
            return jsonify({'error': error}), 500
        return jsonify({'response': response})
    except Exception as e:
        print(f"Server error: {str(e)}")
        return jsonify({'error': str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000)
