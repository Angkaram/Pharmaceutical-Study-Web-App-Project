import React, { useState } from 'react';
import './App.css';

function App() {
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
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Welcome to our website</h1>
      <p>Please select your user type:</p>
      <div style={{ display: 'flex', justifyContent: 'space-evenly', marginTop: '1em' }}>
        <button onClick={() => handleButtonClick('Patient')}>Patient</button>
        <button onClick={() => handleButtonClick('Doctor')}>Doctor</button>
        <button onClick={() => handleButtonClick('FDA')}>FDA</button>
      </div>
    </div>
  );
}

// what is shown on PatientView
function PatientView({ handleBackButtonClick }) {
  return (
    <div>
      <h1>This is the patient view.</h1>
      <p>More patient text goes here</p>
      <button onClick={handleBackButtonClick}>Back</button>
    </div>
  );
}

// what is shown on DoctorView
function DoctorView({ handleBackButtonClick }) {
  return (
    <div>
      <h1>This is the doctor view.</h1>
      <p>More doctor text goes here</p>
      <button onClick={handleBackButtonClick}>Back</button>
    </div>
  );
}

// what is shown on FDAView
function FDAView({ handleBackButtonClick }) {
  return (
    <div>
      <h1>This is the TESTING view.</h1>
      <p>More FDA text goes here</p>
      <button onClick={handleBackButtonClick}>Back</button>
    </div>
  );
}

export default App;

