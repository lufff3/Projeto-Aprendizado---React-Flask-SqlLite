import React from "react";
import axiosInstance from "../../api/axios";
import { DefaultForm } from "../../components/defaultForm";

export const RegisterMaintenanceForm: React.FC = () => {

    const fields = [
        {name: 'maintenance_name', label: 'Nome da manutenção', type: 'text', placeholder: 'TROCA DE FILTRO' },
    ];

    const handleSubmit = async (formData: { [key: string]: string }) => {
        const { maintenance_name } = formData;

        if (!maintenance_name ) {
            return "Por favor, preencha todos os campos.";
        }

        try {
            const response = await axiosInstance.post(
                '/registermaintenance',
                { maintenance_name },
            ); 
        } catch (err: any) {
            if (err.response) {
                return(err.response.data.error || "Erro desconhecido.");
            } else {
                return "Erro ao se conectar com o backend."
            }
        }
    };

    

    return (
        <DefaultForm title="Cadastrar Manutenção" fields={fields} onSubmit={handleSubmit} />
    );

};