import React, { useState } from "react";
import { useNavigate } from "react-router-dom"
import { login } from "../../services/authService";
import { getStudentPathByEmail } from "../../services/firestoreService";
import FormValidationError from "../common/FormValidationError"
import Loading from "../common/Loading"

const LogInContainer = () => {

    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        email: '',
        password: '',
    })

    const [validationErrors, setValidationErrors] = useState({
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

        validateInput(e);
    }

    const validateInput = (e) => {
        const { name, value } = e.target;


        setValidationErrors(prev => ({
            ...prev,
            auth: ''
        }));

        switch (name) {
            case 'email':
                if (!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/).test(value)) {
                    setValidationErrors(prev => ({
                        ...prev,
                        email: 'The input does not look like an email.'
                    }));
                } else {
                    setValidationErrors(prev => ({
                        ...prev,
                        email: ''
                    }));
                };
                break;
            case 'password':
                if (value.length < 6) {
                    setValidationErrors(prev => ({
                        ...prev,
                        password: 'Password must be longer than 6 character.'
                    }));
                } else {
                    setValidationErrors(prev => ({
                        ...prev,
                        password: ''
                    }));
                };
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

            setValidationErrors(prev => ({
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
                                validationErrors.email && (
                                    <FormValidationError message={validationErrors.email} />
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
                                validationErrors.password && (
                                    <FormValidationError message={validationErrors.password} />
                                )
                            }

                            {
                                validationErrors.auth && (
                                    <div className="mt-4">
                                        <FormValidationError message={validationErrors.auth} />
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