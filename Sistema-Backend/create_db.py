import sqlite3

db_path = 'sistema.db'

try:
    connection = sqlite3.connect(db_path)
    print(f'Banco de Dados "{db_path}" criado com sucesso')
except sqlite3.Error as e:
    print(f'Erro ao criar o banco de dados: {e}')

finally:
    #Fecha Conexao
    if connection:
        connection.close()
        print("Conexão com o banco de dados encerrada.")