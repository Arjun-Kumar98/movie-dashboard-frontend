import React from "react";
import {useNavigate} from 'react-router-dom';
import AuthForm from '../../components/AuthForm/AuthForm';
import { AuthFormData } from "../../components/AuthForm/AuthForm.types";
import { t } from "../../i18n";
import { useAuth } from "../../hooks/useAuth";

const LoginPage: React.FC=()=>{
    const {login} = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (formData:AuthFormData)=>{
        const{email,password} = formData;

        const result = await login({email,password});

        if(result.success){
            navigate('/movieList');
        }else{
            alert(result.error||t('api.loginFailed'));
        }
    };
    return (
        <div className="page-wrapper">
            <AuthForm mode="login" onSubmit={handleLogin}/>
        </div>
    );
    };
export default LoginPage;