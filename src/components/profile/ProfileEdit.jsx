import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateStudentInfo } from "../../services/firestoreService";

const ProfileEdit = (props) => {

    const navigate = useNavigate();

    const auth = document.cookie
        .split(';')
        .find(row => row.trim().startsWith('auth='))
        ?.split('=')[1] === '1';

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

        onCancel();
    }

    const validateInput = (e) => {
        const { name, value } = e.target;

        switch (name) {
            case "firstname":
                if (!value) {
                    setErrors(prev => ({
                        ...prev,
                        firstname: 'Firstname cannot be empty.'
                    }))
                } else {
                    setErrors(prev => ({
                        ...prev,
                        firstname: ''
                    }))
                }
                break;
            case "lastname":
                if (!value) {
                    setErrors(prev => ({
                        ...prev,
                        lastname: 'Lastname cannot be empty.'
                    }))
                } else {
                    setErrors(prev => ({
                        ...prev,
                        lastname: ''
                    }))
                }
                break;
            case "id":
                if (!(/^\d+$/).test(value) || value.length < 6 || value.length > 10) {
                    setErrors(prev => ({
                        ...prev,
                        id: 'Student ID must be between 6 to 10 digits'
                    }))
                } else {
                    setErrors(prev => ({
                        ...prev,
                        id: ''
                    }))
                };
                break;
            case "startingYear":
                if (!(/^\d+$/).test(value) || value < 2000 || value > new Date().getFullYear()) {
                    setErrors(prev => ({
                        ...prev,
                        startingYear: 'Starting year must be between 2000 and current year'
                    }))
                } else {
                    setErrors(prev => ({
                        ...prev,
                        startingYear: ''
                    }))
                };
                break;
            default:
                break;
        }
    }

    return (
        <div className="flex flex-col min-w-screen min-h-screen bg-secondary">
            <div className="container flex flex-1 flex-col items-center justify-center max-w-2xl mx-auto ">
                <form className="bg-primary px-12 py-12 rounded shadow-md text-black w-full my-12">
                    <img
                        src={localData.avatar}
                        alt="avatar"
                        className="max-w-[30%] mx-auto"
                    />

                    <div className="flex flex-auto flex-row flex-nowrap items-center justify-center w-full mt-12 px-12">
                        <label
                            className="basis-1/4 text-lg"
                            for="firstname"
                        >
                            Firstname:
                        </label>
                        <input
                            className="basis-3/4 border-b-2 border-black p-3 py-1 px-2"
                            type="text"
                            name="firstname"
                            value={localData.firstname}
                            placeholder="Firstname"
                            onChange={onInput}
                            onBlur={validateInput}
                        />
                    </div>

                    <div className="flex flex-auto flex-row flex-nowrap items-center justify-center w-full mt-6 px-12">
                        <label
                            className="basis-1/4 text-lg"
                            for="lastname"
                        >
                            Lastname:
                        </label>
                        <input
                            className="basis-3/4 border-b-2 border-black p-3 py-1 px-2"
                            type="text"
                            name="lastname"
                            value={localData.lastname}
                            placeholder="Lastname"
                            onChange={onInput}
                            onBlur={validateInput}
                        />
                    </div>

                    <div className="flex flex-auto flex-row flex-nowrap items-center justify-center w-full mt-6 px-12">
                        <label
                            className="basis-1/4 text-lg"
                            for="id"
                        >
                            SID:
                        </label>
                        <input
                            className="basis-3/4 border-b-2 border-black p-3 py-1 px-2"
                            type="text"
                            name="id"
                            value={localData.id}
                            placeholder="SID"
                            onChange={onInput}
                            onBlur={validateInput}
                        />
                    </div>

                    <div className="flex flex-auto flex-row flex-nowrap items-center justify-center w-full mt-6 px-12">
                        <label
                            className="basis-1/4 text-lg"
                            for="startingYear"
                        >
                            Starting Year:
                        </label>
                        <input
                            className="basis-3/4 border-b-2 border-black p-3 py-1 px-2"
                            type="number"
                            name="startingYear"
                            value={localData.startingYear}
                            placeholder="Starting Year"
                            onChange={onInput}
                            onBlur={validateInput}
                        />
                    </div>

                    <div className="px-6 mt-12">
                        <textarea
                            className="rounded-lg border-black border-2 w-full h-[300px] border p-3"
                            name="details"
                            value={localData.details}
                            placeholder="Profile details"
                            onChange={onInput}
                            onBlur={validateInput}
                        />

                        <div className="grid grid-cols-2 gap-12 mt-12 mx-24">
                            <button
                                className="button"
                                type="button"
                                onClick={onCancel}
                            >
                                Cancel
                            </button>
                            <button
                                className="button"
                                type="button"
                                onClick={onUpdate}
                            >
                                Update Info
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default ProfileEdit;