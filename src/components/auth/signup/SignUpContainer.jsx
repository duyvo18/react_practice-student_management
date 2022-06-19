import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signupWithEmail } from "../../../services/authService";
import { addNewStudent } from "../../../services/firestoreService";
import FormValidationError from "../../common/FormValidationError";
import { confirmPasswordValidError, emailValidError, passwordValidError } from "../../common/utils/inputValidation";
import FormWrapper from "../FormWrapper";
import FormFooterLink from "../FormFooterLink";
import FormInput from "../FormInput";
import SubmitButton from "../SubmitButton";

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
                // TODO: resolve exception
                await signupWithEmail(inputs.email, inputs.password);

                // TODO: resolve exception
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

                    <FormInput
                        type="text"
                        name="email"
                        placeholder="Email"
                        readOnly={isLoading}
                        onChange={onInput}
                        onBlur={validateInput}
                        error={errors.email}
                    />

                    <FormInput
                        type="password"
                        name="password"
                        placeholder="Password"
                        readOnly={isLoading}
                        onChange={onInput}
                        onBlur={validateInput}
                        error={errors.password}
                    />

                    <FormInput
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        readOnly={isLoading}
                        onChange={onInput}
                        onBlur={validateInput}
                        error={errors.confirmPassword}
                    />

                    {
                        errors.auth && (
                            <FormValidationError className="mt-4">
                                {errors.auth}
                            </FormValidationError>
                        )
                    }

                    <SubmitButton
                        onClick={onContinue}
                        isLoading={isLoading}
                    >
                        Continue
                    </SubmitButton>
                </>
            )}
            formFooter={(
                <FormFooterLink href="/">
                    Login to an existing account.
                </FormFooterLink>
            )}
        />
    )
}

export default SignUpContainer;