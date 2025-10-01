import React from "react";
import { Routes, Route, BrowserRouter, Navigate} from 'react-router-dom';

import { LoginPage } from "./pages/login/login";

function RoutesApp(){
    return(
        <Routes>
            <Route path='/' element={<Navigate to="/login"/>} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<Navigate to="/login"/>} />
        </Routes>
    )
}

export default RoutesApp;