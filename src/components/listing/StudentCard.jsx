import React from "react";

const StudentCard = (props) => {

    const avatar = props.avatar
    const firstname = props.firstname
    const lastname = props.lastname
    const id = props.id
    const profile = props.profile

    return (
        <div className="grid grid-cols-3 grid-rows-4 grid-flow-row-dense gap-2 w-72 h-40 p-3 border-2 rounded-xl">
            <div className="col-span-1 row-span-2">
                <img src={avatar} alt="avatar" className="max-h-full max-w-full m-auto"/>
            </div>
            <div className="col-span-2 row-span-1 my-auto text-lg">
                <span><strong>{lastname}</strong></span> {firstname}
            </div>
            <div className="col-span-2 row-span-1 my-auto text-base">
                SID: {id}
            </div>
            <div className="col-span-3 row-span-2 truncate">
                {profile}
            </div>
        </div>
    )
}

export default StudentCard