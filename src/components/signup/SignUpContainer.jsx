import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../../services/authService";
import { addNewStudent } from "../../services/firestoreService";
import FormValidationError from "../common/FormValidationError"

const SignUpContainer = () => {

    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        "email": '',
        "password": '',
        "confirmPassword": '',
    })

    const [validationErrors, setValidationErrors] = useState({
        email: "",
        confirmPassword: ""
    })

    const onInput = (event) => {
        const { name, value } = event.target;

        setInputs(prev => ({
            ...prev,
            [name]: value
        }));

        inputValidation();
    }

    const inputValidation = () => {
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

        if (!emailRegex.test(inputs.email)) {
            setValidationErrors({
                ...validationErrors,
                email: 'The input does not look like an email.'
            })
        } else {
            setValidationErrors({
                ...validationErrors,
                email: ''
            })
        }

        if (inputs.password !== inputs.confirmPassword) {
            setValidationErrors({
                ...validationErrors,
                confirmPassword: 'Password does not match.'
            })
        } else {
            setValidationErrors({
                ...validationErrors,
                confirmPassword: ''
            })
        }
    }

    const signUp = async () => {
        if (await signup(inputs.email, inputs.password)) {
            const docPath = await addNewStudent(inputs);

            navigate("/info", { state: { "docPath": docPath } });
        } else {
            
        }
    }

    return (
        <div className="bg-gray-100 min-h-screen min-w-screen flex flex-col">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                    <form>
                        <h1 className="mb-8 text-3xl text-center">Sign Up</h1>
                        <input
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            type="text"
                            name="email"
                            placeholder="Email"
                            onChange={onInput}
                            onBlur={inputValidation} />
                        {
                            validationErrors.email && (
                                <FormValidationError message={validationErrors.email} />
                            )
                        }

                        <input
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={onInput}
                            onBlur={inputValidation} />


                        <input
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            onChange={onInput}
                            onBlur={inputValidation} />
                        {
                            validationErrors.email && (
                                <FormValidationError message={validationErrors.confirmPassword} />
                            )
                        }

                        <button
                            className="w-full text-center py-3 rounded bg-blue-500 text-white hover:bg-blue-600 focus:bg-blue-600 my-1"
                            type="reset"
                            onClick={signUp}
                        >Continue</button>
                    </form>
                </div>

                <div className="text-grey-dark mt-6">
                    Already have an account?{' '}
                    <a
                        className="no-underline border-b border-blue"
                        href="/login">
                        Log in
                    </a>
                    .
                </div>
            </div>
        </div>
    )
}

export default SignUpContainer;