import React from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../../components/AuthForm/AuthForm";
import { AuthFormData } from "../../components/AuthForm/AuthForm.types";
import { signupUser } from "../../api/auth.api";
import { t } from "../../i18n";


const SignupPage:React.FC=()=>{

    const navigate = useNavigate();

    const handleSignup = async(formData:AuthFormData)=>{
        const{email,password} = formData;

        const result = await signupUser({email,password});

        if(result.success){
            navigate('/login');
        }else{
            alert(result.error||t('api.signupFailed'));
        }
    };

    return (
        <div className="page-wrapper">
            <AuthForm mode="signup" onSubmit={handleSignup}/>
        </div>
    );
};
export default SignupPage;