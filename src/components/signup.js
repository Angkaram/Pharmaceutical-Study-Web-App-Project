// This page is for account creation and signing up
import React, { useState } from "react";
import "./loginprompt.css";
import { useNavigate } from "react-router-dom";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase-config";

function SignUp() {
    
    let navigate = useNavigate();

    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");

    const register = async () => {

        try {
        const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
        console.log(user);
        navigate("/success");
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
    <section className="container">
        <div className="background">
            <h1 className = "header-create">Create an Account</h1>
            <p className="prompt">Add Email Address</p>
            <input className = "input" type = "text" onChange={(event => {setRegisterEmail(event.target.value);
            })}/>

            <p className="prompt">Create Password</p>
            <input className = "input" type = "password" onChange={(event => {setRegisterPassword(event.target.value);
            })}/>        

            <h1 className = "header-org">Select Organization</h1>
            <select className = "drop-down" name="select-organization">
                <option value = "Doctor">Jane Hopkins (Doctor)</option>
                <option value = "Admin">Jane Hopkins (Admin)</option>
                <option value = "Bavaria">Bavaria</option>
                <option value = "FDA">FDA</option>
            </select>

            <div>
                <button button onClick={register} className="login-button">Create Account</button>    
            </div> 

         </div>
    </section>
    );
}

export default SignUp;
