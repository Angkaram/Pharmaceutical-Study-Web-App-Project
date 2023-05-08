import { useLocation } from 'react-router-dom';
import './loginprompt.css';
import "./loginprompt.js";
import './home.css';
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";
import { useNavigate, Link } from "react-router-dom";
import './DoctorView.css';
import './Notifications.css';
import './ManageStudyView.css';
import useJaneHopkins from '../hooks/useJaneHopkins';
import { useEffect, useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useContext } from 'react';
import NotificationContext from './NotificationContext';
import DisplayStudyData from './DisplayStudyData';
import Sidebar from './Sidebar';
import ValidateDomain from "./validation";


function ManageStudyView() {

  const DoctorHomePage = () => {
    navigate("/View", { state: { user } });
  };

  const { entities } = useJaneHopkins();
  const [study, setStudy] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const togglePopup = () => {
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    async function fetchStudy() {
      const studyList = await entities.study.list();
      setStudy(studyList.items);
      setIsLoading(false);
    }
  
    fetchStudy();
  
  }, [entities.study]);
  
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const logout = async () => {
    await signOut(auth);
    navigate("/");
  };

  // for notification system
  const { notifications } = useContext(NotificationContext);
  const [showNotifications, setShowNotifications] = useState(false);

  const [nameSearch, setNameSearch] = useState("");
  const [statusSearch, setStatusSearch] = useState("");
  const [startSearch, setStartSearch] = useState("");

  if (user?.email == null) {
    
    let view;
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
  
    // Validates the user
    let isValidated = ValidateDomain(user.email, user.role);
  
    // Checks their role and redirects them accordingly
    if (isValidated === true) {
      if (user.role === 'doctor') {
        view = <DoctorHomePage user = {user} LogOut = {logout} />;
      }
    // If everything fails, kicks unauthorized user to the login page
    } else {
      navigate("/Login");
    }

  })
  return unsubscribe
  };

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

  
  const studyID = '0187a035-03e5-4828-43fc-269e5c9c0961'

  return (
    <div className='managePatient'> 

<div className='nav-bar'>

    <div className='doctorViewTitle'>
      <div className='janeHopkinsTitleText'>Jane Hopkins
        <div className='hospitalTitleText'>Hospital</div>
      </div>
    </div>
    <div className='displayEmail'>{user?.email}</div>
    <button className='signOutButton' onClick={logout}>
      <div className='signOutIcon'></div>
      <div className='signOutText'>Sign Out</div>
    </button>
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

    <div className='patientTableLocation'>
      <DisplayStudyData nameSearch={nameSearch} statusSearch={statusSearch} startSearch={startSearch} studyID={studyID}/>
    </div>
    
    <div className='doctorNavButtonLocations'>
        <div className='addPatientBro'>
          <button onClick={togglePopup} >Add Study</button>
        </div>
        <div className="welcomeBro">
          <button onClick={() => DoctorHomePage(user)}>Welcome Page</button>
        </div>
    </div>  

    {isOpen && <AddStudyButton handleClose={togglePopup}/>}
    
    </div>
  );
}

//new function for the AddStudyButton
function AddStudyButton(togglePopup) {
  console.log('AddStudyButton was successfully clicked');
  const {entities} = useJaneHopkins();
  const [bavariaAgreed, setBavariaAgreed] = useState(false);
  const [fdaAgreed, setFdaAgreed] = useState(false);

  const addStudy = async() => {
    console.log('addStudy called with study data');

    const isBavariaAgreed = document.getElementById("isBavariaAgreed").checked;
    const isFdaAgreed = document.getElementById("isFdaAgreed").checked;

    const addStudyResponse = await entities.study.add({
      name: document.getElementById("name").value,
      status: document.getElementById("status").value,
      start: document.getElementById("start").value,
      end: document.getElementById("end").value,
      maxPatients: Number(document.getElementById("maxPatients").value),
      isBavariaAgreed: isBavariaAgreed,
      isFdaAgreed: isFdaAgreed
    });
    
    console.log(isBavariaAgreed);
    console.log(isFdaAgreed);
    console.log(addStudyResponse);

    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: {
        id: Date.now(),
        message: 'New Study Created',
      },
    });
  }

  // for the notification system
  const { dispatch } = useContext(NotificationContext);

  // Initial state of the dropdown menu
  const initialState = () => {
    const value = "Approved";
    return value;
  }

  // Change value depending on dropdown menu
  const [value, setValue] = useState(initialState);

  const handleChange = (e) => {
    setValue(e.target.value);
  }

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  return (
    <div className="largeView">
    <div className="popup-content">
      
      <div className="popup-top">
        <h3>Add New Study</h3>
        <button id="close" onClick={togglePopup.handleClose}>X</button>
        
      </div>
      <h3> Study Name: <input type="text" id="name"></input></h3> 
      
      <div className="popup-middle">
        <div className="popup-section">
          <h3>General Information</h3>
          <b>Study Status: </b>
          <select value={value} onChange={handleChange} className = "drop-down" name = "select-organization" id="status">
                <option value = "Approved">Approved</option>
                <option value = "Pending">Pending</option>
                <option value = "Cancelled">Cancelled</option>
                <option value = "Completed">Completed</option>
            </select>
          <p><b>Study Start:</b>
            <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            id="start"
            dateFormat="MMMM d, yyyy"
            />
          </p>
          <p><b>Study End: </b>
            <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            id="end"
            dateFormat="MMMM d, yyyy"
            />
          </p>
          <p className='checkbox'><strong>Agreed By Bavaria?
            <input type="checkbox" checked = {bavariaAgreed} onChange={()=> setBavariaAgreed(!bavariaAgreed)} id = "isBavariaAgreed"></input>
          </strong></p>
          <p className='checkbox'><strong>Agreed By FDA?
            <input type="checkbox" checked = {fdaAgreed} onChange={()=> setFdaAgreed(!fdaAgreed)} id = "isFdaAgreed"></input>
          </strong></p>
          <p><b>Max Participants: </b><input type="number" id = "maxPatients"></input></p>

        </div>
      </div>
      <button className='add-patient' onClick={() => {
    addStudy();
    const messageElem = document.createElement('div');
    messageElem.innerText = 'New Study Added Successfully';
    messageElem.classList.add('message'); // Add CSS class to the message element
    document.body.appendChild(messageElem);
    setTimeout(() => {
        messageElem.remove();
    }, 1000); // Delay message display for 1 second (1000 milliseconds)
    }}>Add/Create Study</button>

    </div>
  </div>
  )

}

export default ManageStudyView;