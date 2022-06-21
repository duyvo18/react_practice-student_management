import React from "react";
import { Link } from "react-router-dom";


const HeaderElem = (props) => {

    const isCurrent = props.isCurrent;
    const href = props.href;
    const tabIndex = props.tabIndex;

    return (
        <div className={`flex w-24 items-center justify-center h-full ${isCurrent ? 'border-accent border-b-2' : ''}`}>
            {
                isCurrent ? (
                    <div className="font-bold">{props.children}</div>
                ) : (
                    <Link
                        className="outline-offset-2 font-bold text-gray-500 hover:text-black focus:text-black"
                        to={href}
                        tabIndex={tabIndex}
                    >
                        {props.children}
                    </Link>
                )
            }
        </div>
    );
};

export default HeaderElem;