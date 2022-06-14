import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../../../services/authService";
import { addNewStudent } from "../../../services/firestoreService";
import FormValidationError from "../../common/FormValidationError"
import Loading from "../../common/Loading"
import { confirmPasswordValidError, emailValidError, passwordValidError } from "../../common/inputValidation";

const SignUpContainer = () => {

    const navigate = useNavigate();

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

    const signUp = async () => {
        if (!errors.email && !errors.password && !errors.confirmPassword) {
            setLoading(true)

            if (await signup(inputs.email, inputs.password)) {
                const userDocPath = await addNewStudent(inputs.email);

                document.cookie = `userDocPath=${userDocPath}; max-age=${3 * 60 * 60}; samesite=strict`;

                navigate("/info");
            } else {
                setErrors(prev => ({
                    ...prev,
                    auth: 'Authentication failed.'
                }));

                setLoading(false)
            }
        }
    }

    return (
        (!loading && (
            <div className="bg-gray-100 min-h-screen min-w-screen flex flex-col">
                <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center">
                    <div className="bg-white px-6 py-8 rounded-lg shadow-md text-black w-full">
                        <form>
                            <h1 className="text-3xl text-center">Sign Up</h1>

                            <input
                                className="block border border-gray-200 w-full p-3 rounded-lg mt-8"
                                type="text"
                                name="email"
                                placeholder="Email"
                                onChange={onInput}
                                onBlur={validateInput} />
                            {
                                errors.email && (
                                    <FormValidationError message={errors.email} />
                                )
                            }

                            <input
                                className="block border border-grey-light w-full p-3 rounded-lg mt-4"
                                type="password"
                                name="password"
                                placeholder="Password"
                                onChange={onInput}
                                onBlur={validateInput} />
                            {
                                errors.password && (
                                    <FormValidationError message={errors.password} />
                                )
                            }


                            <input
                                className="block border border-grey-light w-full p-3 rounded mt-4"
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                onChange={onInput}
                                onBlur={validateInput} />
                            {
                                errors.confirmPassword && (
                                    <FormValidationError message={errors.confirmPassword} />
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
                                className="buttonBlueFilled w-full py-2 mt-8"
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
        )) || (
            loading && (
                <Loading />
            )
        )
    )
}

export default SignUpContainer;