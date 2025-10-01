import React, {useState} from "react";

interface Field {
    name: string;
    label: string;
    type: string;
    placeholder: string;
}

interface FormProps {
    title: string;
    fields: Field[];
    onSubmit: (data: { [key: string]: string }) => Promise<string | void>;
    clearFormAfterSubmit?: boolean;
}

export const DefaultForm: React.FC<FormProps> = ({ 
    title, 
    fields, 
    onSubmit, 
    clearFormAfterSubmit = true,
}) => {
    const [formData, setFormData] = useState<{ [key: string]: string }>({});
    const [error, setError] = useState<string>("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validação: verificar se há algum campo vazio
        if (Object.values(formData).some(value => !value.trim())) {
            setError("Por favor, preencha todos os campos.");
            return;
        }
        // Limpa erro antes de enviar
        setError(""); 

        try {
            const errorMessage = await onSubmit(formData); // Chama a função passada como prop
            if (errorMessage) {
                setError(errorMessage);
            } else {
                if (clearFormAfterSubmit) {
                    setFormData({});
                }
            }
        } catch (err) {
            setError("Ocorreu um erro ao enviar os dados. Tente novamente.");
        }
    };

    return (

        <div>
            <form onSubmit={handleSubmit}>
                <title>{title}</title>
                {fields.map((field) => (
                    <div key={field.name}>
                        <label htmlFor={field.name}>{field.label}</label>
                            <input
                                id={field.name}
                                type={field.type}
                                name={field.name}
                                value={formData[field.name] || ''}
                                placeholder={field.placeholder}
                                onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                            />
                    </div>
                ))}
                {error}
                <button type="submit">Enviar</button>
            </form>
        </div>

    );
};