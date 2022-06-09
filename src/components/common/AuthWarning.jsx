import React from "react";

const AuthWarning = () => {

    return (
        <div className="min-h-screen min-w-screen bg-gray-100 py-20 text-center text-xl sm:text-3xl font-bold">
            Please{' '}
            <a
                className="no-underline border-b border-blue"
                href="/login"
            >login</a>
            {' '}or{' '}
            <a
                className="no-underline border-b border-blue"
                href="/"
            >signup</a>{' '}to continue.
        </div>
    )
}

export default AuthWarning;