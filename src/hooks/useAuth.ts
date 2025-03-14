import { loginUser,LoginPayload } from "../api/auth.api";


export const useAuth=()=>{
    const login = async(data:LoginPayload)=>{
        const result = await loginUser(data);
        if(result.success){
            localStorage.setItem('token',result.token);
            localStorage.setItem('userId',result.userId);
        }
        return result;
    };

   

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
    };

    return {login,logout};
};