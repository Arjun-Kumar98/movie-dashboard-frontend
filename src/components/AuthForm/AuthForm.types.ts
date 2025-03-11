export type AuthFormMode = 'login'|'signup';

export interface AuthFormData{
    emailId:String,
    password:string;
    confirmPassword?:string;
}

export interface AuthFormProps{
    mode:AuthFormMode;
    onSubmit:(formData:AuthFormData)=>void;
}