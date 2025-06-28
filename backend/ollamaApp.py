from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import json
import os

app = Flask(__name__)

# Use only the default, simple CORS config for development
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=False)

def run_ollama(prompt):
    try:
        # Use Ollama HTTP API for mistral
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
    # Handle preflight request
    if request.method == 'OPTIONS':
        return '', 200

    try:
        data = request.json
        prompt = data.get('prompt', '')
        
        if not prompt:
            return jsonify({'error': 'No prompt provided'}), 400

        # Get response from Ollama
        response, error = run_ollama(prompt)
        
        if error:
            return jsonify({'error': error}), 500
            
        return jsonify({'response': response})
        
    except Exception as e:
        print(f"Server error: {str(e)}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
