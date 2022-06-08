import React, { useState } from "react";
import { useNavigate } from "react-router-dom"
import { login } from "../../services/authService";

const LogInContainer = () => {
    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        "email": '',
        "password": ''
    })

    const onInput = (event) => {
        const { name, value } = event.target;

        setInputs(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const logIn = async () => {
        if (await login(inputs.email, inputs.password)) {            
            localStorage.setItem("auth", "1")
            navigate("/listing")
        }
    }

    return (
        <div className="bg-grey-lighter min-h-full min-w-full flex flex-col">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                    <form>
                        <h1 className="mb-8 text-3xl text-center">Log In</h1>
                        <input
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            type="text"
                            name="email"
                            value={inputs.email}
                            placeholder="Email"
                            onChange={onInput} />

                        <input
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            type="password"
                            name="password"
                            value={inputs.password}
                            placeholder="Password"
                            onChange={onInput} />

                        <button
                            className="w-full text-center py-3 rounded bg-blue-500 text-white hover:bg-blue-600 focus:bg-blue-600 my-1"
                            type="reset"
                            onClick={logIn}
                        >Log In</button>
                    </form>
                </div>

                <div className="text-grey-dark mt-6">
                    <a className="no-underline border-b border-blue text-blue" href="/">
                        Create a new account
                    </a>.
                </div>
            </div>
        </div>
    )
}

export default LogInContainer;