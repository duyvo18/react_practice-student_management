import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = (props) => {

    const navigate = useNavigate();

    const curr = props.curr;

    const logOut = () => {
        document.cookie = 'auth=; max-age=0'
        document.cookie = 'userDocPath=; max-age=0'

        navigate("/login")
    }

    return (
        <nav className="flex items-center justify-between flex-wrap bg-gray-100 h-16 px-4">
            <div className="w-full flex items-center">
                <div className="text-base text-black font-bold flex-grow">
                    {
                        curr !== "profile" && (
                            <Link
                                className="inline-block border-black border-0 hover:border-b-2 focus:border-b-2 focus:outline-0 mr-5"
                                to={'/profile'}
                            >
                                Profile
                            </Link>
                        )
                    }
                    {
                        curr !== "listing" && (
                            <Link
                                className="inline-block border-black border-0 hover:border-b-2 focus:border-b-2 focus:outline-0 mr-5"
                                to={'/listing'}
                            >
                                Listing
                            </Link>
                        )
                    }
                </div>
                <div className="text-base text-black">
                    <button
                        className="inline-block border-black border-0 hover:border-b-2 focus:border-b-2 focus:outline-0 mr-4"
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