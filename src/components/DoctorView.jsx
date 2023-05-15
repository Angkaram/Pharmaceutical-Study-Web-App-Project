import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './loginprompt.css';
import "./loginprompt.js";
import './home.css';
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";
import { useNavigate, Link } from "react-router-dom";
import AddPatientButton from './addButton.js';
import DisplayPatientData from './DisplayPatientData';
import './DoctorView.css';
import View from "./States_Views";
import ValidateDomain from "./validation";


function DoctorView() {

  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(location.state);
  const logout = async () => {
    await signOut(auth);
    navigate("/");
  };

  const [nameSearch, setNameSearch] = useState("");
  const [ageSearch, setAgeSearch] = useState("");
  const [insuranceSearch, setInsuranceSearch] = useState("");
  const [ICDSearch, setICDSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  
  if (user?.email == null) {
    
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
    const user= {
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
      
    if (user.role != 'doctor') {
      navigate("/Login");
    }

    })
    return unsubscribe
  };

  const togglePopup = () => {
    setIsOpen(!isOpen);
  }

  const clearSearch = () => {
    setInsuranceSearch("");
    setNameSearch("");
    setICDSearch("");
    setAgeSearch("");
  }

  const DoctorAppointments = () => {
    navigate("/Appointments", { state: { user } });
  };

  const DoctorHomePage = () => {
    navigate("/View", { state: { user } });
  };

  // can type in patient ID and it will display correct patient from Vendia
  const patientId = '0186b496-32f6-9a7f-cdfe-1e37ab416338';
  console.log(user?.email);
  return (
    <div className='managePatient'>
      {/* NTS: REVERT BACK IF FAILS + DoctorView.css */}
      <div className = 'nav-bar'>
        <div className='janeHopkinsTitleText'>Jane Hopkins
          <div className='hospitalTitleText'>Hospital</div>
        </div>
        <div className='displayEmail'>{user?.email}</div>
        <button className='signOutButton' onClick={logout}>
          <div className='signOutIcon'></div>
          <div className='signOutText'>Sign Out</div>
        </button>
      </div>

      <div className='doctorNavButtonLocations'>
        <div className="welcomeBro">
          <button className='welcomeContainer' onClick={() => DoctorHomePage(user)}>Welcome Page</button>
        </div>

        {/* <div className='welcomeBro'>
          <button>Welcome Page</button>
        </div> */}

        <div className='appointmentBro'>
          <button className='welcomeContainer' onClick={() => DoctorAppointments(user)}>Manage Appointments</button>
        </div>

        <div className='addPatientBro'>
          <button className='welcomeContainer' onClick={togglePopup} >Add Patients</button>
        </div>
        
      </div>

      <div className='patientSearchBox'>
        <div className='patientSearchBoxName'>Patient Search</div>

        <div className='patientSearchBars'>

          <div className='patientNameSearch'>
            <div className='patientNameSearchLabel'>Name</div>
            <input className='patientNameSearchBox' type="text" onChange={(event) => { setNameSearch(event.target.value) }} value={nameSearch} />
          </div>

          <div className = 'patientAgeSearch'>
            <div className='patientAgeSearchLabel'>Age</div>
            <input className='patientAgeSearchBox' type="number" onChange={(event) => { setAgeSearch(event.target.value) }} value={ageSearch} />
          </div>

          <div className = 'patientICDSearch'>
            <div className='patientICDSearchLabel'>ICD Healthcode</div>
            <input className='patientICDSearchBox' type="text" onChange={(event) => { setICDSearch(event.target.value) }} value={ICDSearch} />
          </div>

          <div className = 'patientInsuranceSearch'>
            <div className='patientInsuranceSearchLabel'>Insurance Number</div>
            <input className='patientInsuranceSearchBox' type="text" onChange={(event) => { setInsuranceSearch(event.target.value) }} value={insuranceSearch} />
          </div>

        </div>

        <div className='searchUndoLocations'>

          <button onClick={clearSearch} className='searchButton'> Clear Search </button>

        </div>
      </div>

      <div className='patientTableLocation'>
        <DisplayPatientData nameSearch={nameSearch} insuranceSearch={insuranceSearch} ICDSearch={ICDSearch} patientId={patientId} ageSearch={ageSearch}/>
      </div>

      {isOpen && <AddPatientButton handleClose={togglePopup} />}

    </div>
  );
}

export default DoctorView;