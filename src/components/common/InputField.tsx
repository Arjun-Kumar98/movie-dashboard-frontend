import React from "react";

interface InputProps{
    type?:string;
    name:string;
    register:any;
    placeholder?:string;
    hasError?:boolean;
    errorMessage?:string;
}

const Input=({
    type,
    name,
    placeholder,
    hasError,
    errorMessage,
    register
}:InputProps)=>{
    return (
        <div className="input-wrapper">
            <input
            type={type}
            placeholder={placeholder}
            {...register(name)}
            className={`input-field ${hasError?'input-error':''}`}
            />
            {hasError && <p className="input-error-text">{errorMessage}</p>}
        </div>
    );
};
export default Input;