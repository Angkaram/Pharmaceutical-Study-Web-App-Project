// General login page, also redirects users to create an account if necessary
import React, { useState } from "react";
import "./loginprompt.css";
import { useNavigate } from "react-router-dom";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase-config";
import NavigationBar from "./NavigationBar";

function LoginPrompt() {

    let navigate = useNavigate();
    //onClick={() => {navigate("/add");}}


    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const login = async () => {

        try {
        const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
        console.log(user);
        navigate("/View");
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
    <div className="loginPage">

        <NavigationBar isLogin={true} />
    
    <section className="container">
        
        <div className="background">
            <h1 className = "header">Sign In</h1>
            <p className="prompt">Email Address</p>
            <input className = "input" type = "text" onChange={(event => {setLoginEmail(event.target.value);
            })}/>

            <p className="prompt">Password</p>
            <input className = "input" type = "password" onChange={(event => {setLoginPassword(event.target.value);
            })}/>

            <div>
                <p></p>
                <button onClick={login} className = "login-button">Login</button>    
            </div>
            <p className="prompt2">Don't have an account?
            <a href="/SignUp">Create Account</a>
            </p>       
         </div>
    </section>
    </div>
    );
}

export default LoginPrompt;

