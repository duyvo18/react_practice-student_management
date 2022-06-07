import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllStudents } from "../../services/firestoreService";

const ListingContainer = (props) => {

    const navigate = useNavigate();

    const [students, setStudents] = useState([]);
    const [query, setQuery] = useState({
        "id": "",
        "firstname": "",
        "lastname": "",
        "startingYear": ""
    });

    const getStudentList = async () => {
        let students = await getAllStudents();

        if (query.id) {
            students = students.filter(
                student => student.id.toLowerCase().includes(
                    query.id.toLowerCase()
                )
            )
        }
        if (query.firstname) {
            students = students.filter(
                student => student.firstname.toLowerCase().includes(
                    query.firstname.toLowerCase()
                )
            )
        }
        if (query.lastname) {
            students = students.filter(
                student => student.lastname.toLowerCase().includes(
                    query.lastname.toLowerCase()
                )
            )
        }
        if (query.startingYear) {
            students = students.filter(
                student => student.startingYear.toLowerCase().includes(
                    query.startingYear.toLowerCase()
                )
            )
        }

        return students;
    }

    const onInput = async (e) => {
        const { name, value } = e.target;

        setQuery(prev => ({
            ...prev,
            [name]: value
        }));

        setStudents(await getStudentList())
        console.log(query)
    }

    useEffect(
        () => {
            (
                async () => setStudents(await getStudentList())
            )();
        }, [students]
    )

    useEffect(
        () => {
            console.log(query)
        },
        [query]
    )

    return (
        <div className="min-h-full min-w-full">
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

            <div className="max-w-3xl mx-auto mt-12">
                <table className="table-auto min-w-full mx-auto text-center border">
                    <tbody>
                        <tr className="border-b" key={0}>
                            <th className="py-2">Lastname</th>
                            <th className="py-2">Firstname</th>
                            <th className="py-2">SID</th>
                            <th className="py-2">Email</th>
                            <th className="py-2">Starting Year</th>
                        </tr>
                        {
                            students.map((student, idx) => (
                                <tr className="border-b" key={idx + 1}>
                                    <td className="py-1">{student.lastname}</td>
                                    <td className="py-1">{student.firstname}</td>
                                    <td className="py-1">{student.id}</td>
                                    <td className="py-1">{student.email}</td>
                                    <td className="py-1">{student.startingYear}</td>
                                </tr>
                            )) || (
                                !students &&
                                <tr className="border-b" key={1}>
                                    <td className="py-1">Not found</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>



            <button
                className="fixed bottom-0 right-0 text-center text-sm px-2 py-2 rounded bg-blue-300 text-white hover:bg-blue-500 focus:bg-blue-500 my-1 mx-1"
                type="button"
                onClick={() => navigate("/login")}
            >
                Log Out
            </button>
        </div>

    )

}

export default ListingContainer