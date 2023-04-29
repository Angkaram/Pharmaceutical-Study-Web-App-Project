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
import { useContext } from 'react';
import NotificationContext from './NotificationContext';

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

  const handlePopupClick = () => {
    setShowNotifications(false);
  };

  return (
    <div className='bavariabody'>

          <div className = 'nav-bar' style={{backgroundColor: '#f46f74'}}>
            <div className='janeHopkinsTitleText'>Bavaria
              <div className='hospitalTitleText'>Pharmaceuticals</div>
            </div>
            <div className='displayEmail'>{user?.email}</div>
            <button className='signOutButton' onClick={logout}>
              <div className='signOutIcon'></div>
              <div className='signOutText' style={{color: '#e7121a' }}>Sign Out</div>
            </button>
          
        </div>

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