import React, { useState, useEffect } from 'react';
import './loginprompt.css';
import "./loginprompt.js";
import './home.css';
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";
import { useNavigate } from "react-router-dom";
import ValidateDomain from "./validation";
import {addPatient} from './addButton.js';
import DisplayPatientData from './DisplayPatientData';
import './DoctorView.css';

function View() {
  
  /* the email for the user is displayed and changes based on state, role, and view*/
  const [user, setUser] = useState(null)
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      const user = {
        email: userAuth?.email,
        role: userAuth?.displayName,
        id: userAuth?.uid
      }
      if (userAuth) {
        console.log(userAuth)
        setUser(user)
      } else {
        setUser(null)
      }
    })
    return unsubscribe
  }, []);

  // eslint-disable-next-line
  const [activeButton, setActiveButton] = useState(null); // buttons to change states
  const [currentView, setCurrentView] = useState('Welcome'); // so that we can go "back" to different views

  const handleButtonClick = (buttonName) => { // when we click on a button, it sets it to activeButton and
    let roleString = buttonName.toLowerCase();
    if (user.role === roleString && ValidateDomain(user.email, roleString) === true) {
      setActiveButton(buttonName);	      // bases the view based on the active button clicked
      setCurrentView(buttonName + 'View');
    } else {
      alert("You do not have access to this view"); // alerts you if you try clicking on wrong view
    }
  };

  const handleBackButtonClick = () => {
    setActiveButton(null); // null takes us back to default state of Home view, so pressing back takes us back
    setCurrentView('Welcome'); // view corresponds to back button click
  };

  let view;
  // all the different options and views based on button clicks
  if (currentView === 'Welcome') {
    view = <WelcomeView handleButtonClick={handleButtonClick} />;
  } else if (currentView === 'PatientView') {
    view = <PatientView user = {user} handleBackButtonClick={handleBackButtonClick} />;
  } else if (currentView === 'DoctorView') {
    view = <DoctorView user = {user} handleBackButtonClick={handleBackButtonClick} />;
  } else if (currentView === 'FDAView') {
    view = <FDAView user = {user} handleBackButtonClick={handleBackButtonClick} />;
  }

  // styling
  return (
    <div>
      {view}
    </div>
  );
}

// what is shown on WelcomeView
function WelcomeView({ handleButtonClick }) {
  let navigate = useNavigate();

  const logout = async () => {
      await signOut(auth); 
      navigate("/");
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1 className='text'>Welcome to our website</h1>
      <p className='text'>Please select your user type:</p>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '.5em' }}>
        <button className='user-type' onClick={() => handleButtonClick('Patient')}>Patient</button>
        <button className='user-type' onClick={() => handleButtonClick('Doctor')}>Doctor</button>
        <button className='user-type' onClick={() => handleButtonClick('FDA')}>FDA</button>
      </div>
      <div>
        <button onClick = {logout} className='back-btn'>Log Out</button>
      </div>
    </div>
  );
}

// what is shown on PatientView
function PatientView({ user, handleBackButtonClick }) {
  return (
    <div className='text'>
      <h1>This is the patient view.</h1>
      <h4> User logged in: </h4>
      {user?.email}
      <p className='text'>More patient text goes here</p>
      <button className='back-btn' onClick={handleBackButtonClick}>Back</button>
    </div>
  );
}

// what is shown on DoctorView
function DoctorView({ user, handleBackButtonClick, addPatient }) {
  // can type in patient ID and it will display correct patient from Vendia
  const patientId = '01865363-2bec-5ef5-cbd3-bb917b33c37b';
  return (
    <div className='managePatient'> 

      <div className='doctorNavbar'>

        <div className='doctorViewTitle'>
          <div className='janeHopkinsTitleText'>Jane Hopkins</div>
          <div className='hospitalTitleText'>Hospital</div>
        </div>
        <div className='displayEmail'>{user?.email}</div>
        <button className='signOutButton' onClick={handleBackButtonClick}>
          <div className='signOutIcon'></div>
          <div className='signOutText'>Sign Out</div>
        </button>
      </div>
      
      <div className='doctorNavButtonLocations'>
        <div className='welcomeContainer'>
          <div className='welcomeText'>Welcome Page</div>
        </div>
        <div className='appointmentContainer'>
          <div className='appointmentText'>Manage Appointments</div>
        </div>
        <button className='addPatientContainer' onClick={addPatient}>
          <div className='addPatientText'>Add Patients</div>
        </button>
      </div>

      <div className='patientSearchBox'>
        <div className='patientSearchBoxName'>Patient Search</div>
        <div className='searchUndoLocations'>
          <div className='undoButton'>
            <div className='undoButtonText'>Undo</div>
          </div>
          <div className='searchButton'>
            <div className='searchButtonText'>Search</div>
          </div>
        </div>
        <div className='patientNameSearch'>
          <div className='patientNameSearchBox'>
            <div className='patientNameSearchLabel'>Name</div>
          </div>
        </div>
        <div className='patientAgeSearch'>
          <div className='patientAgeSearchBox'>
            <div className='patientAgeSearchLabel'>Age</div>
          </div>
        </div>
        <div className='patientICDSearch'>
          <div className='patientICDSearchBox'>
            <div className='patientICDSearchLabel'>ICD Healthcode</div>
          </div>
        </div>
        <div className='patientInsuranceSearch'>
          <div className='patientInsuranceSearchBox'>
            <div className='patientInsuranceSearchLabel'>Insurance Number</div>
          </div>
        </div>
      </div>

      <div className='patientTableLocation'>
        <DisplayPatientData patientId={patientId}/>
      </div>

    </div>
  );
}

// what is shown on FDAView. Line below h4 displays the user email logged in to FDA view
function FDAView({ user, handleBackButtonClick }) {
  return (
    <div className='text'>
      <h1>This is the FDA view.</h1>
      <h4> User logged in: </h4>
      {user?.email}
      <p className='text'>More FDA text goes here</p>
      <button className='back-btn' onClick={handleBackButtonClick}>Back</button>
    </div>
  );
}

export default View;

