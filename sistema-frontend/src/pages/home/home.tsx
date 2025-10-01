import React, {useContext} from "react"
import { AuthContext } from "../../contexts/authenticate";
import { useNavigate } from "react-router-dom";

const Homepage: React.FC = () => {

    const navigate = useNavigate();

   const authContext = useContext(AuthContext);

   if(!authContext){
    return null
   }

   const { isAuthenticated, logout} = authContext;

    return (
        <div>
            {isAuthenticated ? 
                ( 
                    <>
                        <h1>Bem Vindo você está autenticado</h1>
                        <button onClick={() => navigate("/register")}>Cadastro</button>
                        <button onClick={logout}>SAIR</button>

                    </>
                ) 
                :
                (<h1>Por favor, Faça Login</h1>)
            }
        </div>
    )

}

export default Homepage;