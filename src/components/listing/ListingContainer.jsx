import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllStudents } from "../../services/firestoreService";
import AuthWarning from "../common/AuthWarning";

class ListingContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            students: [],
            query: {
                id: '',
                firstname: '',
                lastname: '',
                startingYear: ''
            }
        };

        this.navigate = useNavigate();
        this.auth = document.cookie
            .split(';')
            .find(row => row.trim().startsWith('auth='))
            ?.split('=')[1] === '1';
    }

    async filterStudentList() {
        let filteredStudents = this.state.students

        if (this.state.query.id) {
            filteredStudents = filteredStudents.filter(
                student => student.id.toLowerCase().includes(
                    this.state.query.id.toLowerCase()
                )
            )
        }
        if (this.state.query.firstname) {
            filteredStudents = filteredStudents.filter(
                student => student.firstname.toLowerCase().includes(
                    this.state.query.firstname.toLowerCase()
                )
            )
        }
        if (this.state.query.lastname) {
            filteredStudents = filteredStudents.filter(
                student => student.lastname.toLowerCase().includes(
                    this.state.query.lastname.toLowerCase()
                )
            )
        }
        if (this.state.query.startingYear) {
            filteredStudents = filteredStudents.filter(
                student => student.startingYear.toLowerCase().includes(
                    this.state.query.startingYear.toLowerCase()
                )
            )
        }

        this.setStudents(filteredStudents);
    }

    logOut() {
        document.cookie = 'auth=; max-age=0'
        document.cookie = 'userDocPath=; max-age=0'

        this.navigate("/login")
    }

    async onInput(e) {
        const { name, value } = e.target;

        this.state.query = ({
            ...this.state.query,
            [name]: value
        });

        await this.filterStudentList();
    }

    render() {
        return (
            (
                this.state.auth && (
                    <div className="min-h-full min-w-full">
                        <div className="min-w-full max-h-sm">
                            <form className="grid grid-cols-4 mx-16 font-12">
                                <div className="flex flex-row">
                                    <p className="flex-1/3 text-left">SID</p>
                                    <input
                                        className="flex-2/3"
                                        type="text"
                                        name="id"
                                        value={this.state.query.id}
                                        placeholder="all"
                                        onInput={this.onInput}
                                    />
                                </div>
                                <div className="grid grid-cols-2">
                                    <p>Firstname</p>
                                    <input
                                        type="text"
                                        name="firstname"
                                        value={this.state.query.firstname}
                                        placeholder="all"
                                        onInput={this.onInput}
                                    />
                                </div>
                                <div className="grid grid-cols-2">
                                    <p>Lastname</p>
                                    <input
                                        type="text"
                                        name="lastname"
                                        value={this.state.query.lastname}
                                        placeholder="all"
                                        onInput={this.onInput}
                                    />
                                </div>
                                <div className="grid grid-cols-2">
                                    <p>Starting Year</p>
                                    <input
                                        type="text"
                                        name="startingYear"
                                        value={this.state.query.startingYear}
                                        placeholder="startingYear"
                                        onInput={this.onInput}
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
                                        (this.state.students.length && this.state.students.map((student, idx) => (
                                            <tr className="border-b" key={idx + 1}>
                                                <td className="py-1 text-left px-5">{student.lastname}</td>
                                                <td className="py-1 text-left px-5">{student.firstname}</td>
                                                <td className="py-1 text-left px-5">{student.id}</td>
                                                <td className="py-1 text-left px-5">{student.email}</td>
                                                <td className="py-1 text-right px-5">{student.startingYear}</td>
                                            </tr>
                                        ))) ||
                                        (
                                            !this.state.students.length && (
                                                <tr className="border-b" key={1}>
                                                    <td className="py-1 text-center"
                                                        colSpan={5}
                                                    >No entry</td>
                                                </tr>
                                            )
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>

                        <button
                            className="fixed bottom-0 right-0 text-center text-sm px-2 py-2 rounded bg-blue-300 text-white hover:bg-blue-500 focus:bg-blue-500 my-1 mx-1"
                            type="button"
                            onClick={this.logOut}
                        >
                            Log Out
                        </button>
                    </div>
                )
            ) || (
                !this.state.auth && (
                    <AuthWarning />
                )
            )
        )
    }
}


// const ListingContainer = (props) => {

//     // TODO: test + add refresh button
//     (async () => {
//         setStudents(await getAllStudents())
//     }
//     )()

//     useEffect(
//         () => {
//             (async () => await filterStudentList())();
//         }
//     )

// }

export default ListingContainer