from flask import Blueprint, jsonify, request, current_app
from werkzeug.security import check_password_hash
import jwt
import datetime
from db import create_connection

#Criando o Blueprint
login = Blueprint('login', __name__)

@login.route('/login', methods=['POST'])
def authenticate_user():

    #definir inicialmente o que eu quero

    data = request.get_json()
    user = data.get('user')
    password = data.get('password')

    if not user or not password:
        return jsonify({"error": "Usuário e Senha são obrigatórios"}), 400
    
    connection = create_connection()

    if not connection:
        return jsonify({"error": "Não foi possivel conectar ao bando"}), 500

    try:
        #verifica se o usuário existe no banco de dados
        cursor = connection.cursor()
        search_user = """
        SELECT user, password
        FROM users
        WHERE user = ?
        """
        cursor.execute(search_user, (user,))
        found_user_result = cursor.fetchone()

        if not found_user_result:
            return jsonify({"error": "Usuário não encontrado"}), 404

        #vERIFICAR SE A SENHA ESTÁ CORRETA
        if not password == found_user_result[1]:
            print(password)
            print(found_user_result[1])
            return jsonify({"error": "Senha Incorreta"}), 401


        #GERAR TOKEN JWT
        token = jwt.encode({
            "user": found_user_result[0],
             "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1)
        }, current_app.config['SECRET_KEY'], algorithm="HS256")

        return jsonify({
            "message": "Autenticação bem-sucedida",
            "token": token
        }), 200

    except Exception as e:
        return jsonify({"error": f"Erro ao autenticar o usuário: {e}"}), 500

    finally:
        if connection:
            connection.close()
        