import useJaneHopkins from "../hooks/useJaneHopkins";
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './loginprompt.css';
import "./loginprompt.js";
import './home.css';
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";
import DisplayDrugsData from "./DisplayDrugsData";
import { useNavigate } from "react-router-dom";
import NotificationContext from './NotificationContext';
import { useContext } from 'react';
import ShipmentsButton from "./ShipmentsButton";

function ManageShipmentsView () {

    const drugID = `0187d449-b778-acbd-27c6-94b2a9be0287`

    const location = useLocation();
    const { user } = location.state;  //LogOut not working yet
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const logout = async () => {
        await signOut(auth);
        navigate("/");
    };
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

  // end of notification stuff

    const handlePopupClick = () => {
        setShowNotifications(false);
      };
    
      const DoctorHomePage = () => {
        navigate("/View", { state: { user } });
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
                <div className="welcomeBro" style={{borderColor: '#f46f74'}}>
                    <button onClick={() => DoctorHomePage(user)} style={{color: 'black'}}>Welcome Page</button>
                </div>

                <div className='addPatientBro' style={{borderColor: '#f46f74'}}>
                    <button onClick={togglePopup} style={{color: 'black'}}>Add Shipments</button>
                </div>
            </div>

            <div className='patientTableLocation'>
                <DisplayDrugsData drugID={drugID} isBavariaView={true}/>
            </div>
            
            {isOpen && <ShipmentsButton handleClose={togglePopup}/>}

        </div>
    )

};
export default ManageShipmentsView;
