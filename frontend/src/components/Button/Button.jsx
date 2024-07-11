import React from "react";

function Button({ text, type = "button", className = "", ...props }) {
  return (
    <button
      type={type}
      onClick={props.onClick}
      className={`w-35 border-solid m-2 bg-red-600 text-white rounded-lg p-2 ${
        props.disabled ? props.disabledClassName : className
      }`}
      {...props}
    >
      {text}
    </button>
  );
}

export default Button;
