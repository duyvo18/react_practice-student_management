import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { updateStudentInfo } from "../../../services/firestoreService";
import Loading from "../../common/Loading"
import { firstnameValidError, idValidError, lastnameValidError, startingYearValidError } from "../../common/utils/inputValidation";
import FormValidationError from "../../common/FormValidationError";
import FormInput from "../FormInput";
import FormWrapper from "../FormWrapper";
import SubmitButton from "../SubmitButton";

const StudentInfoContainer = () => {

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
        firstname: '',
        lastname: '',
        id: '',
        startingYear: '',
    })

    const [errors, setErrors] = useState({
        firstname: '',
        lastname: '',
        id: '',
        startingYear: ''
    })

    const [isLoading, setLoading] = useState(false)

    useEffect(
        () => {
            if (!isAuth) {
                if (!userDocPath) {
                    navigate("/signup");
                }
            } else {
                navigate("/profile")
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

        validateInput(e);
    }

    const validateInput = (e) => {
        const { name, value } = e.target

        switch (name) {
            case 'firstname':
                setErrors(prev => ({
                    ...prev,
                    firstname: firstnameValidError(value)
                }));
                break;
            case 'lastname':
                setErrors(prev => ({
                    ...prev,
                    lastname: lastnameValidError(value)
                }));
                break;
            case 'id':
                setErrors(prev => ({
                    ...prev,
                    id: idValidError(value)
                }));
                break;
            case 'startingYear':
                setErrors(prev => ({
                    ...prev,
                    startingYear: startingYearValidError(value)
                }));
                break;
            default:
                break;
        }
    }

    const onSignup = async () => {
        if (!errors.firstname && !errors.lastname && !errors.id && !errors.startingYear) {
            setLoading(true)

            try {
                await updateStudentInfo(userDocPath, { ...inputs, _new: "0" });

                document.cookie = `auth=1; max-age=${3 * 60 * 60}, samesite=strict`;

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
        }
    }

    return (
        <FormWrapper
            formContent={(
                <>
                    <h1 className="text-3xl text-center mb-12">Student Info</h1>

                    <FormInput
                        type="text"
                        name="firstname"
                        value={inputs.firstname}
                        placeholder="First Name"
                        onChange={onInput}
                        onBlur={validateInput}
                        error={errors.firstname}
                    />

                    <FormInput
                        type="text"
                        name="lastname"
                        value={inputs.lastname}
                        placeholder="Last Name"
                        onChange={onInput}
                        onBlur={validateInput}
                        error={errors.lastname}
                    />

                    <FormInput
                        type="text"
                        name="id"
                        value={inputs.id}
                        placeholder="Student ID"
                        onChange={onInput}
                        onBlur={validateInput}
                        error={errors.id}
                    />

                    <FormInput
                        type="number"
                        name="startingYear"
                        value={inputs.startingYear}
                        placeholder="Starting Year"
                        onChange={onInput}
                        onBlur={validateInput}
                        error={errors.startingYear}
                    />

                    {
                        errors.auth && (
                            <FormValidationError className="mt-4">
                                {errors.auth}
                            </FormValidationError>
                        )
                    }

                    <SubmitButton
                        onClick={onSignup}
                        isLoading={isLoading}
                    >
                        Create Account
                    </SubmitButton>
                </>
            )}
        />
    )
}

export default StudentInfoContainer;