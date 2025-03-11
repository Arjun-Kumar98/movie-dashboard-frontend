import React from "react";

interface ButtonProps{
    type?:'submit'|'reset';
    label:string;
    onClick?:()=>void;
    className:string
}

const Button=({
     type,
     label,
     onClick,
     className=''
}:ButtonProps)=>{
    return(
        <button
          type={type}
          onClick={onClick}
          className={className}
          >
            {label}
          </button>
    );
};

    
export default Button;