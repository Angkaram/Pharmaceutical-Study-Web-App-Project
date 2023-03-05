// This page is for account creation and signing up ALSO VALIDATION
import React, { useState } from "react";
import "./loginprompt.css";
import { useNavigate } from "react-router-dom";

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "./firebase-config";

// Email domains that our system will recognize to give roles to users
const emailDomain = {
    bavaria: "bavaria.org",
    fda: "fda.gov",
    admin: "janehopkins.admin",
    doctor: "janehopkins.org",
};

// This validates the email domain (compare the email domain role to the dropdown role)
function ValidateDomain(email, role) {
    const domain = emailDomain[role];
    const regex = new RegExp(`^[a-z0-9._%+-]+@${domain}$`, "i");
    return regex.test(email);
}

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
    <section className="container">
        <div className="background">
            <h1 className = "header-create">Create an Account</h1>
            <p className="prompt">Add Email Address</p>
            <input className = "input" type = "text" onChange={(event => {setRegisterEmail(event.target.value);
            })}/>

            <p className="prompt">Create Password (Min 6 Characters)</p>
            <input className = "input" type = "password" onChange={(event => {setRegisterPassword(event.target.value);
            })}/>        

            <h1 className = "header-org">Confirm Organization</h1>
            
            <select value={value} onChange={handleChange} className = "drop-down" name = "select-organization">
                <option value = "doctor">Jane Hopkins (Doctor)</option>
                <option value = "admin">Jane Hopkins (Admin)</option>
                <option value = "bavaria">Bavaria</option>
                <option value = "fda">FDA</option>
            </select>

            <div>
                <button button onClick={register} className="login-button">Create Account</button>    
            </div> 

            <div>
                <p className="prompt">Have an account?</p>
                <button button onClick={() => {navigate("/Login");}} className="add-btn">Login Instead</button>    
            </div> 

         </div>
    </section>
    );
}

export default SignUp;

// My cat typed this: =]p0;/543