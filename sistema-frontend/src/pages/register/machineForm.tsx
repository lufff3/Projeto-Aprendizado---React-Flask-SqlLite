import React from "react";
import axiosInstance from "../../api/axios";
import { DefaultForm } from "../../components/defaultForm";

export const RegisterMachineForm: React.FC = () => {

    const fields = [
        {name: 'machine_name', label: 'Nome da máquina', type: 'text', placeholder: 'PRENSA HIDRÁULICA' },
        {name: 'model', label: 'Modelo', type: 'text', placeholder: 'RX2025' },
        {name: 'manufacturer', label: 'Fabricante', type: 'text', placeholder: 'ZAP TECHNOLOGIA' },
        {name: 'code', label: 'Código', type: 'text', placeholder: '1001' },
    ];

    const handleSubmit = async (formData: { [key: string]: string }) => {
        const { machine_name, model, manufacturer } = formData;
        const code = Number(formData.code);

        if (!machine_name || !model || !manufacturer || !code) {
            return "Por favor, preencha todos os campos.";
        }

        if (isNaN(code)) {
            return "O código deve ser um número válido.";
        }

        try {
            const response = await axiosInstance.post(
                '/registermachine',
                { machine_name, model, manufacturer, code },
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
        <DefaultForm title="Cadastrar Máquina" fields={fields} onSubmit={handleSubmit} />
    );

};