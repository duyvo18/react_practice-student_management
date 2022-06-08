import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setStudent } from "../../services/firestoreService";

const StudentInfoContainer = () => {

    const navigate = useNavigate();
    // TODO: if docRef null
    const docPath = localStorage.getItem("docPath");

    const [inputs, setInputs] = useState({
        "firstname": '',
        "lastname": '',
        "sid": '',
        "startingYear": '',
    })

    const onInput = (event) => {
        const { name, value } = event.target;

        setInputs(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const signUp = async () => {
        await setStudent(docPath, inputs);
        localStorage.setItem("auth", "1")
        
        navigate("/listing");
    }

    return (
        (
            docPath && (
                <div className="bg-grey-lighter min-h-full min-w-full flex flex-col">
                    <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                            <form>
                                <h1 className="mb-8 text-3xl text-center">Sign Up</h1>
                                <input
                                    className="block border border-grey-light w-full p-3 rounded mb-4"
                                    type="text"
                                    name="firstname"
                                    value={inputs.firstname}
                                    placeholder="First Name"
                                    onChange={onInput} />

                                <input
                                    className="block border border-grey-light w-full p-3 rounded mb-4"
                                    type="text"
                                    name="lastname"
                                    value={inputs.lastname}
                                    placeholder="Last Name"
                                    onChange={onInput} />

                                <input
                                    className="block border border-grey-light w-full p-3 rounded mb-4"
                                    type="text"
                                    name="sid"
                                    value={inputs.sid}
                                    placeholder="Student ID"
                                    onChange={onInput} />

                                <input
                                    className="block border border-grey-light w-full p-3 rounded mb-4"
                                    type="text"
                                    name="startingYear"
                                    value={inputs.startingYear}
                                    placeholder="Starting Year"
                                    onChange={onInput} />

                                <button
                                    className="w-full text-center py-3 rounded bg-blue-500 text-white hover:bg-blue-600 focus:bg-blue-600 my-1"
                                    type="reset"
                                    onClick={signUp}
                                >Create Account</button>
                            </form>
                        </div>
                    </div>
                </div>
            )
        ) || (
            !docPath && (
                <div className="text-center text-4xl font-bold">
                    Please <a href="/login">login</a> or <a href="/">signup</a> to continue.
                </div>
            )
        )
    )
}

export default StudentInfoContainer;