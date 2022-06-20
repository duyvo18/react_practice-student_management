import React, { useEffect, useState } from "react";
import { getStudentDataFromPath } from "../../services/firestoreService";
import Header from "../common/Header";
import DeleteConfirmPopup from "./DeleteConfirmPopup";
import ProfileEdit from "./ProfileEdit";
import AuthWarning from "../common/AuthWarning";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Profile = () => {

    const isAuth = document.cookie
        .split(';')
        .find(row => row.trim().startsWith('auth='))
        ?.split('=')[1] === '1';

    const userDocPath = document.cookie
        .split(';')
        .find(row => row.trim().startsWith('userDocPath='))
        ?.split('=')[1];

    const [data, setData] = useState({});
    const [isEdit, setEdit] = useState(false); // TODO: Edit as separated page?
    const [popupDelete, setPopupDelete] = useState(false);
    const [isLoading, setLoading] = useState(false);

    useEffect(
        () => {
            (async () => {
                if (isAuth) {
                    try {
                        setLoading(true);

                        setData(await getStudentDataFromPath(userDocPath));

                        setLoading(false);
                    } catch (e) {
                        console.error(e);
                        // TODO: Navigate to unexpected error page
                    }
                }
            })();
        }, []
    )

    useEffect(
        () => {
            (async () => {
                if (isEdit) {
                    setData(data);
                } else {
                    try {
                        setLoading(true);

                        setData(await getStudentDataFromPath(userDocPath));

                        setLoading(false);
                    } catch (e) {
                        console.error(e);
                        // TODO: Navigate to unexpected error page
                    }
                }
            })();
        }, [isEdit]
    )

    const toggleEdit = () => setEdit(!isEdit);
    const togglePopup = () => setPopupDelete(!popupDelete);

    return (<>{
        isAuth ? (
            <div className={`w-screen h-screen ${popupDelete ? 'overflow-hidden' : 'overflow-auto'}`} >
                <Header from="profile" focusable={!popupDelete} />

                {
                    isEdit ? (
                        <ProfileEdit
                            data={data}
                            onCancel={toggleEdit}
                        />
                    ) : (
                        <div className="flex flex-col min-w-screen min-h-screen bg-secondary">
                            <div className="container flex flex-1 flex-col items-center justify-center max-w-2xl mx-auto">
                                <div className="bg-primary px-6 py-12 rounded-lg shadow-lg text-black w-full lg:my-12">
                                    {
                                        isLoading ? (
                                            <Skeleton className="min-h-[70vh]" />
                                        ) : (
                                            <>
                                                <img
                                                    src={data.avatar}
                                                    alt="avatar"
                                                    className="max-w-[30%] rounded-lg mx-auto"
                                                />

                                                <h1 className="text-2xl lg:text-3xl text-center mt-6">
                                                    {data.firstname} <strong>{data.lastname}</strong>
                                                </h1>

                                                <h2 className="text-lg lg:text-xl text-center italic mt-2">
                                                    {data.id}
                                                </h2>

                                                <div className="w-full px-3 lg:px-12 mt-6">
                                                    <div className="text-justify italic">
                                                        {
                                                            data.details?.split('\n').map((para, idx) => (
                                                                <p key={idx}>{para}<br /></p>
                                                            ))
                                                        }
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
                                                        tabIndex={popupDelete ? -1 : 0}
                                                    >
                                                        Edit Info
                                                    </button>
                                                    <button
                                                        className="buttonWarning py-1 px-2 lg:py-3"
                                                        type="button"
                                                        onClick={togglePopup}
                                                        tabIndex={popupDelete ? -1 : 0}
                                                    >
                                                        Delete Account
                                                    </button>
                                                </div>
                                            </>
                                        )
                                    }
                                </div>
                            </div>
                            {
                                popupDelete && (
                                    <DeleteConfirmPopup
                                        email={data.email}
                                        onCancel={togglePopup}
                                    />
                                )
                            }
                        </div>
                    )
                }
            </div>
        ) : (
            <AuthWarning />
        )
    }</>)
}

export default Profile