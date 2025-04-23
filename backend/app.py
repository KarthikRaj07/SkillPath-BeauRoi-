from flask import Flask, request, jsonify
from db_config import create_connection

app = Flask(__name__)

@app.route('/submit', methods=['POST'])
def submit_data():
    data = request.json
    name = data['name']
    job = data['job']
    skills = ",".join(data['skills'])

    conn = create_connection()
    if conn:
        cursor = conn.cursor()
        try:
            query = "INSERT INTO users (name, job, skills) VALUES (%s, %s, %s)"
            cursor.execute(query, (name, job, skills))
            conn.commit()
            return jsonify({"message": "Data inserted successfully"}), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 500
        finally:
            cursor.close()
            conn.close()
    else:
        return jsonify({"error": "DB connection failed"}), 500

if __name__ == "__main__":
    app.run(debug=True)
