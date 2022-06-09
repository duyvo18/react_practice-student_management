import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateStudentInfo } from "../../services/firestoreService";
import AuthWarning from "../common/AuthWarning";
import FormValidationError from "../common/FormValidationError";
import Loading from "../common/Loading"

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

    const [validationErrors, setValidationErrors] = useState({
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
                if (!value) {
                    setValidationErrors(prev => ({
                        ...prev,
                        firstname: 'Firstname can not be empty'
                    }))
                } else {
                    setValidationErrors(prev => ({
                        ...prev,
                        firstname: ''
                    }))
                };
                break;
            case 'lastname':
                if (!inputs.lastname) {
                    setValidationErrors(prev => ({
                        ...prev,
                        lastname: 'Lastname can not be empty'
                    }))
                } else {
                    setValidationErrors(prev => ({
                        ...prev,
                        lastname: ''
                    }))
                };
                break;
            case 'id':
                if (!(/^\d+$/).test(value) || inputs.id.length < 6 || inputs.id.length > 10) {
                    setValidationErrors(prev => ({
                        ...prev,
                        id: 'Student ID must be between 6 to 10 digits'
                    }))
                } else {
                    setValidationErrors(prev => ({
                        ...prev,
                        id: ''
                    }))
                };
                break;
            case 'startingYear':
                if (!(/^\d+$/).test(value) || value < 2000 || value > new Date().getFullYear()) {
                    setValidationErrors(prev => ({
                        ...prev,
                        startingYear: 'Starting year must be between 2000 and current year'
                    }))
                } else {
                    setValidationErrors(prev => ({
                        ...prev,
                        startingYear: ''
                    }))
                };
                break;
            default:
                break;
        }
    }

    const signUp = async () => {
        setLoading(true)

        await updateStudentInfo(userDocPath, { ...inputs, _new: "0" });

        document.cookie = `auth=1; max-age=${3 * 60 * 60}, samesite=strict`;

        navigate("/listing");
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
                                                validationErrors.firstname && (
                                                    <FormValidationError message={validationErrors.firstname} />
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
                                                validationErrors.lastname && (
                                                    <FormValidationError message={validationErrors.lastname} />
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
                                                validationErrors.id && (
                                                    <FormValidationError message={validationErrors.id} />
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
                                                validationErrors.startingYear && (
                                                    <FormValidationError message={validationErrors.startingYear} />
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