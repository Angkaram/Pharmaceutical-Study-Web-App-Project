import { useLocation } from 'react-router-dom';
import './loginprompt.css';
import "./loginprompt.js";
import './home.css';
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";
import { useNavigate } from "react-router-dom";
import './DoctorView.css';
import './Notifications.css';

function ManageStudyView() {
  const location = useLocation();
  const { user } = location.state;
  const navigate = useNavigate();
  const logout = async () => {
    await signOut(auth);
    navigate("/");
  };

  const handleNotificationClick = () => {
    const notificationCircle = document.querySelector('.notification-circle');

    notificationCircle.classList.toggle('clicked');
  };

  const handlePopupClick = () => {
    const notificationCircle = document.querySelector('.notification-circle');

    notificationCircle.classList.remove('clicked');
  };

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
      <div class="notification-circle" onClick={handleNotificationClick}>
        <div class="notification-circle-icon"></div>
        <div class="notification-number">1</div>
      </div>
      <div class="notification-popup" onClick={handlePopupClick}>
        <p>The study was approved</p>
      </div>
      
    </div>
  );
}

export default ManageStudyView;