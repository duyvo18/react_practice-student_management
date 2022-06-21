import React from "react";
import { Link, useNavigate } from "react-router-dom";
import HeaderElem from "./HeaderElem";

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
        <nav className="flex items-center justify-between h-14 bg-primary drop-shadow-md px-4 sm:px-12">
            <div className="flex w-full h-full items-center">
                <div className="flex items-center h-full flex-grow">
                    <HeaderElem
                        isCurrent={from === 'profile'}
                        href='/profile'
                        tabIndex={tabIndex}
                    >
                        My Profile
                    </HeaderElem>

                    <HeaderElem
                        isCurrent={from === 'listing'}
                        href='/listing'
                        tabIndex={tabIndex}
                    >
                        Listing
                    </HeaderElem>
                </div>
                <div className="text-base text-black">
                    <button
                        className="inline-block outline-offset-2 text-gray-400 hover:font-semibold hover:text-black focus:text-black"
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