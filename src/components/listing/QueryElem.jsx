import React from "react";

const QueryElem = (props) => {
    const type = props.type;
    const name = props.name;
    const value = props.value;
    const placeholder = props.placeholder ?? "all"
    const onInput = props.onInput;
    const tabIndex = props.tabIndex;

    return (
        <div className="flex flex-row flex-nowrap mt-2 lg:mt-0 lg:ml-2">
            <p className="flex-auto basis-1/3 lg:basis-2/5 mr-2">
                {props.children}
            </p>
            <input
                className="flex-auto basis-2/3 lg:basis-3/5 bg-inherit border-inactive border-b-2"
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