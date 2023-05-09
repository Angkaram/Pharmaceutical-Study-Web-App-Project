// This page is for account creation and signing up ALSO VALIDATION
import React, { useState } from "react";
import "./loginprompt.css";
import { useNavigate } from "react-router-dom";

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "./firebase-config";
import ValidateDomain from "./validation";
import homeIcon from "./Icons/homeIcon.png";

import './home.css';
import './DoctorView.css';

// Account Creation
function SignUp() {
    let navigate = useNavigate();
    
    // Initial state of the dropdown menu
    const initialState = () => {
        const value = "doctor";
        return value;
    }

    // Change value depending on dropdown menu
    const [value, setValue] = useState(initialState);

    const handleChange = (e) => {
        setValue(e.target.value);
    }

    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");

    // Register the user
    const register = async () => {
        // Validate the roles between email and dropdown, if they do NOT match an alert pops up
        let role = value;
        if (ValidateDomain(registerEmail, role) === false) {
            alert("Invalid email address for role");
            return;
        }
        try {
            // Make the user
            const userCred = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
            console.log(userCred);
            navigate("/Login");
            const user = userCred.user;
            await updateProfile(user, {
                displayName: role
            });
            console.log(user);

        } catch (error) {
            console.log(error.message);
        }
        
    };

    return (
    <div className="loginPage">
    <nav className="logInNavbar">
        <div className="medTitle">
            <div className="abbrvMD">MDMS</div>
                Medical Data
            <div className="manageTitle">Management System</div>
        </div>
            
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
            <h1 className = "header-create">Create Account</h1>
            <p className="prompt">Add Email Address</p>
            <input className = "input" type = "text" onChange={(event => {setRegisterEmail(event.target.value);
            })}/>

            <p className="prompt">Create Password</p>
            <input className = "input" type = "password" onChange={(event => {setRegisterPassword(event.target.value);
            })}/>        

            <h2 className = "header-org">Confirm Organization</h2>
            
            <select value={value} onChange={handleChange} className = "drop-down" name = "select-organization">
                <option value = "doctor">Jane Hopkins (Doctor)</option>
                <option value = "admin">Jane Hopkins (Admin)</option>
                <option value = "bavaria">Bavaria</option>
                <option value = "fda">FDA</option>
            </select>

            <div>
                <button onClick={register} className="login-button">Create Account</button>    
            </div> 

            <div>
                <p className="prompt3">Have an account?
                <a href="/Login">Login Instead</a>
                </p>
            </div> 

         </div>
    </section>
    </div>

    );
}

export default SignUp;

// My cat typed this: =]p0;/543