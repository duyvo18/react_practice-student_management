import React from "react";

const StudentCard = (props) => {

    const avatar = props.data.avatar;
    const firstname = props.data.firstname;
    const lastname = props.data.lastname;
    const id = props.data.id;
    const email = props.data.email;
    const details = props.data.details;
    const onClick = props.onClick;

    return (
        <div
            className="grid grid-cols-3 grid-rows-4 grid-flow-row-dense gap-2 w-72 h-40 p-3 border-2 rounded-xl transition duration-300 ease-in-out hover:scale-105 focus:scale-105"
            tabIndex={0}
            onClick={onClick}
        >
            <div className="col-span-1 row-span-2">
                <img src={avatar} alt="avatar" className="max-h-full max-w-full m-auto" />
            </div>
            <div className="col-span-2 row-span-1 my-auto text-lg">
                {firstname} <strong>{lastname}</strong>
            </div>
            <div className="col-span-2 row-span-1 my-auto text-base">
                SID: {id}
            </div>
            <div className="col-span-3 row-span-1 truncate">
                {details}
            </div>
            <div className="col-span-3 row-span-1 truncate text-right font-semibold italic">
                {email}
            </div>
        </div>
    )
}

export default StudentCard