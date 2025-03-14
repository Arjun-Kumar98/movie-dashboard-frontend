import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AuthFormProps, AuthFormData } from './AuthForm.types';
import { authFormSchema } from './AuthForm.validation';
import InputField from '../common/InputField';
import Button from '../common/Button';
import { t } from '../../i18n';

const AuthForm: React.FC<AuthFormProps> = ({ mode, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AuthFormData>({
    resolver: yupResolver(authFormSchema(mode)),
  });

  const submitHandler = (data: AuthFormData) => {
    onSubmit(data);
    reset(); 
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <h2>{t(`${mode}.title`)}</h2>

      <InputField
        type="email"
        name="email"
        placeholder={t(`${mode}.email`)}
        register={register}
        hasError={!!errors.email}
        errorMessage={errors.email?.message}
      />

      <InputField
        type="password"
        name="password"
        placeholder={t(`${mode}.password`)}
        register={register}
        hasError={!!errors.password}
        errorMessage={errors.password?.message}
      />

      {mode === 'signup' && (
        <InputField
          type="password"
          name="confirmPassword"
          placeholder={t('signup.confirmPassword')}
          register={register}
          hasError={!!errors.confirmPassword}
          errorMessage={errors.confirmPassword?.message as string | undefined}

          />
      )}

      <Button
        type="submit"
        label={t(`${mode}.submit`)}
        className="submit-button"
      />
    </form>
  );
};

export default AuthForm;
