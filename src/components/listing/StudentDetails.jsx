import React from "react";

const StudentDetails = (props) => {

    const data = props.data;
    const onClose = props.onClose;

    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[rgba(0,0,0,0.5)]">
            <div className="container flex flex-col items-center justify-center w-[70%] h-[80%]">
                <div
                    className="relative flex flex-col items-center overflow-y-auto rounded-2xl p-6 bg-white"
                    autofocus
                >
                    <strong
                        className="absolute top-3 right-3 text-xl align-center cursor-pointer"
                        onClick={onClose}
                        onKeyDown={e => e.key === "Enter" ? onClose() : undefined}
                        tabIndex={0}
                    >
                        &times;
                    </strong>

                    <img
                        src={data.avatar}
                        alt="avatar"
                        className="max-w-[30%] rounded-lg mx-auto"
                    />

                    <h1 className="text-3xl text-center mt-6">
                        {data.firstname} <strong>{data.lastname}</strong>
                    </h1>
                    <h2 className="text-xl text-center italic mt-2">
                        {data.id}
                    </h2>

                    <div className="mt-6">
                        Starting Year: <strong>{data.startingYear}</strong>
                    </div>

                    <div className="w-full text-justify mt-8 px-4">
                        {
                            data.details ? data.details.split('\n').map((para, idx) => (
                                <p key={idx}>{para}<br /></p>
                            )) : ''
                        }
                    </div>
                </div>
            </div>
        </div>
    )
};

export default StudentDetails;
