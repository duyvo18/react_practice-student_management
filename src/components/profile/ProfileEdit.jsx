import React, { useState } from "react";
import { updateStudentInfo } from "../../services/firestoreService";
import FormValidationError from "../common/FormValidationError";
import { firstnameValidError, idValidError, lastnameValidError, startingYearValidError } from "../common/inputValidation";
import Loading from "../common/Loading";

const ProfileEdit = (props) => {

    const userDocPath = document.cookie
        .split(';')
        .find(row => row.trim().startsWith('userDocPath='))
        ?.split('=')[1];

    const [localData, setLocalData] = useState(props.data);
    const [errors, setErrors] = useState({
        firstname: '',
        lastname: '',
        id: '',
        startingYear: '',
    })
    const [loading, setLoading] = useState(false);

    const onCancel = props.onCancel;

    const onInput = (e) => {
        const { name, value } = e.target;

        setLocalData(prev => ({
            ...prev,
            [name]: value
        }));

        validateInput(e)
    }

    const onUpdate = async () => {
        setLoading(true);

        await updateStudentInfo(userDocPath, localData);

        setLoading(false);

        onCancel();
    }

    const validateInput = (e) => {
        const { name, value } = e.target;

        switch (name) {
            case "firstname":
                setErrors(prev => ({
                    ...prev,
                    firstname: firstnameValidError(value)
                }));
                break;
            case "lastname":
                setErrors(prev => ({
                    ...prev,
                    lastname: lastnameValidError(value)
                }));
                break;
            case "id":
                setErrors(prev => ({
                    ...prev,
                    id: idValidError(value)
                }));
                break;
            case "startingYear":
                setErrors(prev => ({
                    ...prev,
                    startingYear: startingYearValidError(value)
                }));
                break;
            default:
                break;
        }
    }

    return (
        <div className="flex flex-col min-w-screen min-h-screen bg-secondary">
            <div className="container flex flex-1 flex-col items-center justify-center max-w-2xl mx-auto">
                {
                    (
                        !loading && (
                            <form className="bg-primary px-6 lg:px-12 py-12 rounded-lg shadow-md text-black w-full lg:my-12">
                                <img
                                    src={localData.avatar}
                                    alt="avatar"
                                    className="max-w-[30%] rounded-lg mx-auto"
                                />

                                <div className="flex flex-auto flex-row flex-nowrap items-center justify-center w-full mt-12 lg:px-12">
                                    <label
                                        className="basis-1/3 lg:basis-1/4 lg:text-lg"
                                        htmlFor="firstname"
                                    >
                                        Firstname:
                                    </label>
                                    <input
                                        className="basis-2/3 lg:basis-3/4 border-b-2 border-black p-3 py-1 px-2"
                                        type="text"
                                        name="firstname"
                                        value={localData.firstname}
                                        placeholder="Firstname"
                                        onChange={onInput}
                                        onBlur={validateInput}
                                    />
                                </div>
                                {
                                    errors.firstname && (
                                        <FormValidationError message={errors.firstname} />
                                    )
                                }

                                <div className="flex flex-auto flex-row flex-nowrap items-center justify-center w-full mt-6 lg:px-12">
                                    <label
                                        className="basis-1/3 lg:basis-1/4 lg:text-lg"
                                        htmlFor="lastname"
                                    >
                                        Lastname:
                                    </label>
                                    <input
                                        className="basis-2/3 lg:basis-3/4 border-b-2 border-black p-3 py-1 px-2"
                                        type="text"
                                        name="lastname"
                                        value={localData.lastname}
                                        placeholder="Lastname"
                                        onChange={onInput}
                                        onBlur={validateInput}
                                    />
                                </div>
                                {
                                    errors.lastname && (
                                        <FormValidationError message={errors.lastname} />
                                    )
                                }

                                <div className="flex flex-auto flex-row flex-nowrap items-center justify-center w-full mt-6 lg:px-12">
                                    <label
                                        className="basis-1/3 lg:basis-1/4 lg:text-lg"
                                        htmlFor="id"
                                    >
                                        SID:
                                    </label>
                                    <input
                                        className="basis-2/3 lg:basis-3/4 border-b-2 border-black p-3 py-1 px-2"
                                        type="text"
                                        name="id"
                                        value={localData.id}
                                        placeholder="SID"
                                        onChange={onInput}
                                        onBlur={validateInput}
                                    />
                                </div>
                                {
                                    errors.id && (
                                        <FormValidationError message={errors.id} />
                                    )
                                }

                                <div className="flex flex-auto flex-row flex-nowrap items-center justify-center w-full mt-6 lg:px-12">
                                    <label
                                        className="basis-1/3 lg:basis-1/4 lg:text-lg"
                                        htmlFor="startingYear"
                                    >
                                        Starting Year:
                                    </label>
                                    <input
                                        className="basis-2/3 lg:basis-3/4 border-b-2 border-black p-3 py-1 px-2"
                                        type="number"
                                        name="startingYear"
                                        value={localData.startingYear}
                                        placeholder="Starting Year"
                                        onChange={onInput}
                                        onBlur={validateInput}
                                    />
                                </div>
                                {
                                    errors.startingYear && (
                                        <FormValidationError message={errors.startingYear} />
                                    )
                                }

                                <div className="px-4 mt-12">
                                    <textarea
                                        className="text-left rounded-lg border-black border-2 w-full h-[20rem] resize-none p-4"
                                        name="details"
                                        value={localData.details}
                                        placeholder="Profile details"
                                        onChange={onInput}
                                        onBlur={validateInput}
                                    />

                                    <div className="grid grid-cols-2 gap-6 lg:gap-12 mt-12 lg:mx-24">
                                        <button
                                            className="button py-1"
                                            type="button"
                                            onClick={onCancel}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            className="button py-1"
                                            type="button"
                                            onClick={onUpdate}
                                        >
                                            Update Info
                                        </button>
                                    </div>
                                </div>
                            </form>
                        )
                    ) || (
                        loading && (
                            <Loading />
                        )
                    )

                }
            </div>
        </div>
    )
};

export default ProfileEdit;