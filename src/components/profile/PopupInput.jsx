import React from "react";
import FormValidationError from "../common/FormValidationError";

const PopupInput = (props) => {

    const type = props.type;
    const name = props.name;
    const placeholder = props.placeholder;
    const autoComplete = props.autoComplete;
    const onChange = props.onChange;
    const onBlur = props.onBlur;
    const error = props.error;

    return (
        <>
            <input
                className="rounded-lg outline-none border-2 border-gray-500 focus:border-black py-1 px-3 mt-4"
                type={type}
                name={name}
                placeholder={placeholder}
                autoComplete={autoComplete}
                onChange={onChange}
                onBlur={onBlur}
            />
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

export default PopupInput;