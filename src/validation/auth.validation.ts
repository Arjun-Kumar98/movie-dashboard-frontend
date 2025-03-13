import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
    emailId:Yup.string()
    .email('login.emailInvalid')
    .required('login.emailRequired'),
    password:Yup.string()
    .required('login.passwordRequired'),
});

export const signupSchema = Yup.object().shape({
    emailId:Yup.string().email('Invalid email address').required('Email is required'),
    password:Yup.string().min(6,'Password must be at least 6 characters').required('Password is required'),
    confirmPassword:Yup.string().oneOf([Yup.ref('password')],'Passwords do not match')
    .required('Confirm password is required'),
})