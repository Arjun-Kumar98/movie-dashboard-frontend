import React from "react";
import AuthForm from '../components/AuthForm/AuthForm';
import { AuthFormData } from "../components/AuthForm/AuthForm.types";
import {t} from '../i18n';

const LoginPage =() =>{
    const handleLogin = (formData:AuthFormData) =>{

    };

    return(
        <div className="auth-page">
            <AuthForm mode="login" onSubmit={handleLogin}/>
        </div>
    );
};
export default LoginPage;