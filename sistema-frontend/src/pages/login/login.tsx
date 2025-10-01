import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
    const [user, setUser] = useState<string>(""); //Estado para o usuário
    const [password, setPassword] = useState<string>(""); //Estado para a senha

    const navigate = useNavigate();

    //Função para atualizar o estado do usuário
    const handleUserChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser(event.target.value);
    };

    //Função para atualizar o estado da senha
    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("Usuario: ", user);
        console.log("Senha: ",password)
    }

    return(
        <div>
            <strong>Olá Cheguei</strong>

            <form onSubmit={handleSubmit}>
                <h1>Login</h1>
                <label>
                    Usuário:
                    <input
                        type="text"
                        value={user}
                        onChange={handleUserChange}
                        placeholder="Digite seu usuário"
                        required
                        />
                </label>

                <label>
                    Senha:
                    <input
                        type="text"
                        value={password}
                        onChange={handlePasswordChange}
                        placeholder="Digite sua Senha"
                        required
                        />
                </label>

                <button type="submit">
                    Entrar
                </button>

            </form>
        </div>
    )
};

export default LoginPage;