import React from "react";
import FormValidationError from "../common/FormValidationError";

const FormInput = (props) => {

    const type = props.type
    const name = props.name
    const placeholder = props.placeholder
    const autoComplete = props.autoComplete
    const readOnly = props.readOnly
    const onChange = props.onChange
    const onBlur = props.onBlur
    const error = props.error

    return (
        <>
            <input
                className="block border border-grey-light w-full p-3 rounded mt-4"
                type={type}
                name={name}
                placeholder={placeholder}
                autoComplete={autoComplete}
                readOnly={readOnly}
                onChange={onChange}
                onBlur={onBlur} />
            {
                error && (
                    <FormValidationError className="mt-2">
                        {error}
                    </FormValidationError>
                )
            }
        </>
    );
};


export default FormInput;