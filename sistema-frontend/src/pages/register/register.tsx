import React, { useContext } from "react";
import { AuthContext } from "../../contexts/authenticate";
import { useNavigate } from "react-router-dom";
import { RegisterMachineForm } from "./machineForm";
import { RegisterMaintenanceForm } from "./maintenanceForm";


const RegisterPage: React.FC = () => {

  const navigate = useNavigate();

  const authContext = useContext(AuthContext);
  if (!authContext) {
    return null;
  }
  const { isAuthenticated, logout } = authContext;

    return (
        <div>
        {isAuthenticated ? (
          <div>
            <h1>Página de cadastro!</h1>
            <br />
            <button onClick={logout}>Sair</button>
            <button onClick={() => navigate("/home")}>Página Inicial</button>
            <br />
            <br />
            <br />
            <RegisterMachineForm/>
            <br />
            <br />
            <br />
            <RegisterMaintenanceForm/>
          </div>

        ) : (
          <h1>Por favor, faça login para acessar</h1>
        )}
      </div>
    );
};

export default RegisterPage;