import React from "react";
import FormValidationError from "../common/FormValidationError";

const FormElem = (props) => {

    const type = props.type;
    const name = props.name;
    const value = props.value;
    const placeholder = props.placeholder;
    const onChange = props.onChange;
    const onBlur = props.onBlur;
    const error = props.error;

    return (
        <>
            <div className="flex flex-auto flex-row flex-nowrap items-center justify-center w-full mt-12 lg:px-12">
                <label
                    className="basis-1/3 lg:basis-1/4 lg:text-lg"
                    htmlFor={name}
                >
                    {props.children}
                </label>
                <input
                    className="basis-2/3 lg:basis-3/4 border-b-2 border-black p-3 py-1 px-2"
                    type={type}
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    onChange={onChange}
                    onBlur={onBlur}
                />
            </div>
            {
                error && (
                    <FormValidationError className="text-base mt-4 lg:mx-12">
                        {error}
                    </FormValidationError>
                )
            }
        </>
    );
};

export default FormElem;