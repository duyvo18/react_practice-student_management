import React from "react";

const NotFound = () => {
    return (
        <div className="min-w-screen min-h-screen bg-secondary flex flex-col justify-center items-center">
            <div className="flex flex-col flex-auto justify-center items-center">
                <div className="text-3xl sm:text-6xl font-bold text-accent">
                    404
                </div>
                <div className="text-2xl sm:text-4xl font-semibold mt-4">
                    Page Not Found
                </div>
                <div className="text-lg sm:text-2xl mt-6 sm:mt-10">
                    Got lost? Return to our <a className="underline hover:text-gray-500" href="/">main page</a>.
                </div>
            </div>
        </div>
    );
};

export default NotFound;