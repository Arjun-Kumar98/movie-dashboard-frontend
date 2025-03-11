import React from "react";
import AuthForm from "../components/AuthForm/AuthForm";
import { AuthFormData } from "../components/AuthForm/AuthForm.types";
import {t} from '../i18n';

const SignupPage=()=>{
    const handleSignup = (formData:AuthFormData)=>{
        
    }

    return(
        <div className="auth-page">
            <AuthForm mode="signup" onSubmit={handleSignup}/>
        </div>
    );
};
export default SignupPage;