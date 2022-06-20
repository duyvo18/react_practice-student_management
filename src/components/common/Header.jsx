import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = (props) => {

    const navigate = useNavigate();

    const from = props.from;
    const tabIndex = ((focusable) => {
        if (focusable === undefined)
            return 0;
        else
            return focusable ? 0 : -1;
    })(props.focusable)

    const onLogout = () => {
        document.cookie = 'auth=; max-age=0'
        document.cookie = 'userDocPath=; max-age=0'

        navigate("/")
    }

    return (
        <nav className="flex items-center justify-between h-16 bg-primary border-b-4 border-double border-black px-4">
            <div className="w-full flex items-center">
                <div className="text-base text-active font-bold flex-grow">
                    {
                        (
                            from !== "profile" && (
                                <Link
                                    className="inline-block outline-offset-2 text-inactive hover:text-active focus:text-active mr-5"
                                    to={'/profile'}
                                    tabIndex={tabIndex}
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
                                    className="inline-block outline-offset-2 text-inactive hover:text-active focus:text-active mr-5"
                                    to={'/listing'}
                                    tabIndex={tabIndex}
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
                        className="inline-block outline-offset-2 text-gray-400 hover:font-semibold hover:text-black focus:text-black mr-4"
                        onClick={onLogout}
                        tabIndex={tabIndex}
                    >
                        Log Out
                    </button>
                </div>
            </div>
        </nav>
    )
};

export default Header;