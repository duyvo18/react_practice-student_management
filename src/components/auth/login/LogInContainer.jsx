import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { loginWithEmail } from "../../../services/authService";
import { getStudentPathByEmail } from "../../../services/firestoreService";
import FormValidationError from "../../common/FormValidationError"
import Loading from "../../common/Loading"
import { emailValidError, passwordValidError } from "../../common/inputValidation";
import FormWrapper from "../../common/FormWrapper";

const LogInContainer = () => {

    const navigate = useNavigate();

    const isAuth = document.cookie
        .split(';')
        .find(row => row.trim().startsWith('auth='))
        ?.split('=')[1] === '1';

    const [inputs, setInputs] = useState({
        email: '',
        password: '',
    })

    const [errors, setErrors] = useState({
        email: '',
        password: '',
        auth: '',
    })

    const [isLoading, setLoading] = useState(false)

    useEffect(
        () => isAuth ? navigate("/profile") : null,
        [isAuth]
    );

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

    const onLogin = async () => {
        setLoading(true);

        if (await loginWithEmail(inputs.email, inputs.password)) {
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
        <>
            {
                isLoading ? (
                    <Loading />
                ) : (
                    <FormWrapper
                        formContent={(
                            <>
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
                                    onClick={onLogin}
                                >Log In</button>
                            </>
                        )}
                        formFooter={(
                            <a
                                className="text-gray-400 hover:text-gray-900 focus:text-gray-900 no-underline outline-none border-b border-gray-200 hover:border-gray-600 focus:border-gray-600"
                                href="/"
                            >
                                Create a new account.
                            </a>
                        )}
                    />
                )
            }
        </>
    )
}

export default LogInContainer;