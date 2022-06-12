import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateStudentInfo } from "../../services/firestoreService";
import Header from "../common/Header";
import DeleteConfirmPopup from "./DeleteConfirmPopup";

const ProfileEdit = () => {

    const auth = document.cookie
        .split(';')
        .find(row => row.trim().startsWith('auth='))
        ?.split('=')[1] === '1';

    const userDocPath = document.cookie
        .split(';')
        .find(row => row.trim().startsWith('userDocPath='))
        ?.split('=')[1];

    const [localData, setLocalData] = useState({});
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const onInput = (e) => {
        const { name, value } = e.target;

        setLocalData(prev => ({
            ...prev,
            [name]: value
        }));

        validateInput(e)
    }

    const update = async () => {
        setLoading(true);

        await updateStudentInfo(userDocPath, localData);

        navigate("/profile");
    }

    const validateInput = (e) => {
        const { name, value } = e.target;

        switch (name) {
            default:
                break;
        }
    }

    return (
        <div className="min-w-screen min-h-screen">
            <Header from="profile" />
            <div className="flex flex-col items-center min-w-screen min-h-screen bg-red-400">
                <div className="container flex flex-col items-center justify-center max-w-3xl px-2 bg-green-400">
                    Test
                </div>
            </div>
        </div>
    )
};

export default ProfileEdit;