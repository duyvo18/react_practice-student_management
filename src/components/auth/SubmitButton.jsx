import React from "react";
import Loading from "../common/Loading";

const SubmitButton = (props) => {

    const onClick = props.onClick
    const isLoading = props.isLoading

    return (
        <button
            className={`${isLoading ? 'buttonBlueFilledStatic' : 'buttonBlueFilled'} font-semibold w-full p-3 mt-12`}
            type="button"
            disabled={isLoading}
            onClick={onClick}
        >
            {isLoading ? (<Loading />) : props.children}
        </button>
    );
};

export default SubmitButton;