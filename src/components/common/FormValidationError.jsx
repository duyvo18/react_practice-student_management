import React from "react";

const FormValidationError = (props) => {
    return (
        <p className="w-full text-right text-red-500 text-sm italic pl-3 pt-1">
            {props.message}
        </p>
    )
}

export default FormValidationError;