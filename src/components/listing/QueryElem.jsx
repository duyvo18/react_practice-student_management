import React from "react";

const QueryElem = (props) => {
    const type = props.type;
    const name = props.name;
    const value = props.value;
    const placeholder = props.placeholder ?? "all"
    const onInput = props.onInput;
    const tabIndex = props.tabIndex;

    return (
        <div className="flex flex-nowrap space-x-4 w-72 lg:w-fit">
            <p className="basis-1/3 lg:basis-2/5">
                {props.children}
            </p>
            <input
                className="basis-2/3 lg:basis-3/5 rounded outline-none border-black border-b-2 focus:border-accent"
                type={type}
                name={name}
                value={value}
                placeholder={placeholder}
                onInput={onInput}
                tabIndex={tabIndex}
            />
        </div>
    );
};

export default QueryElem;