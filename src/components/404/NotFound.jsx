import React from "react";

const NotFound = () => {
    return (
        <div className="min-w-screen min-h-screen bg-secondary flex flex-col justify-center items-center">
            <div className="flex flex-col flex-auto justify-center items-center">
                <div className="text-5xl font-bold">
                    404: Not Found
                </div>
                <div className="text-2xl mt-12">
                    Got lost? Return to our <a className="underline" href="/">main page</a>.
                </div>
            </div>
        </div>
    );
};

export default NotFound;