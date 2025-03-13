import React from "react";
import {useNavigate} from 'react-router-dom';
import AuthForm from '../components/AuthForm/AuthForm';
import { AuthFormData } from "../components/AuthForm/AuthForm.types";
import { useAuth } from "../hooks/useAuth";
import {t} from '../i18n';

const LoginPage: React.FC=()=>{
    const {login} = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (formData:AuthFormData)=>{
        const{emailId,password} = formData;

        const result = await login({emailId,password});

        if(result.success){
            navigate('/movieList');
        }else{
            alert(result.error||'Login failed.');
        }
    };
    return (
        <div className="auth-page-wrapper">
            <AuthForm mode="login" onSubmit={handleLogin}/>
        </div>
    );
    };
export default LoginPage;