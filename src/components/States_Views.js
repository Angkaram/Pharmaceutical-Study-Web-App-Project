import React, { useState } from 'react';
import './loginprompt.css';
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";
import { useNavigate } from "react-router-dom";

function View() {
  // eslint-disable-next-line
  const [activeButton, setActiveButton] = useState(null); // buttons to change states
  const [currentView, setCurrentView] = useState('Welcome'); // so that we can go "back" to different views

  const handleButtonClick = (buttonName) => { // when we click on a button, it sets it to activeButton and
    setActiveButton(buttonName);	      // bases the view based on the active button clicked
    setCurrentView(buttonName + 'View');
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
    view = <PatientView handleBackButtonClick={handleBackButtonClick} />;
  } else if (currentView === 'DoctorView') {
    view = <DoctorView handleBackButtonClick={handleBackButtonClick} />;
  } else if (currentView === 'FDAView') {
    view = <FDAView handleBackButtonClick={handleBackButtonClick} />;
  }

  // styling
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
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
function PatientView({ handleBackButtonClick }) {
  return (
    <div>
      <h1 className='text'>This is the patient view.</h1>
      <p className='text'>More patient text goes here</p>
      <button className='back-btn' onClick={handleBackButtonClick}>Back</button>
    </div>
  );
}

// what is shown on DoctorView
function DoctorView({ handleBackButtonClick }) {
  return (
    <div>
      <h1 className='text'>This is the doctor view.</h1>
      <p className='text'>More doctor text goes here</p>
      <button className='back-btn' onClick={handleBackButtonClick}>Back</button>
    </div>
  );
}

// what is shown on FDAView
function FDAView({ handleBackButtonClick }) {
  return (
    <div>
      <h1 className='text'>This is the TESTING view.</h1>
      <p className='text'>More FDA text goes here</p>
      <button className='back-btn' onClick={handleBackButtonClick}>Back</button>
    </div>
  );
}

export default View;

