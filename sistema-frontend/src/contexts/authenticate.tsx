import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface AuthContextType{
    isAuthenticated: boolean;
    login: (token: string) => void;
    logout: () => void; 
}

export const AuthContext = createContext<AuthContextType | undefined >(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode}> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsAuthenticated(!!token);
    }, []);

    const login = (token: string) => {
        localStorage.setItem("token", token);
        setIsAuthenticated(true);
        navigate("/home");
    };

    const logout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        navigate("/");
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout}} >
            {children}
        </AuthContext.Provider>
    )
}