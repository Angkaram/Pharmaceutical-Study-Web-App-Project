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
import ShipmentsButton from './ShipmentsButton';

function BavariaView() {

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

      <div className='doctorNavbar'style={{backgroundColor: '#f46f74'}}>

        <div className='doctorViewTitle'>
          <div className='janeHopkinsTitleText' style={{left: '78px', top: '8px', color: 'white', fontFamily: 'Georgia'}}>Bavaria</div>
          <div className='hospitalTitleText' style={{textAlign: 'center', left: '0', top: '18px'}}>Pharmaceuticals</div>
        </div>
        <div className='displayEmail'>{user?.email}</div>
        <button className='signOutButton' style={{border: '#e7121a' }} onClick={logout}>
          <div className='signOutIcon'></div>
          <div className='signOutText'style={{color: '#e7121a' }}>Sign Out</div>
        </button>
      </div>

      <div className='doctorNavButtonLocations'>
        <div>
          <Link to="/View">
            <button className='welcomeContainer' style={{borderColor: '#f46f74'}}>
              <div className='welcomeText' style={{color: 'black'}}>Welcome Page</div>
            </button>
          </Link>
        </div>

        <button onClick={togglePopup} className='addPatientContainer' style={{top: '0px', left: '350px', borderColor: '#f46f74'}}>
          <div className='addPatientText' style={{left: '43px', color: 'black'}}>Manage Shipments</div>
        </button>
      </div>

      <div className='patientTableLocation' style={{top: '300px'}}>
        <DisplayPatientData searchTerm={searchTerm} patientId={patientId} isBavariaView={true} />
      </div>
      {isOpen && <ShipmentsButton handleClose={togglePopup}/>}
    </div>
  );
}

export default BavariaView;