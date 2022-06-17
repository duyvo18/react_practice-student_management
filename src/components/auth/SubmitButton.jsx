import React from "react";

const SubmitButton = (props) => {

    const onClick = props.onClick
    const isLoading = props.isLoading

    return (
        <button
            className={`${isLoading ? 'buttonBlueFilledStatic' : 'buttonBlueFilled'} font-semibold w-full p-3 mt-8`}
            type="button"
            disabled={isLoading}
            onClick={onClick}
        >
            {
                isLoading ? (
                    <div className="rounded animate-spin duration-300 w-5 h-5 border-2 border-white mx-auto" />
                ) : props.children
            }
        </button>
    );
};

export default SubmitButton;