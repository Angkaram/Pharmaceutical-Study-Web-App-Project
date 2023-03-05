import React, { useState, useEffect } from 'react';
import './loginprompt.css';
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";
import { useNavigate } from "react-router-dom";
import ValidateDomain from "./validation";

function View() {
  // ------------ TEMPORARY STUFF ------------
  /* Should be resolved with Issue #5, we really just need the email for this part
     even though the display name would also be nice so they can be compared */
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
  // --------- END OF TEMPORARY STUFF ---------

  // eslint-disable-next-line
  const [activeButton, setActiveButton] = useState(null); // buttons to change states
  const [currentView, setCurrentView] = useState('Welcome'); // so that we can go "back" to different views

  const handleButtonClick = (buttonName) => { // when we click on a button, it sets it to activeButton and
    let roleString = buttonName.toLowerCase();
    if (user.role === roleString && ValidateDomain(user.email, roleString) === true) {
      setActiveButton(buttonName);	      // bases the view based on the active button clicked
      setCurrentView(buttonName + 'View');
    } else {
      alert("You do not have access to this view");
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
      <div style={{ display: 'flex', justifyContent: 'space-evenly', marginTop: '1em' }}>
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

