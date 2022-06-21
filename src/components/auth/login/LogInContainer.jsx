import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { loginWithEmail } from "../../../services/authService";
import { getStudentPathByEmail } from "../../../services/firestoreService";
import FormValidationError from "../../common/FormValidationError"
import { emailValidError, passwordValidError } from "../../common/utils/inputValidation";
import FormWrapper from "../FormWrapper";
import FormFooterLink from "../FormFooterLink";
import FormInput from "../FormInput";
import SubmitButton from "../SubmitButton";

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
        if (!errors.email && !errors.password) {
            setLoading(true);

            try {
                await loginWithEmail(inputs.email, inputs.password);

                try {
                    const docPath = await getStudentPathByEmail(inputs.email);

                    document.cookie = `auth=1; max-age=${3 * 60 * 60}; samesite=strict`;
                    document.cookie = `userDocPath=${docPath}; max-age=${3 * 60 * 60}; samesite=strict`;

                    navigate("/profile");
                } catch (e) {
                    console.error(e);

                    navigate(
                        "/unexpected",
                        {
                            state: {
                                name: e.name,
                                message: e.message
                            }
                        }
                    )
                }
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
                    <h1 className="text-3xl text-center mb-12">Log In</h1>

                    <FormInput
                        type="text"
                        name="email"
                        placeholder="Email"
                        autoComplete="username"
                        readOnly={isLoading}
                        onChange={onInput}
                        onBlur={validateInput}
                        error={errors.email}
                    />

                    <FormInput
                        type="password"
                        name="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        readOnly={isLoading}
                        onChange={onInput}
                        onBlur={validateInput}
                        error={errors.password}
                    />

                    {
                        errors.auth && (
                            <FormValidationError className="mt-4">
                                {errors.auth}
                            </FormValidationError>
                        )
                    }

                    <SubmitButton
                        onClick={onLogin}
                        isLoading={isLoading}
                    >
                        Login
                    </SubmitButton>
                </>
            )}
            formFooter={(
                <FormFooterLink href="/signup">
                    Create a new account.
                </FormFooterLink>
            )}
        />
    )
}

export default LogInContainer;