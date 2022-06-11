import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllStudents } from "../../services/firestoreService";
import AuthWarning from "../common/AuthWarning";
import Header from "../common/Header";
import StudentCard from "./StudentCard";

const ListingContainer = () => {

    const [students, setStudents] = useState([]);
    const [query, setQuery] = useState({
        id: '',
        firstname: '',
        lastname: '',
        startingYear: ''
    });

    useEffect(
        () => {
            (
                async () => setStudents(await getAllStudents())
            )();
        }, []
    )

    const navigate = useNavigate();
    const auth = document.cookie
        .split(';')
        .find(row => row.trim().startsWith('auth='))
        ?.split('=')[1] === '1';

    const onInput = (e) => {
        const { name, value } = e.target;

        setQuery({
            ...query,
            [name]: value
        });

        filteredStudentList();
    }

    const logOut = () => {
        document.cookie = 'auth=; max-age=0'
        document.cookie = 'userDocPath=; max-age=0'

        navigate("/login")
    }

    const filteredStudentList = () => {
        let filteredStudents = students

        if (query.id) {
            filteredStudents = filteredStudents.filter(
                student => student.id.toLowerCase().includes(
                    query.id.toLowerCase()
                )
            )
        }

        if (query.firstname) {
            filteredStudents = filteredStudents.filter(
                student => student.firstname.toLowerCase().includes(
                    query.firstname.toLowerCase()
                )
            )
        }

        if (query.lastname) {
            filteredStudents = filteredStudents.filter(
                student => student.lastname.toLowerCase().includes(
                    query.lastname.toLowerCase()
                )
            )
        }

        if (query.startingYear) {
            filteredStudents = filteredStudents.filter(
                student => student.startingYear.toLowerCase().includes(
                    query.startingYear.toLowerCase()
                )
            )
        }

        return filteredStudents;
    }

    return (
        (
            auth && (
                <div className="h-full w-full">
                    <Header curr="listing" />

                    <div className="min-w-full max-h-sm">
                        <form className="grid grid-cols-4 mx-16 font-12">
                            <div className="flex flex-row">
                                <p className="flex-1/3 text-left">SID</p>
                                <input
                                    className="flex-2/3"
                                    type="text"
                                    name="id"
                                    value={query.id}
                                    placeholder="all"
                                    onInput={onInput}
                                />
                            </div>
                            <div className="grid grid-cols-2">
                                <p>Firstname</p>
                                <input
                                    type="text"
                                    name="firstname"
                                    value={query.firstname}
                                    placeholder="all"
                                    onInput={onInput}
                                />
                            </div>
                            <div className="grid grid-cols-2">
                                <p>Lastname</p>
                                <input
                                    type="text"
                                    name="lastname"
                                    value={query.lastname}
                                    placeholder="all"
                                    onInput={onInput}
                                />
                            </div>
                            <div className="grid grid-cols-2">
                                <p>Starting Year</p>
                                <input
                                    type="text"
                                    name="startingYear"
                                    value={query.startingYear}
                                    placeholder="startingYear"
                                    onInput={onInput}
                                />
                            </div>
                        </form>
                    </div>

                    <div className="max-w-3xl mx-auto mt-12 grid grid-cols-2 gap-2 grid-flow-row justify-center justify-items-center">
                        {
                            (
                                filteredStudentList().length && filteredStudentList().map(student => (
                                    <StudentCard
                                        avatar={student.avatar}
                                        firstname={student.firstname}
                                        lastname={student.lastname}
                                        id={student.id}
                                        profile={student.profile} />
                                ))
                            ) || (
                                !filteredStudentList().length && (
                                    <div>No Entry</div>
                                )
                            )
                        }
                        {/* <table className="table-auto min-w-full mx-auto text-center border">
                            <tbody>
                                <tr className="border-b" key={0}>
                                    <th className="py-2">Lastname</th>
                                    <th className="py-2">Firstname</th>
                                    <th className="py-2">SID</th>
                                    <th className="py-2">Email</th>
                                    <th className="py-2">Starting Year</th>
                                </tr>
                                {
                                    (filteredStudentList().length && filteredStudentList().map((student, idx) => (
                                        <tr className="border-b" key={idx + 1}>
                                            <td className="py-1 text-left px-5">{student.lastname}</td>
                                            <td className="py-1 text-left px-5">{student.firstname}</td>
                                            <td className="py-1 text-left px-5">{student.id}</td>
                                            <td className="py-1 text-left px-5">{student.email}</td>
                                            <td className="py-1 text-right px-5">{student.startingYear}</td>
                                        </tr>
                                    ))) ||
                                    (
                                        !filteredStudentList().length && (
                                            <tr className="border-b" key={1}>
                                                <td className="py-1 text-center"
                                                    colSpan={5}
                                                >No entry</td>
                                            </tr>
                                        )
                                    )
                                }
                            </tbody>
                        </table> */}
                    </div>

                    <button
                        className="fixed bottom-0 right-0 text-center text-sm px-2 py-2 rounded bg-blue-300 text-white hover:bg-blue-500 focus:bg-blue-500 my-1 mx-1"
                        type="button"
                        onClick={logOut}
                    >
                        Log Out
                    </button>
                </div>
            )
        ) || (
            !auth && (
                <AuthWarning />
            )
        )
    )
}

export default ListingContainer