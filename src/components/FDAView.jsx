import React, { useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import './loginprompt.css';
import "./loginprompt.js";
import './home.css';
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";
import { useNavigate, Link } from "react-router-dom";
//import DisplayPatientData from './DisplayPatientData';
import DisplayStudyData from './AdminDisplayStudyData';
import './DoctorView.css';
import ContractsButton from './ContractsButton';
import Sidebar from './Sidebar';
import NotificationContext from './NotificationContext';

function FDAView() {

// for notification system
const { notifications } = useContext(NotificationContext);
const [showNotifications, setShowNotifications] = useState(false);

const handleNotificationClick = () => {
  setShowNotifications(!showNotifications);
  const notificationCircle = document.querySelector('.notification-circle');
  if (showNotifications) {
    notificationCircle.classList.remove('clicked');
  } else {
    notificationCircle.classList.add('clicked');
  }
};

// end of notification stuff

const handlePopupClick = () => {
  setShowNotifications(false);
};

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

  const DoctorHomePage = () => {
    navigate("/View", { state: { user } });
  };

  return (
    <div className='fdaview'> 

        <div className = 'nav-bar' style={{backgroundColor: '#08d3b4'}}>
            <div className='janeHopkinsTitleText'>FDA
              <div className='hospitalTitleText' style={{fontSize: 25, textAlign: 'center'}}>U.S. Food and Drug Administration</div>
            </div>
            <div className='displayEmail'>{user?.email}</div>
            <button className='signOutButton' onClick={logout}>
              <div className='signOutIcon'></div>
              <div className='signOutText' style={{color: '#069882'}}>Sign Out</div>
            </button>
          
        </div>

      <div className='doctorNavButtonLocations'>
          <div className="welcomeBro" style={{borderColor: '#08d3b4'}}>
            <button onClick={() => DoctorHomePage(user)} style={{color: 'black'}}>Welcome Page</button>
          </div>

          <div className='addPatientBro' style={{borderColor: '#08d3b4'}}>
            <button onClick={togglePopup} style={{color: 'black'}}>Manage Contracts</button>
          </div>
      </div>

      <Sidebar></Sidebar>

      <div>
          <button className='notification-circle' onClick={handleNotificationClick}>
            <div class="notification-circle-icon"></div>
            <div class="notification-number">{notifications.length}</div>
          </button>
            
          {showNotifications && (
            <div className="notification-popup" onClick={handlePopupClick}>
              {notifications.map((notification) => (
                <div key={notification.id} className="notification-item">
                  {notification.message}
                </div>
              ))}
            </div>
          )}
        </div>

      <div className='patientTableLocation' style={{top: '300px'}}>
        <DisplayStudyData nameSearch={""} statusSearch={""} startSearch={""} isFDAView={true}/>
      </div>
      {isOpen && <ContractsButton handleClose={togglePopup}/>}
    </div>
  );
}

export default FDAView;