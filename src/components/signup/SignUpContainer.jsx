import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../../services/authService";
import { addNewStudent } from "../../services/firestoreService";
import FormValidationError from "../common/FormValidationError"
import Loading from "../common/Loading"

const SignUpContainer = () => {

    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    })

    const [validationErrors, setValidationErrors] = useState({
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

        validateInput(e);
    }

    const validateInput = (e) => {
        const { name, value } = e.target;

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
            case 'confirmPassword':
                if (value !== inputs.password) {
                    setValidationErrors(prev => ({
                        ...prev,
                        confirmPassword: 'Password does not match.'
                    }));
                } else {
                    setValidationErrors(prev => ({
                        ...prev,
                        confirmPassword: ''
                    }));
                };
                break;
            default:
                break;
        }
    }

    const signUp = async () => {
        if (!validationErrors.email && !validationErrors.password && !validationErrors.confirmPassword) {
            setLoading(true)

            const result = await signup(inputs.email, inputs.password)
            if (result) {
                const userDocPath = await addNewStudent(inputs.email);

                document.cookie = `userDocPath=${userDocPath}; max-age=${3 * 60 * 60}; samesite=strict`;

                navigate("/info");
            } else {
                // TODO: Popup error   
                setLoading(false)
            }
        } else {
            // TODO: Popup error
        }
    }

    return (
        (!loading && (
            <div className="bg-gray-100 min-h-screen min-w-screen flex flex-col">
                <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                    <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                        <form>
                            <h1 className="text-3xl text-center">Sign Up</h1>
                            <input
                                className="block border border-grey-light w-full p-3 rounded mt-8"
                                type="text"
                                name="email"
                                placeholder="Email"
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
                                onChange={onInput}
                                onBlur={validateInput} />
                            {
                                validationErrors.password && (
                                    <FormValidationError message={validationErrors.password} />
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
                                validationErrors.confirmPassword && (
                                    <FormValidationError message={validationErrors.confirmPassword} />
                                )
                            }

                            <button
                                className="w-full text-center py-3 rounded bg-blue-500 text-white hover:bg-blue-600 focus:bg-blue-600 my-1 mt-4"
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