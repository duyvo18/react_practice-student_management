import React from "react";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const StudentCard = (props) => {

    const avatar = props.data?.avatar;
    const firstname = props.data?.firstname;
    const lastname = props.data?.lastname;
    const id = props.data?.id;
    const startingYear = props.data?.startingYear;
    const details = props.data?.details;
    const onClick = props.onClick;
    const tabIndex = props.tabIndex;

    return (
        <div
            className="grid grid-cols-3 grid-rows-4 gap-2 w-72 h-40 p-3 outline-none border-2 hover:border-accent focus:border-accent rounded-xl cursor-pointer transition duration-300 ease-in-out hover:scale-105 focus:scale-105"
            onClick={onClick}
            onKeyDown={e => e.key === "Enter" ? onClick() : undefined}
            tabIndex={tabIndex}
        >
            <div className="col-span-1 row-span-2">
                {
                    avatar ? (
                        <img src={avatar} alt="avatar" className="rounded-lg max-h-full max-w-full m-auto" />
                    ) : (<Skeleton className="h-full w-full" />)
                }
            </div>
            <div className="col-span-2 row-span-1 my-auto text-lg">
                {firstname || <Skeleton />} <strong>{lastname || <Skeleton />}</strong>
            </div>
            <div className="col-span-2 row-span-1 my-auto text-base">
                {id ? (`SID: ${id}`) : (<Skeleton />)}
            </div>
            <div className="col-span-3 row-span-1 truncate">
                {details || <Skeleton />}
            </div>
            <div className="col-span-3 row-span-1 truncate text-right font-semibold">
                {startingYear || <Skeleton />}
            </div>
        </div>
    )
}

export default StudentCard