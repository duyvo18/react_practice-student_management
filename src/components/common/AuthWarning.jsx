import React from "react";

const AuthWarning = () => {

    return (
        <div className="min-w-screen min-h-screen bg-secondary flex flex-col justify-center items-center">
            <div className="flex flex-col flex-auto justify-center items-center">
                <div className="text-6xl font-bold text-accent">
                    Authorization Warning
                </div>
                <div className="text-4xl font-semibold mt-4">
                    It appears you had been logged out.
                </div>
                <div className="text-2xl mt-10">
                    Please{' '}
                    <a className="underline hover:text-gray-500" href="/">login</a>
                    {' '}or{' '}
                    <a className="underline hover:text-gray-500" href="/signup">signup</a>
                    {' '}to continue.
                </div>
            </div>
        </div>
    )
}

export default AuthWarning;