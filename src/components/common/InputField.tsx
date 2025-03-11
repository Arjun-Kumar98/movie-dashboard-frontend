import React from "react";

interface InputProps{
    type?:string;
    value:string;
    onChange:(e:React.ChangeEvent<HTMLInputElement>)=>void;
    placeholder?:string;
    hasError:boolean;
}

const Input=({
    type,
    value,
    onChange,
    placeholder,
    hasError
}:InputProps)=>{
    return (
        <div className="input-wrapper">
            <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
           
            />
        </div>
    );
};
export default Input;