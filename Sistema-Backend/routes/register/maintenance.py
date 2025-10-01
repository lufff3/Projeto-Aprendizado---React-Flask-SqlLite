from flask import Blueprint, request, jsonify
from db import create_connection

registermaintenance = Blueprint('registermaintenance', __name__)

@registermaintenance.route('/registermaintenance', methods=['POST'])
def register_registermaintenance():

    #Preciso dos dados do front ... como faço?
    data = request.get_json()

    maintenance_name = data.get('maintenance_name').upper()

    #Verifica se recebi todos os dados
    if not maintenance_name:
        return jsonify({"error": "Preencha todos os campos ..."}), 400

    #Preciso me conectar ao banco de dados
    connection = create_connection()
    if not connection:
        return jsonify({"error": "Não me conectei com o banco"}), 500
    
    try:
        cursor = connection.cursor()
        #Verificar se já tenho manutenção com esse codigo...
        search_maintenance_query = """SELECT maintenance_name FROM maintenances WHERE maintenance_name=? """
        cursor.execute(search_maintenance_query, (maintenance_name,))
        maintenance_result = cursor.fetchone()

        if maintenance_result:
            return jsonify({"error": "Manutenção já Cadastrada"}), 400
        
        #se não tenho insiro...
        insert_maintenance_data_query = """
        INSERT INTO maintenances (maintenance_name)
        VALUES (?)
        """

        cursor.execute(insert_maintenance_data_query, (maintenance_name,))

        connection.commit()

        return jsonify({"sucess": "Manutenção Cadastrada com Sucesso"}), 200


    except Exception as e:
        return jsonify({"error": f"Error: {e}"}), 500
    
    finally:
        if connection:
            connection.close();