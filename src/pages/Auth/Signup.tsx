import React from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm/AuthForm";
import { AuthFormData } from "../components/AuthForm/AuthForm.types";
import { useAuth } from "../hooks/useAuth";
import {t} from '../i18n';

const SignupPage:React.FC=()=>{
    const{signup} = useAuth();
    const navigate = useNavigate();

    const handleSignup = async(formData:AuthFormData)=>{
        const{emailId,password,confirmPassword} = formData;

        const result = await signup({emailId,password,confirmPassword});

        if(result.success){
            navigate('/login');
        }else{
            alert(result.error||'Signup failed.');
        }
    };

    return (
        <div className="auth=page-wrapper">
            <AuthForm mode="signup" onSubmit={handleSignup}/>
        </div>
    );
};
export default SignupPage;