export interface LoginPayload{
    emailId:string;
    password:string;
}

export interface SignupPayload extends LoginPayload{
    confirmPassword:string;
}

export const loginUser = async(payload: LoginPayload)=>{
    try{
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/auth/login`,{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(payload),
        });

        const result = await response.json();
        return {success:response.ok,...result};
    }catch(error){
        console.error('Login error:',error);
        return {success:false,error:'Login failed.Please try again.'};
    }
};

export const signupUser = async (payload: SignupPayload) => {
    try{
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL} /api/auth/signup`,{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(payload),
        });

        const result = await response.json();
        return {success:response.ok,...result};
    }catch(error){
        console.error('Signup error',error);
        return{success:false,error:'Signup failed.Please try again.'};
    }
}