import React,{useState} from'react';
import InputField from '../common/InputField';
import Button from '../common/Button';
import {t} from '../../i18n/index';
import { AuthFormProps } from './AuthForm.types';

const AuthForm=({mode,onSubmit}:AuthFormProps)=>{
    const[formData,setFormData]=useState({
        emailId:'',
        password:'',
        confirmPassword:''
    });



    const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        });
    };

    const handleSubmit=(e:React.FormEvent)=>{
        e.preventDefault();
       if(mode=='signup' && formData.password!== formData.confirmPassword){
        alert(t('signup.confirmPassword')+'does not match.');
        return;
       }

       onSubmit({
        emailId:formData.emailId,
        password:formData.password,
        confirmPassword:formData.confirmPassword
       });
    };
    

    return(
        <form onSubmit ={handleSubmit}>
            <h2>{t(`${mode}.title`)}</h2>

            <InputField
            type="email"
            value={formData.emailId}
            onChange={handleChange}
            placeholder={t(`${mode}.email`)}
            hasError
            />

            <InputField
             type="password"
             value={formData.password}
             onChange={handleChange}
             placeholder={t(`${mode}.password`)}
             hasError
             />

             {mode === 'signup' && (
                <InputField
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder={t('signup.confirmPassword')}
                  hasError
                  />

             )}

             <Button
             type="submit"
             label={t(`${mode}.submit`)}
             className=''
        
             />
        </form>
    );
};
export default AuthForm;