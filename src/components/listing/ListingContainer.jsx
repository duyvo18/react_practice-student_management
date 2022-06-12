import React, { useEffect, useState } from "react";
import { getAllStudents } from "../../services/firestoreService";
import AuthWarning from "../common/AuthWarning";
import Header from "../common/Header";
import StudentCard from "./StudentCard";

const ListingContainer = () => {

    const [loading, setLoading] = useState(true);
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
                async () => {
                    setStudents(await getAllStudents());
                    setLoading(false);
                }
            )();
        }, []
    )

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
                    <Header from="listing" />

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
                                filteredStudentList().length && filteredStudentList().map((student, idx) => (
                                    <StudentCard
                                        key={idx}
                                        avatar={student.avatar}
                                        firstname={student.firstname}
                                        lastname={student.lastname}
                                        id={student.id}
                                        profile={student.profile} />
                                ))
                            ) || (
                                !filteredStudentList().length && !loading && (
                                    <div className="col-span-2 text-lg font-semibold italic">No Entry</div>
                                )
                            ) || (
                                <div className="col-span-2 text-lg font-semibold italic">Loading Entries...</div>
                            )
                        }
                    </div>
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