import React, { forwardRef, useId } from "react";

function Input({ label, type, className = "", ...props }, ref) {
  const id = useId();
  return (
    <>
      {label && <label htmlFor={id}>{label}</label>}
      <input
        className={`flex-1 border border-gray-300 rounded-md px-4 py-2 mr-2 focus:outline-none ${className}`}
        type={type}
        onChange={props.onChange}
        ref={ref}
        {...props}
        id={id}
      />
    </>
  );
}

export default forwardRef(Input);
