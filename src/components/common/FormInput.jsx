import React from "react";

const FormInput = (props) => {
    return (
        <>
            <input
                className="block border border-grey-light w-full p-3 rounded mt-4"
                type="password"
                name="password"
                placeholder="Password"
                autoComplete="current-password"
                onChange={onInput}
                onBlur={validateInput} />
            {
                errors.password && (
                    <FormValidationError message={errors.password} />
                )
            }
        </>
    );
};


export default FormInput;