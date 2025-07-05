from app.utils import create_connection, hash_password, verify_password, skills_to_string, string_to_skills

class User:
    """User model for database operations"""
    
    @staticmethod
    def create(username, email, password):
        """Create a new user"""
        conn = create_connection()
        if not conn:
            return None, "Database connection failed"
        
        cursor = conn.cursor()
        try:
            password_hash = hash_password(password)
            query = "INSERT INTO users (username, email, password_hash) VALUES (%s, %s, %s)"
            cursor.execute(query, (username, email, password_hash))
            conn.commit()
            return cursor.lastrowid, None
        except Exception as e:
            return None, str(e)
        finally:
            cursor.close()
            conn.close()
    
    @staticmethod
    def get_by_email(email):
        """Get user by email"""
        conn = create_connection()
        if not conn:
            return None, "Database connection failed"
        
        cursor = conn.cursor(dictionary=True)
        try:
            cursor.execute("SELECT * FROM users WHERE email=%s", (email,))
            user = cursor.fetchone()
            return user, None
        except Exception as e:
            return None, str(e)
        finally:
            cursor.close()
            conn.close()
    
    @staticmethod
    def authenticate(email, password):
        """Authenticate user with email and password"""
        user, error = User.get_by_email(email)
        if error:
            return None, error
        
        if user and verify_password(password, user['password_hash']):
            return user, None
        return None, "Invalid credentials"

class UserInput:
    """UserInput model for database operations"""
    
    @staticmethod
    def create(user_id, name, current_job, required_job, skills):
        """Create a new user input"""
        conn = create_connection()
        if not conn:
            return None, "Database connection failed"
        
        cursor = conn.cursor()
        try:
            skills_str = skills_to_string(skills)
            query = "INSERT INTO user_inputs (user_id, name, current_job, required_job, skills) VALUES (%s, %s, %s, %s, %s)"
            cursor.execute(query, (user_id, name, current_job, required_job, skills_str))
            input_id = cursor.lastrowid
            conn.commit()
            return input_id, None
        except Exception as e:
            return None, str(e)
        finally:
            cursor.close()
            conn.close()
    
    @staticmethod
    def get_by_id(input_id):
        """Get user input by ID"""
        conn = create_connection()
        if not conn:
            return None, "Database connection failed"
        
        cursor = conn.cursor(dictionary=True)
        try:
            cursor.execute("SELECT * FROM user_inputs WHERE id=%s", (input_id,))
            user_input = cursor.fetchone()
            if user_input:
                user_input['skills'] = string_to_skills(user_input['skills'])
            return user_input, None
        except Exception as e:
            return None, str(e)
        finally:
            cursor.close()
            conn.close()

class Roadmap:
    """Roadmap model for database operations"""
    
    @staticmethod
    def create(user_id, input_id, roadmap):
        """Create a new roadmap"""
        conn = create_connection()
        if not conn:
            return None, "Database connection failed"
        
        cursor = conn.cursor()
        try:
            query = "INSERT INTO roadmaps (user_id, input_id, roadmap) VALUES (%s, %s, %s)"
            cursor.execute(query, (user_id, input_id, roadmap))
            conn.commit()
            return cursor.lastrowid, None
        except Exception as e:
            return None, str(e)
        finally:
            cursor.close()
            conn.close()

class ChatLog:
    """ChatLog model for database operations"""
    
    @staticmethod
    def create(user_id, question, answer):
        """Create a new chat log entry"""
        conn = create_connection()
        if not conn:
            return None, "Database connection failed"
        
        cursor = conn.cursor()
        try:
            query = "INSERT INTO chat_logs (user_id, question, answer) VALUES (%s, %s, %s)"
            cursor.execute(query, (user_id, question, answer))
            conn.commit()
            return cursor.lastrowid, None
        except Exception as e:
            return None, str(e)
        finally:
            cursor.close()
            conn.close()
