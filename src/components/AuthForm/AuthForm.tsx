import React from "react";
import {useForm} from 'react-hook-form';
import { AuthFormProps,AuthFormData } from "./AuthForm.types";
import InputField from '../common/InputField';
import Button from '../common/Button';
import {t} from '../../i18n';

const AuthForm: React.FC<AuthFormProps> = ({mode,onSubmit})=>{
    const{
        register,
        handleSubmit,
        formState:{errors},
        watch,
    }=useForm<AuthFormData>();

    const submitHandler = (data:AuthFormData)=>{
        if(mode==='signup' && data.password !== data.confirmPassword){
            alert(t('signup.confirmPassword')+'does not match.');
            return;
        }
        onSubmit(data);
    };

    return(
        <form onSubmit={handleSubmit(submitHandler)}>
            <h2>{t(`${mode}.title`)}</h2>

            <InputField
            type="email"
            name="emailId"
            placeholder={t(`${mode}.email`)}
            register={register}
            hasError={!!errors.emailId}
            errorMessage={errors.emailId?.message}
        />

        <InputField
        type="password"
        name="password"
        placeholder={t(`${mode}.password`)}
        register={register}
        hasError={!!errors.password}
        errorMessage={errors.password?.message}
        />

        {mode === 'signup' &&(
            <InputField
            type="password"
            name="confirmPassword"
            placeholder={t('signup.confirmPassword')}
            register={register}
            hasError={!!errors.confirmPassword}
            errorMessage={errors.confirmPassword?.message}
        />
        )}

        <Button
        type="submit"
        label={t(`${mode}.submit`)}
        className=""
        />
        </form>
    );

};

export default AuthForm;