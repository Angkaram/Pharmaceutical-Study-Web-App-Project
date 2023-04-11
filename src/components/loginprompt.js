// General login page, also redirects users to create an account if necessary
import React, { useState } from "react";
import "./loginprompt.css";
import { useNavigate } from "react-router-dom";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase-config";
import homeIcon from "./Icons/homeIcon.png";


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
    <body>
    <nav className="logInNavbar">
        <h1>MD</h1>
        <h4>MS</h4>
        <h2>Medical Data</h2>
        <h3>Management System</h3>
        <div className="links">
            <a href="/" style={{
                        color: "#0E619C",
                        backgroundColor: '#fff',
                        transition: 'all 0.2s',
                        textDecoration: 'none',
                        padding: '5px 10px',
                        borderRadius: '36px',
                        border: '1px solid #0E619C'
                    }}
                    onMouseOver={e => {
                        e.target.style.backgroundColor = '#9ea5aa';
                    }}
                    onMouseOut={e => {
                        e.target.style.color = '#0E619C';
                        e.target.style.backgroundColor = '#fff';
                    }}
                    > <img src={homeIcon}/> Home </a>
        </div>
    </nav>        
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
    </body>
    );
}

export default LoginPrompt;

