import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = (props) => {

    const navigate = useNavigate();

    const from = props.from;

    const logOut = () => {
        document.cookie = 'auth=; max-age=0'
        document.cookie = 'userDocPath=; max-age=0'

        navigate("/login")
    }

    return (
        <nav className="flex items-center justify-between h-16 bg-primary border-b-4 border-double border-black px-4">
            <div className="w-full flex items-center">
                <div className="text-base text-active font-bold flex-grow">
                    {
                        (
                            from !== "profile" && (
                                <Link
                                    className="inline-block text-inactive hover:text-active focus:text-active mr-5"
                                    to={'/profile'}
                                >
                                    My Profile
                                </Link>
                            )
                        ) || (
                            from === "profile" && (
                                <div
                                    className="inline-block border-active border-b-2 outline-0 mr-5"
                                >
                                    My Profile
                                </div>
                            )
                        )
                    }
                    {
                        (
                            from !== "listing" && (
                                <Link
                                    className="inline-block text-inactive hover:text-active focus:text-active mr-5"
                                    to={'/listing'}
                                >
                                    Listing
                                </Link>
                            )
                        ) || (
                            from === "listing" && (
                                <div
                                    className="inline-block border-active border-b-2 outline-0 mr-5"
                                >
                                    Listing
                                </div>
                            )
                        )
                    }
                </div>
                <div className="text-base text-black">
                    <button
                        className="inline-block text-gray-400 hover:text-black hover:font-semibold focus:text-black hover:font-semibold mr-4"
                        onClick={logOut}
                    >
                        Log Out
                    </button>
                </div>
            </div>
        </nav>
    )
};

export default Header;