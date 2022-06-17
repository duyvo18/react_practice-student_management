import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signupWithEmail } from "../../../services/authService";
import { addNewStudent } from "../../../services/firestoreService";
import FormValidationError from "../../common/FormValidationError"
import Loading from "../../common/Loading"
import { confirmPasswordValidError, emailValidError, passwordValidError } from "../../common/utils/inputValidation";
import FormWrapper from "../../common/FormWrapper";
import FadableClickable from "../../common/FadableClickable";

const SignUpContainer = () => {

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
        confirmPassword: '',
    })

    const [errors, setErrors] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    })

    const [isLoading, setLoading] = useState(false)

    useEffect(
        () => {
            if (isAuth) {
                navigate("profile")
            } else {
                if (userDocPath) {
                    navigate("/signup/info")
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
            case 'confirmPassword':
                setErrors(prev => ({
                    ...prev,
                    confirmPassword: confirmPasswordValidError(value, inputs.password)
                }));
                break;
            default:
                break;
        }
    }

    const onContinue = async () => {
        if (!errors.email && !errors.password && !errors.confirmPassword) {
            setLoading(true)

            try {
                await signupWithEmail(inputs.email, inputs.password);

                const userDocPath = await addNewStudent(inputs.email);
                document.cookie = `userDocPath=${userDocPath}; max-age=${3 * 60 * 60}; samesite=strict`;

                navigate("/signup/info");
            } catch (e) {
                console.error(e);

                setErrors(prev => ({
                    ...prev,
                    auth: e.message
                }));

                setLoading(false)
            }
        }
    }

    return (
        <FormWrapper
            formContent={(
                <>
                    <h1 className="text-3xl text-center">Sign Up</h1>

                    <input
                        className="border border-gray-300 w-full p-3 rounded-lg mt-8"
                        type="text"
                        name="email"
                        placeholder="Email"
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


                    <input
                        className="border border-gray-300 w-full p-3 rounded-lg mt-4"
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        readOnly={isLoading}
                        onChange={onInput}
                        onBlur={validateInput} />
                    {
                        errors.confirmPassword && (
                            <FormValidationError>
                                {errors.confirmPassword}
                            </FormValidationError>
                        )
                    }

                    {
                        errors.auth && (
                            <div className="mt-4">
                                <FormValidationError>
                                    {errors.auth}
                                </FormValidationError>
                            </div>
                        )
                    }

                    <button
                        className="buttonBlueFilled font-semibold w-full p-3 mt-8"
                        type="reset"
                        disabled={isLoading}
                        onClick={onContinue}
                    >
                        {
                            isLoading ? (
                                <div className="rounded animate-spin duration-300 w-5 h-5 border-2 border-white mx-auto" />
                            ) : 'Continue'
                        }
                    </button>
                </>
            )}
            formFooter={(
                <FadableClickable href="/">
                    Login to an existing account.
                </FadableClickable>
            )}
        />
    )
}

export default SignUpContainer;