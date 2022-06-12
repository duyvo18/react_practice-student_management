import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteStudentAccount } from "../../services/firestoreService";
import Loading from "../common/Loading";
import FormValidationError from "../common/FormValidationError";

const DeleteConfirmPopup = (props) => {

    const navigate = useNavigate();

    const userEmail = props.email;

    const [inputs, setInputs] = useState({
        email: '',
        password: '',
    })

    const [errors, setErrors] = useState({
        email: '',
        password: '',
        auth: '',
    })

    const [loading, setLoading] = useState(false);

    const onInput = (e) => {
        const { name, value } = e.target;

        setInputs(prev => ({
            ...prev,
            [name]: value
        }));

        validateInput(e);
    }

    const onDelete = async () => {
        if (!errors.auth && !errors.email && !errors.password) {
            setLoading(true);

            const [email, password] = inputs;

            if (await deleteStudentAccount(email, password)) {
                navigate("/login");
            } else {
                setErrors(prev => ({
                    ...prev,
                    auth: 'Please check your information.'
                }));

                setLoading(false);
            }
        }
    }

    const validateInput = (e) => {
        const { name, value } = e.target;

        switch (name) {
            case "email":
                if (!value) {
                    setErrors(prev => ({
                        ...prev,
                        email: 'Email cannot be empty.'
                    }));
                } else if (value !== userEmail) {
                    setErrors(prev => ({
                        ...prev,
                        email: 'Email does not match your account.'
                    }));
                }
                break;
            case "password":
                if (!value) {
                    setErrors(prev => ({
                        ...prev,
                        password: 'Password cannot be empty.'
                    }));
                }
                break;
            default:
                break;
        }
    }

    return (
        <div className="fixed top-0 bottom-0 left-0 right-0 z-50 bg-[rgba(0,0,0,0.5)]">
            <div className="flex flex-col items-center justify-center min-h-screen min-w-screen">
                {
                    (
                        !loading && (
                            <div className="flex flex-col items-center justify-center max-w-3xl rounded-2xl p-6 bg-white">
                                <div className="text-red-500 font-bold text-xl">
                                    CAUTION!
                                </div>
                                <div className="text-red-500 font-semibold italic text-center mt-2">
                                    This action will delete your account<br />
                                    and cannot be undo.
                                </div>

                                <div className="text-black font-semibold text-center mt-4">
                                    To continue, please confirm your information.
                                </div>
                                <input
                                    className="rounded-lg border border-gray-400 py-1 px-3 mt-4"
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    onChange={onInput}
                                    tabIndex={2}
                                />
                                {
                                    errors.email && (
                                        <FormValidationError message={errors.email} />
                                    )
                                }

                                <input
                                    className="rounded-lg border border-gray-400 py-1 px-3 mt-4"
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    onChange={onInput}
                                    tabIndex={3}
                                />
                                {
                                    errors.password && (
                                        <FormValidationError message={errors.password} />
                                    )
                                }

                                {
                                    errors.auth && (
                                        <div className="mt-4">
                                            <FormValidationError message={errors.auth} />
                                        </div>
                                    )
                                }

                                <div className="grid grid-cols-2 gap-24 mt-6">
                                    <button
                                        className="rounded-lg font-semibold text-red-500 hover:text-white focus:text-white border-2 border-red-500 hover:bg-red-500 focus:bg-red-500 py-1 px-3"
                                        tabIndex={4}
                                        onClick={onDelete}
                                    >
                                        Delete
                                    </button>
                                    <button
                                        className="rounded-lg font-semibold text-black hover:text-white focus:text-white border-2 border-black hover:bg-black focus:bg-black py-1 px-3"
                                        tabIndex={1}
                                        autoFocus
                                        onClick={() => navigate("/profile")}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )
                    ) || (
                        loading && (
                            <Loading />
                        )
                    )
                }
            </div>
        </div>
    );
};

export default DeleteConfirmPopup;