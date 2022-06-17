import React from "react";

const FormFooterLink = (props) => {
    return (
        <a
            className="text-gray-400 hover:text-gray-700 focus:text-gray-700 no-underline outline-none border-b border-gray-300 hover:border-gray-400 focus:border-gray-400"
            href={props.href}
        >
            {props.children}
        </a>
    );
};

export default FormFooterLink;