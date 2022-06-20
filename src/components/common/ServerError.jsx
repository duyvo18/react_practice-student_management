import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";


const ServerError = () => {

    const navigate = useNavigate();
    const state = useLocation().state;

    const name = state?.name;
    const message = state?.message;

    useEffect(
        () => { (state ? undefined : navigate("/"))() },
        []
    );

    return (
        <div className="min-w-screen min-h-screen bg-secondary flex flex-col justify-center items-center">
            <div className="flex flex-col flex-auto justify-center items-center text-center">
                <div className="text-6xl font-bold text-accent">
                    OOPS...
                </div>
                <div className="text-4xl font-semibold mt-4">
                    Unexpected error from server
                </div>
                <div className="text-xl mt-6">
                    Name: "{name}"
                </div>
                <div className="text-xl mt-1">
                    Message: "{message}"
                </div>
                <div className="text-2xl mt-10">
                    Unfortunately, we don't know how the deal with this problem yet.<br />
                    For now, please <a className="underline hover:text-gray-500" href="/">click here</a> to return to our main page.
                </div>
            </div>
        </div>
    );
};

export default ServerError;