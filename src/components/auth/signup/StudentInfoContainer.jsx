import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { updateStudentInfo } from "../../../services/firestoreService";
import FormValidationError from "../../common/FormValidationError";
import Loading from "../../common/Loading"
import { firstnameValidError, idValidError, lastnameValidError, startingYearValidError } from "../../common/utils/inputValidation";
import FormWrapper from "../../common/FormWrapper";

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

            await updateStudentInfo(userDocPath, { ...inputs, _new: "0" });

            document.cookie = `auth=1; max-age=${3 * 60 * 60}, samesite=strict`;

            navigate("/profile");
        }
    }

    return (<>{
        isLoading ? (
            <Loading />
        ) : (
            <FormWrapper
                formContent={(
                    <>
                        <input
                            className="block border border-grey-light w-full p-3 rounded mt-8"
                            type="text"
                            name="firstname"
                            value={inputs.firstname}
                            placeholder="First Name"
                            onChange={onInput}
                            onBlur={validateInput} />
                        {
                            errors.firstname && (
                                <FormValidationError>
                                    {errors.firstname}
                                </FormValidationError>
                            )
                        }

                        <input
                            className="block border border-grey-light w-full p-3 rounded mt-4"
                            type="text"
                            name="lastname"
                            value={inputs.lastname}
                            placeholder="Last Name"
                            onChange={onInput}
                            onBlur={validateInput} />
                        {
                            errors.lastname && (
                                <FormValidationError>
                                    {errors.lastname}
                                </FormValidationError>
                            )
                        }

                        <input
                            className="block border border-grey-light w-full p-3 rounded mt-4"
                            type="text"
                            name="id"
                            value={inputs.id}
                            placeholder="Student ID"
                            onChange={onInput}
                            onBlur={validateInput} />
                        {
                            errors.id && (
                                <FormValidationError>
                                    {errors.id}
                                </FormValidationError>
                            )
                        }

                        <input
                            className="block border border-grey-light w-full p-3 rounded mt-4"
                            type="text"
                            name="startingYear"
                            value={inputs.startingYear}
                            placeholder="Starting Year"
                            onChange={onInput}
                            onBlur={validateInput} />
                        {
                            errors.startingYear && (
                                <FormValidationError>
                                    {errors.startingYear}
                                </FormValidationError>
                            )
                        }

                        <button
                            className="w-full text-center py-3 rounded bg-blue-500 text-white hover:bg-blue-600 focus:bg-blue-600 mt-5"
                            type="reset"
                            onClick={onSignup}
                        >Create Account</button>
                    </>
                )}
            />
        )
    }</>)
}

export default StudentInfoContainer;