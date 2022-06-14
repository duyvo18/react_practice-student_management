import React, { useEffect, useState } from "react";
import { getStudentDataFromPath } from "../../services/firestoreService";
import AuthWarning from "../common/AuthWarning";
import Header from "../common/Header";
import Loading from "../common/Loading";
import DeleteConfirmPopup from "./DeleteConfirmPopup";
import ProfileEdit from "./ProfileEdit";

const Profile = () => {

    const auth = document.cookie
        .split(';')
        .find(row => row.trim().startsWith('auth='))
        ?.split('=')[1] === '1';

    const userDocPath = document.cookie
        .split(';')
        .find(row => row.trim().startsWith('userDocPath='))
        ?.split('=')[1];

    const [data, setData] = useState({});
    const [edit, setEdit] = useState(false);
    const [deletePopup, setDeletePopup] = useState(false);
    const [loading, setLoading] = useState(true);

    const toggleEdit = () => setEdit(!edit);
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

    useEffect(
        () => {
            (async () => {
                setLoading(true);
                setData(await getStudentDataFromPath(userDocPath));
                setLoading(false);
            })();
        }, [edit]
    )

    return (
        (
            auth && (
                <div className="min-w-screen min-h-screen">
                    <Header from="profile" />
                    {
                        (
                            !loading && (
                                (
                                    !edit && (
                                        <div className="flex flex-col min-w-screen min-h-screen bg-secondary">
                                            <div className="container flex flex-1 flex-col items-center justify-center max-w-2xl mx-auto">
                                                <form className="bg-primary px-6 py-12 rounded-lg shadow-md text-black w-full lg:my-12">
                                                    <img
                                                        src={data.avatar}
                                                        alt="avatar"
                                                        className="max-w-[30%] mx-auto"
                                                    />

                                                    <h1 className="text-2xl lg:text-3xl text-center mt-6">
                                                        {data.firstname} <strong>{data.lastname}</strong>
                                                    </h1>
                                                    <h2 className="text-lg lg:text-xl text-center italic mt-2">
                                                        {data.id}
                                                    </h2>

                                                    <div className="w-full px-3 lg:px-12 mt-6">
                                                        <div className="text-justify italic">
                                                            {data.details}
                                                        </div>

                                                        <div className="pl-3 lg:pl-6 mt-12">
                                                            <div>
                                                                Starting Year: <strong>{data.startingYear}</strong>
                                                            </div>
                                                            <div className="mt-2">
                                                                Email: <strong>{data.email}</strong>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="grid grid-cols-2 gap-6 lg:gap-12 mt-16 lg:mt-24 mx-4 lg:mx-24">
                                                        <button
                                                            className="button py-1 px-2 lg:py-3"
                                                            type="button"
                                                            onClick={toggleEdit}
                                                        >
                                                            Edit Info
                                                        </button>
                                                        <button
                                                            className="buttonWarning py-1 px-2 lg:py-3"
                                                            type="button"
                                                            onClick={togglePopup}
                                                        >
                                                            Delete Account
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                            {
                                                deletePopup && (
                                                    <DeleteConfirmPopup
                                                        email={data.email}
                                                        onCancel={togglePopup}
                                                    />
                                                )
                                            }
                                        </div>
                                    )
                                ) || (
                                    edit &&
                                    <ProfileEdit
                                        data={data}
                                        onCancel={toggleEdit}
                                    />
                                )
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