import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { loginWithEmail } from "../../../services/authService";
import { getStudentPathByEmail } from "../../../services/firestoreService";
import FormValidationError from "../../common/FormValidationError"
import { emailValidError, passwordValidError } from "../../common/utils/inputValidation";
import FormWrapper from "../../common/FormWrapper";
import FadableClickable from "../../common/FadableClickable";

const LogInContainer = () => {

    const navigate = useNavigate();

    const isAuth = document.cookie
        .split(';')
        .find(row => row.trim().startsWith('auth='))
        ?.split('=')[1] === '1';

    const userDocPath = document.cookie
        .split(';')
        .find(row => row.trim().startsWith('userDocPath='))
        ?.split('=')[1];

    const [inputs, setInputs] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({
        email: '',
        password: '',
        auth: '',
    });

    const [isLoading, setLoading] = useState(false);

    useEffect(
        () => {
            if (isAuth) {
                navigate("/profile");
            } else {
                if (userDocPath) {
                    navigate("/signup/info");
                }
            }
        },
        []
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
    };

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
    };

    const onLogin = async () => {
        // if (inputs.email) {
        //     setErrors(prev => ({
        //         ...prev,
        //         email: emailValidError(inputs.email)
        //     }));
        // }
        // if (inputs.password) {
        //     setErrors(prev => ({
        //         ...prev,
        //         password: passwordValidError(inputs.email)
        //     }));
        // }

        if (!errors.email && !errors.password) {
            setLoading(true);

            try {
                await loginWithEmail(inputs.email, inputs.password);
                const docPath = await getStudentPathByEmail(inputs.email);

                document.cookie = `auth=1; max-age=${3 * 60 * 60}; samesite=strict`;
                document.cookie = `userDocPath=${docPath}; max-age=${3 * 60 * 60}; samesite=strict`;

                navigate("/profile");
            } catch (e) {
                console.error(e);

                setErrors(prev => ({
                    ...prev,
                    auth: e.message
                }));

                setLoading(false);
            }
        }
    }

    return (
        <FormWrapper
            formContent={(
                <>
                    <h1 className="text-3xl text-center">Log In</h1>
                    <input
                        className="border border-gray-300 w-full p-3 rounded-lg mt-8"
                        type="text"
                        name="email"
                        placeholder="Email"
                        autoComplete="username"
                        readOnly={isLoading}
                        onChange={onInput}
                        onBlur={validateInput} />
                    {
                        errors.email && (
                            <FormValidationError>
                                {errors.email}
                            </FormValidationError>
                        )
                    }

                    <input
                        className="border border-gray-300 w-full p-3 rounded-lg mt-4"
                        type="password"
                        name="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        readOnly={isLoading}
                        onChange={onInput}
                        onBlur={validateInput} />
                    {
                        errors.password && (
                            <FormValidationError>
                                {errors.password}
                            </FormValidationError>
                        )
                    }

                    {
                        errors.auth && (
                            <FormValidationError
                                className="mt-4"
                            >
                                {errors.auth}
                            </FormValidationError>
                        )
                    }

                    {/* TODO: SubmitButton component */}
                    <button
                        className={`${isLoading ? 'buttonBlueFilledStatic' : 'buttonBlueFilled'} font-semibold w-full p-3 mt-8`}
                        type="button"
                        disabled={isLoading}
                        onClick={onLogin}
                    >
                        {
                            isLoading ? (
                                <div className="rounded animate-spin duration-300 w-5 h-5 border-2 border-white mx-auto" />
                            ) : 'Login'
                        }
                    </button>
                </>
            )}
            formFooter={(
                <FadableClickable href="/signup">
                    Create a new account.
                </FadableClickable>
            )}
        />
    )
}

export default LogInContainer;