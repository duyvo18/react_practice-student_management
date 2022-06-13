import React from "react";

const StudentDetails = (props) => {

    const data = props.data;
    const onClose = props.onClose;

    return (
        <div className="fixed top-0 bottom-0 left-0 right-0 z-50 bg-[rgba(0,0,0,0.5)]">
            <div className="flex flex-col items-center justify-center min-h-screen min-w-screen">
                <div className="relative flex flex-col items-center justify-center max-w-3xl rounded-2xl px-6 py-12 bg-white">
                    <strong
                        class="absolute top-[6px] right-[12px] text-xl align-center cursor-pointer alert-del"
                        onClick={onClose}
                    >
                        &times;
                    </strong>
                    
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

                    <div className="w-full px-12 mt-6">
                        <div className="pl-6">
                            <div>
                                Starting Year: <strong>{data.startingYear}</strong>
                            </div>
                        </div>

                        <div className="text-justify mt-4">
                            {data.details}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default StudentDetails;