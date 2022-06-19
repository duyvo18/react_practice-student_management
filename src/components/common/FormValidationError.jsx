import React from "react";

const FormValidationError = (props) => {
    return (
        <p className={`rounded w-full text-sm text-red-400 bg-red-100 px-3 py-1 ${props.className || ''}`}>
            {props.children}
        </p>
    )
}

export default FormValidationError;