from flask import request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token
from app.services import AuthService, UserInputService, RoadmapService, ChatService, OllamaService
from app.models import ChatLog

def init_routes(app, jwt):
    """Initialize all routes for the application"""
    
    # JWT error handlers
    @jwt.invalid_token_loader
    def invalid_token_callback(error):
        return jsonify({'msg': 'Invalid token'}), 422

    @jwt.unauthorized_loader
    def missing_token_callback(error):
        return jsonify({'msg': 'Missing token'}), 401

    @jwt.expired_token_loader
    def expired_token_callback(jwt_header, jwt_payload):
        return jsonify({'msg': 'Token has expired'}), 401

    # Authentication routes
    @app.route('/register', methods=['POST'])
    def register():
        print('Register endpoint received:', request.json)
        data = request.json
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')
        
        user_id, error = AuthService.register_user(username, email, password)
        if error:
            return jsonify({'error': error}), 400
        
        return jsonify({'message': 'User registered successfully'}), 201

    @app.route('/login', methods=['POST'])
    def login():
        data = request.json
        email = data.get('email')
        password = data.get('password')
        
        user, error = AuthService.login_user(email, password)
        if error:
            return jsonify({'error': error}), 401
        
        # Convert user ID to string for JWT subject
        access_token = create_access_token(identity=str(user['id']))
        return jsonify({'token': access_token, 'email': user['email']}), 200

    # User input routes
    @app.route('/submit', methods=['POST'])
    @jwt_required()
    def submit_data():
        print('Submit endpoint received:', request.json)
        print('JWT Identity:', get_jwt_identity())
        
        data = request.json
        name = data.get('name')
        current_job = data.get('current_job')
        skills = data.get('skills')
        required_job = data.get('required_job')
        user_id = get_jwt_identity()
        # Convert string user_id back to int for database
        user_id = int(user_id) if user_id else None
        
        print('Parsed data:', {'name': name, 'current_job': current_job, 'skills': skills, 'required_job': required_job, 'user_id': user_id})
        
        result, error = UserInputService.submit_user_data(user_id, name, current_job, skills, required_job)
        if error:
            return jsonify({"error": error}), 400
        
        return jsonify(result), 200

    # Roadmap routes
    @app.route('/roadmap', methods=['POST'])
    @jwt_required()
    def save_roadmap():
        data = request.json
        input_id = data.get('input_id')
        roadmap = data.get('roadmap')
        user_id = get_jwt_identity()
        # Convert string user_id back to int for database
        user_id = int(user_id) if user_id else None
        
        roadmap_id, error = RoadmapService.save_roadmap(user_id, input_id, roadmap)
        if error:
            return jsonify({'error': error}), 400
        
        return jsonify({'message': 'Roadmap saved'}), 201

    # Chat routes
    @app.route('/api/chat', methods=['POST', 'OPTIONS'])
    @jwt_required()
    def chat():
        if request.method == 'OPTIONS':
            return '', 200
        
        try:
            data = request.json
            prompt = data.get('prompt', '')
            user_id = get_jwt_identity()
            # Convert string user_id back to int for database
            user_id = int(user_id) if user_id else None
            
            response, error = ChatService.process_chat(user_id, prompt)
            if error:
                return jsonify({'error': error}), 500
            
            return jsonify({'response': response})
        except Exception as e:
            return jsonify({'error': str(e)}), 500

    # Ollama test route
    @app.route('/test-ollama', methods=['GET'])
    def test_ollama():
        """Test endpoint to check if Ollama is running"""
        try:
            response, error = OllamaService.test_ollama()
            if error:
                return jsonify({'error': error, 'status': 'Ollama not accessible'}), 500
            return jsonify({
                'message': 'Ollama is running', 
                'response': response[:100] + '...' if len(response) > 100 else response
            }), 200
        except Exception as e:
            return jsonify({'error': str(e), 'status': 'Ollama test failed'}), 500

    # Chat logs route
    @app.route('/api/chat-logs', methods=['GET'])
    @jwt_required()
    def get_chat_logs():
        """Get chat logs for the authenticated user"""
        try:
            user_id = get_jwt_identity()
            user_id = int(user_id) if user_id else None
            
            chat_logs, error = ChatLog.get_by_user_id(user_id)
            if error:
                return jsonify({'error': error}), 500
            
            return jsonify({'chat_logs': chat_logs}), 200
        except Exception as e:
            return jsonify({'error': str(e)}), 500

