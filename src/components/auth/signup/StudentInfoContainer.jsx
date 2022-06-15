import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateStudentInfo } from "../../../services/firestoreService";
import AuthWarning from "../../common/AuthWarning";
import FormValidationError from "../../common/FormValidationError";
import Loading from "../../common/Loading"
import { firstnameValidError, idValidError, lastnameValidError, startingYearValidError } from "../../common/inputValidation";

const StudentInfoContainer = () => {
    const navigate = useNavigate();

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

    const signUp = async () => {
        if (!errors.firstname && !errors.lastname && !errors.id && !errors.startingYear) {
            setLoading(true)

            await updateStudentInfo(userDocPath, { ...inputs, _new: "0" });

            document.cookie = `auth=1; max-age=${3 * 60 * 60}, samesite=strict`;

            navigate("/profile");
        }
    }

    return (
        (
            (
                !loading && (
                    (
                        userDocPath && (
                            <div className="bg-gray-100 min-h-screen min-w-screen flex flex-col">
                                <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                                    <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                                        <form>
                                            <h1 className="text-3xl text-center">Sign Up</h1>
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
                                                    <FormValidationError message={errors.firstname} />
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
                                                    <FormValidationError message={errors.lastname} />
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
                                                    <FormValidationError message={errors.id} />
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
                                                    <FormValidationError message={errors.startingYear} />
                                                )
                                            }

                                            <button
                                                className="w-full text-center py-3 rounded bg-blue-500 text-white hover:bg-blue-600 focus:bg-blue-600 mt-5"
                                                type="reset"
                                                onClick={signUp}
                                            >Create Account</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        )
                    ) || (
                        !userDocPath && (
                            <AuthWarning />
                        )
                    )
                )
            ) || (
                loading && (
                    <Loading />
                )
            )
        )
    )
}

export default StudentInfoContainer;