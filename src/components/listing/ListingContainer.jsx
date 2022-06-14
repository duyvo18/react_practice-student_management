import React, { useEffect, useState } from "react";
import { getAllStudents } from "../../services/firestoreService";
import AuthWarning from "../common/AuthWarning";
import Header from "../common/Header";
import Loading from "../common/Loading";
import StudentCard from "./StudentCard";
import StudentDetails from "./StudentDetails";

const ListingContainer = () => {

    const auth = document.cookie
        .split(';')
        .find(row => row.trim().startsWith('auth='))
        ?.split('=')[1] === '1';

    const [loading, setLoading] = useState(true);
    const [students, setStudents] = useState([]);
    const [query, setQuery] = useState({
        id: '',
        firstname: '',
        lastname: '',
        startingYear: ''
    });
    const [details, setDetails] = useState();

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

    const onInput = (e) => {
        const { name, value } = e.target;

        setQuery({
            ...query,
            [name]: value
        });

        filteredStudentList();
    }

    const viewDetails = (studentData) => setDetails(studentData);

    const closeDetails = () => setDetails(undefined);

    return (
        (
            auth && (
                <div className="min-h-screen min-w-screen">
                    <Header from="listing" />

                    <div className="flex flex-col min-w-screen min-h-screen bg-secondary">
                        <div className="flex flex-col lg:flex-row flex-nowrap bg-primary text-sm xl:text-base font-semibold px-12 sm:px-36 lg:px-6 py-4 border-b-2">
                            <div className="flex-auto flex flex-row flex-nowrap">
                                <p className="basis-1/3 lg:basis-2/5 mr-2">SID:</p>
                                <input
                                    className="basis-2/3 lg:basis-3/5 bg-inherit border-inactive border-b-2"
                                    type="text"
                                    name="id"
                                    value={query.id}
                                    placeholder="all"
                                    onInput={onInput}
                                />
                            </div>
                            <div className="flex-auto flex flex-row flex-nowrap mt-2 lg:mt-0 lg:ml-2">
                                <p className="basis-1/3 lg:basis-2/5 mr-2">Firstname:</p>
                                <input
                                    className="basis-2/3 lg:basis-3/5 bg-inherit border-inactive border-b-2"
                                    type="text"
                                    name="firstname"
                                    value={query.firstname}
                                    placeholder="all"
                                    onInput={onInput}
                                />
                            </div>
                            <div className="flex-auto flex flex-row flex-nowrap mt-2 lg:mt-0 lg:ml-2">
                                <p className="basis-1/3 lg:basis-2/5 mr-2">Lastname:</p>
                                <input
                                    className="basis-2/3 lg:basis-3/5 bg-inherit border-inactive border-b-2"
                                    type="text"
                                    name="lastname"
                                    value={query.lastname}
                                    placeholder="all"
                                    onInput={onInput}
                                />
                            </div>
                            <div className="flex-auto flex flex-row flex-nowrap mt-2 lg:mt-0 lg:ml-2">
                                <p className="basis-1/3 lg:basis-2/5 mr-2">Starting Year:</p>
                                <input
                                    className="basis-2/3 lg:basis-3/5 bg-inherit border-inactive border-b-2"
                                    type="text"
                                    name="startingYear"
                                    value={query.startingYear}
                                    placeholder="all"
                                    onInput={onInput}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center justify-items-center max-w-4xl lg:max-w-6xl bg-primary rounded-xl shadow-md px-6 py-12 mx-auto my-12">
                            {
                                (
                                    filteredStudentList().length && filteredStudentList().map((student, idx) => (
                                        <StudentCard
                                            key={idx}
                                            data={student}
                                            onClick={() => viewDetails(student)}
                                        />
                                    ))
                                ) || (
                                    !filteredStudentList().length && !loading && (
                                        <div className="col-span-2 text-lg font-semibold italic">No Entry</div>
                                    )
                                ) || (
                                    <div className="col-span-2 xl:col-span-3">
                                        <Loading />
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    {
                        details && (
                            <StudentDetails data={details} onClose={closeDetails} />
                        )
                    }
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