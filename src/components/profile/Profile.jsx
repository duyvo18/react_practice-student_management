import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getStudentDataFromPath } from "../../services/firestoreService";
import AuthWarning from "../common/AuthWarning";
import Header from "../common/Header";
import Loading from "../common/Loading";
import DeleteConfirmPopup from "./DeleteConfirmPopup";

const Profile = () => {

    const navigate = useNavigate();

    const auth = document.cookie
        .split(';')
        .find(row => row.trim().startsWith('auth='))
        ?.split('=')[1] === '1';

    const userDocPath = document.cookie
        .split(';')
        .find(row => row.trim().startsWith('userDocPath='))
        ?.split('=')[1];

    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [deletePopup, setDeletePopup] = useState(false);

    const togglePopup = () => setDeletePopup(!deletePopup);

    useEffect(
        () => {
            (async () => {
                const dataFromServer = userDocPath ? await getStudentDataFromPath(userDocPath) : {};
                setData(dataFromServer);
                setLoading(false);
            })();
        }, []
    )

    return (
        (
            auth && (
                <div className="min-w-screen min-h-screen">
                    <Header from="profile" />
                    {
                        (
                            !loading && (
                                <div className="flex flex-col min-w-screen min-h-screen bg-secondary">
                                    <div className="container flex flex-1 flex-col items-center justify-center max-w-2xl mx-auto ">
                                        <div className="bg-primary px-6 py-12 rounded shadow-md text-black w-full my-12">
                                            <form>
                                                <img
                                                    src={data.avatar}
                                                    alt="avatar"
                                                    className="max-w-[30%] mx-auto"
                                                />

                                                <h1 className="text-3xl text-center mt-6">
                                                    {data.firstname} <strong>{data.lastname}</strong>
                                                </h1>
                                                <h2 className="text-xl text-center italic mt-2">
                                                    {data.id}
                                                </h2>

                                                <div className="px-12 mt-6">
                                                    <div className="text-justify italic">
                                                        {data.details}
                                                    </div>

                                                    <div className="pl-6 mt-12">
                                                        <div>
                                                            Starting Year: <strong>{data.startingYear}</strong>
                                                        </div>
                                                        <div className="mt-2">
                                                            Email: <strong>{data.email}</strong>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-2 gap-12 mt-24 mx-24">
                                                    <button
                                                        className="button"
                                                        type="button"
                                                        onClick={() => navigate("/profile/edit")}
                                                    >
                                                        Edit Info
                                                    </button>
                                                    {/* FIXME: onclick popup */}
                                                    <button
                                                        className="buttonWarning"
                                                        type="button"
                                                        onClick={togglePopup}
                                                    >
                                                        Delete Account
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    {
                                        deletePopup && (
                                            <DeleteConfirmPopup
                                                email={data.email}
                                                onClick={togglePopup}
                                            />
                                        )
                                    }
                                </div>
                            )
                        ) || (
                            loading && (
                                <Loading />
                            )
                        )
                    }
                </div>
            )
        ) || (
            !auth && (
                <AuthWarning />
            )
        )
    )
}

export default Profile