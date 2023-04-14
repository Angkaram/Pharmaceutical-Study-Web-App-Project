import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './loginprompt.css';
import "./loginprompt.js";
import './home.css';
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";
import { useNavigate, Link } from "react-router-dom";
import DisplayPatientData from './DisplayPatientData';
import './DoctorView.css';
import ContractsButton from './ContractsButton';

function FDAView() {

  const location = useLocation();
  const { user } = location.state;  //LogOut not working yet
  const navigate = useNavigate();
  const logout = async () => {
    await signOut(auth);
    navigate("/");
  };

  const patientId = '0186b496-32f6-9a7f-cdfe-1e37ab416338';
  const [searchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const togglePopup = () => {
    setIsOpen(!isOpen);
  }
  return (
    <div className='managePatient'> 

      <div className='doctorNavbar'style={{backgroundColor: '#08d3b4'}}>

        <div className='doctorViewTitle'>
          <div className='janeHopkinsTitleText' style={{left: '138px', top: '14px', color: 'white', fontFamily: 'Georgia'}}>FDA</div>
          <div className='hospitalTitleText' style={{fontSize: 25, textAlign: 'center', left: '0', top: '18px'}}>U.S. Food and Drug Administration</div>
        </div>
        <div className='displayEmail' style={{color: 'black'}}>{user?.email}</div>
        <button className='signOutButton' style={{border: '#069882' }} onClick={logout}>
          <div className='signOutIcon'></div>
          <div className='signOutText'style={{color: '#069882' }}>Sign Out</div>
        </button>
      </div>

      <div className='doctorNavButtonLocations'>
        <div>
        <Link to="/View">
          <button className='welcomeContainer' style={{borderColor: '#08d3b4'}}>
            <div className='welcomeText' style={{color: 'black'}}>Welcome Page</div>
          </button>
        </Link>
        </div>

        <button onClick={togglePopup} className='addPatientContainer' style={{top: '0px', left: '350px', borderColor: '#08d3b4'}}>
          <div className='addPatientText' style={{left: '47px', color: 'black'}}>Manage Contracts</div>
        </button>
      </div>

      <div className='patientTableLocation' style={{top: '300px'}}>
        <DisplayPatientData searchTerm={searchTerm} patientId={patientId} isFDAView={true} />
      </div>
      {isOpen && <ContractsButton handleClose={togglePopup}/>}
    </div>
  );
}

export default FDAView;