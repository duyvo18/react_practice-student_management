import React, { useState } from "react";
import { useNavigate } from "react-router-dom"
import { login } from "../../services/authService";
import { queryStudentByEmail } from "../../services/firestoreService";
import FormValidationError from "../common/FormValidationError"

const LogInContainer = () => {
    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    })

    const [validationErrors, setValidationErrors] = useState({
        email: '',
    })

    const onInput = (e) => {
        const { name, value } = e.target;

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
                email: 'The input does not looks like an email.'
            })
        } else {
            setValidationErrors({
                ...validationErrors,
                email: ''
            })
        }
    }

    const logIn = async () => {
        if (await login(inputs.email, inputs.password)) {
            const user = await queryStudentByEmail(inputs.email)
            
            navigate("/listing", { state: { "auth": "1" } })
        }
    }

    return (
        <div className="bg-gray-100 min-h-screen min-w-screen flex flex-col">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                    <form>
                        <h1 className="text-3xl text-center">Log In</h1>
                        <input
                            className="block border border-grey-light w-full p-3 rounded mt-8"
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
                            className="block border border-grey-light w-full p-3 rounded mt-4"
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={onInput} />

                        <button
                            className="w-full text-center py-3 rounded bg-blue-500 text-white hover:bg-blue-600 focus:bg-blue-600 my-1 mt-4"
                            type="reset"
                            onClick={logIn}
                        >Log In</button>
                    </form>
                </div>

                <div className="text-grey-dark mt-6">
                    <a className="no-underline border-b border-blue" href="/">
                        Create a new account
                    </a>.
                </div>
            </div>
        </div>
    )
}

export default LogInContainer;