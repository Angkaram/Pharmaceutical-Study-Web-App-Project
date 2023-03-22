import React, { useState, useEffect } from 'react';
import './loginprompt.css';
import "./loginprompt.js";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";
import { useNavigate } from "react-router-dom";
import ValidateDomain from "./validation";
import AddPatientButton from './addButton.js';
import DisplayPatientData from './DisplayPatientData';

let view;

function View() {
  
  // the email for the user is displayed.
  // changes based on state, role, and view
  const [user, setUser] = useState(null);

  let navigate = useNavigate();
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      const userInfo = {
        email: userAuth?.email,
        role: userAuth?.displayName,
        id: userAuth?.uid
      }
      if (userAuth) {
        console.log(userAuth)
        setUser(userInfo)
      } else {
        setUser(null)
      }

      const logout = async () => {
        await signOut(auth);
        navigate("/");
      };

      // Validates the user
      let isValidated = ValidateDomain(userInfo.email, userInfo.role);

      // Checks their role and redirects them accordingly
      if (isValidated === true) {
        if (userInfo.role === 'doctor') {
          view = <DoctorView user = {user} LogOut = {logout} />;
        } else if (userInfo.role === "fda") {
          view = <FDAView user = {user} LogOut = {logout}/>;
        } else if (userInfo.role === "bavaria") {
          view = <BavariaView user = {user} LogOut = {logout}/>;
        }
    // If everything fails, kicks unauthorized user to the login page
    } else {
      navigate("/Login");
    }

    })

    return unsubscribe
// eslint-disable-next-line
  }, []);

  // styling
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      {view}
    </div>
  );
};

// what is shown on DoctorView
function DoctorView({ user, LogOut }) {
  // can type in patient ID and it will display correct patient from Vendia
  const patientId = '0186b496-32f6-9a7f-cdfe-1e37ab416338';
  return (
    <div className='text'>
      <h1>This is the doctor view.</h1>
      <h4> User logged in: </h4>
      {user?.email}
      
      <AddPatientButton />
 
      <div>
        <h2>Patient Data</h2>
        <DisplayPatientData patientId={patientId}/>
      </div>
      
      <p className='text'>More doctor text goes here</p>
      <button className='back-btn' onClick={LogOut}>Sign Out</button>
    </div>
  );
}

// what is shown on FDAView. Line below h4 displays the user email logged in to FDA view
function FDAView({ user, LogOut }) {
  return (
    <div className='text'>
      <h1>This is the FDA view.</h1>
      <h4> User logged in: </h4>
      {user?.email}
      <p className='text'>More FDA text goes here</p>
      <button className='back-btn' onClick={LogOut}>Sign Out</button>
    </div>
  );
}

// bavaria view (work in progress)
function BavariaView({ user, LogOut }) {
  return (
    <div className='text'>
      <h1>This is the Bavaria view.</h1>
      <h4> User logged in: </h4>
      {user?.email}
      <p className='text'>More FDA text goes here</p>
      <button className='back-btn' onClick={LogOut}>Sign Out</button>
    </div>
  );
}

export default View;

