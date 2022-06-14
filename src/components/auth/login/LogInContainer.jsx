import React, { useState } from "react";
import { useNavigate } from "react-router-dom"
import { login } from "../../../services/authService";
import { getStudentPathByEmail } from "../../../services/firestoreService";
import FormValidationError from "../../common/FormValidationError"
import Loading from "../../common/Loading"
import { emailValidError, passwordValidError } from "../inputValidation";

const LogInContainer = () => {

    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        email: '',
        password: '',
    })

    const [errors, setErrors] = useState({
        email: '',
        password: '',
        auth: '',
    })

    const [loading, setLoading] = useState(false)

    const onInput = (e) => {
        const { name, value } = e.target;

        setInputs(prev => ({
            ...prev,
            [name]: value
        }));

        setErrors(prev => ({
            ...prev,
            auth: ''
        }));

        validateInput(e);
    }

    const validateInput = (e) => {
        const { name, value } = e.target;

        switch (name) {
            case 'email':
                setErrors(prev => ({
                    ...prev,
                    email: emailValidError(value)
                }));
                break;
            case 'password':
                setErrors(prev => ({
                    ...prev,
                    password: passwordValidError(value)
                }));
                break;
            default:
                break;
        }
    }

    const logIn = async () => {
        setLoading(true);

        if (await login(inputs.email, inputs.password)) {
            const docPath = await getStudentPathByEmail(inputs.email);

            document.cookie = `auth=1; max-age=${3 * 60 * 60}; samesite=strict`;
            document.cookie = `userDocPath=${docPath}; max-age=${3 * 60 * 60}; samesite=strict`;

            navigate("/profile")
        } else {
            setLoading(false)

            setErrors(prev => ({
                ...prev,
                auth: 'Please check your credential info.'
            }));
        }
    }

    return (
        (!loading && (
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
                                autoComplete="username"
                                onChange={onInput}
                                onBlur={validateInput} />
                            {
                                errors.email && (
                                    <FormValidationError message={errors.email} />
                                )
                            }

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

                            {
                                errors.auth && (
                                    <div className="mt-4">
                                        <FormValidationError message={errors.auth} />
                                    </div>
                                )
                            }

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
        )) || (
            loading && (
                <Loading />
            )
        )
    )
}

export default LogInContainer;