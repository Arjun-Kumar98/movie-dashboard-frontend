import * as Yup from 'yup';

export const authFormSchema = (mode: 'login' | 'signup') =>
  Yup.object().shape({
    email: Yup.string()
      .required('Email is required')
      .email('Invalid email format'),
    password: Yup.string().required('Password is required'),
    ...(mode === 'signup'
      ? {
          confirmPassword: Yup.string()
            .oneOf([Yup.ref('password')], 'Passwords do not match'),
        }
      : {}),
  });
