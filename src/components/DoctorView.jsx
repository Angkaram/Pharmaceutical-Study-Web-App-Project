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

function DoctorView() { 
  
  const location = useLocation();
  const { user } = location.state;  //LogOut not working yet
  const navigate = useNavigate();
  const logout = async () => {
    await signOut(auth);
    navigate("/");
  };
  
  const [nameSearch, setNameSearch] = useState("");
  const [insuranceSearch, setInsuranceSearch] = useState("");
  const [ICDSearch, setICDSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const togglePopup = () => {
    setIsOpen(!isOpen);
  }

  const clearSearch = () => {
    setInsuranceSearch("");
    setNameSearch("");
    setICDSearch("");
  }

  // can type in patient ID and it will display correct patient from Vendia
  const patientId = '0186b496-32f6-9a7f-cdfe-1e37ab416338';
  console.log(user?.email);
  return (
    <div className='managePatient'> 

    <div className='doctorNavbar'>

      <div className='doctorViewTitle'>
        <div className='janeHopkinsTitleText'>Jane Hopkins</div>
        <div className='hospitalTitleText'>Hospital</div>
      </div>
      <div className='displayEmail'>{user?.email}</div>
      <button className='signOutButton' onClick={logout}>
        <div className='signOutIcon'></div>
        <div className='signOutText'>Sign Out</div>
      </button>
    </div>
    
    <div className='doctorNavButtonLocations'>
      <div>
      <Link to="/View">
        <button className='welcomeContainer'>
          <div className='welcomeText'>Welcome Page</div>
        </button>
      </Link>
      </div>
      <Link to="/Appointments">
      <div className='appointmentContainer'>
        <div className='appointmentText'>Manage Appointments</div>
      </div>
      </Link>
      <div>
        <button onClick={togglePopup} className='addPatientContainer'>
          <div className='addPatientText'>Add Patients</div>
        </button>
      </div>
    </div>

    <div className='patientSearchBox'>
      <div className='patientSearchBoxName'>Patient Search</div>
      <div className='searchUndoLocations'>

      <button onClick = {clearSearch} className='searchButton'> Clear Search </button>

      </div>
      <div className='patientNameSearch'>      
          <input className='patientNameSearchBox' type="text" onChange = {(event) => {setNameSearch(event.target.value)}} value={nameSearch}/>
          <div className='patientNameSearchLabel'>Name</div>
      </div>
      <div className='patientAgeSearch'>
          <input className='patientAgeSearchBox' type="number"/>
          <div className='patientAgeSearchLabel'>Age</div>
      </div>
      <div className='patientICDSearch'>
        <input className='patientICDSearchBox' type="text" onChange = {(event) => {setICDSearch(event.target.value)}} value={ICDSearch}/>
        <div className='patientICDSearchLabel'>ICD Healthcode</div>
      </div>
      <div className='patientInsuranceSearch' >
          <input className='patientInsuranceSearchBox' type="text" onChange = {(event) => {setInsuranceSearch(event.target.value)}} value={insuranceSearch}/>
          <div className='patientInsuranceSearchLabel'>Insurance Number</div>
      </div>
    </div>

    <div className='patientTableLocation'>
      <DisplayPatientData nameSearch={nameSearch} insuranceSearch={insuranceSearch} ICDSearch={ICDSearch} patientId={patientId}/>
    </div>

    {isOpen && <AddPatientButton handleClose={togglePopup}/>}

  </div>
  );
}

export default DoctorView;