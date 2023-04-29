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
import { css } from "@emotion/react";
import { ClipLoader } from "react-spinners"; // need to implement again in DisplayStudyData
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useContext } from 'react';
import NotificationContext from './NotificationContext';

function ManageStudyView() {

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
  const { user } = location.state;
  const navigate = useNavigate();
  const logout = async () => {
    await signOut(auth);
    navigate("/");
  };

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

  const [nameSearch, setNameSearch] = useState("");
  const [statusSearch, setStatusSearch] = useState("");
  const [startSearch, setStartSearch] = useState("");
  const studyID = '0187a035-03e5-4828-43fc-269e5c9c0961'

  return (
    <div className='managePatient'> 

<div className='doctorNavbar'>

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

    <div className='patientTableLocation' style={{top: 320}}>
      <DisplayStudyData nameSearch={nameSearch} statusSearch={statusSearch} startSearch={startSearch} studyID={studyID}/>
    </div>

    <div className='doctorNavButtonLocations'>
    <div>
      <button onClick={togglePopup} className='addPatientContainer' style={{left: 500}}>
        <div className='addPatientText'>Add Study</div>
      </button>
    </div>
    <div>
      <Link to="/View">
        <button className='welcomeContainer' style={{left: 200}}>
          <div className='welcomeText'>Welcome Page</div>
        </button>
      </Link>
    </div>
    </div>

    {isOpen && <AddStudyButton handleClose={togglePopup}/>}
            
    </div>
  );
}

export default ManageStudyView;

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

// new function to display Study data:
function DisplayStudyData({nameSearch, statusSearch, startSearch, isFDAView, isBavariaView}) {

  const { entities } = useJaneHopkins();
  const [study, setStudy] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStudy, setSelectedStudy] = useState(null);
  const [approvedCount, setApprovedCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [cancelledCount, setCancelledCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);

  useEffect(() => {
    async function fetchStudy() {
      const studyList = await entities.study.list();
      setStudy(studyList.items);
      setIsLoading(false);
    }

    fetchStudy();
  }, [entities.study]);

  // Count the number of studies with a special status
  useEffect(() => {
    let myApprovedCount = 0;
    let myPendingCount = 0;
    let myCancelledCount = 0;
    let myCompletedCount = 0;
    for (const s of study) {
      if (s.status === "Approved") {
        myApprovedCount++;
      }
      else if (s.status === "Pending") {
        myPendingCount++;
      }
      else if (s.status === "Cancelled") {
        myCancelledCount++;
      }
      else {
        myCompletedCount++;
      }
    }
    setApprovedCount(myApprovedCount);
    setPendingCount(myPendingCount);
    setCancelledCount(myCancelledCount);
    setCompletedCount(myCompletedCount);
  }, [study]);

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  const handleStudyClick = (study) => {
    setSelectedStudy(study);
  }

  return (
    <div>
      <ClipLoader color={"blue"} loading={isLoading} css={override} size={40} />
      {!isLoading && (
        <table className="patientTable">
          <thead>
          <tr>
              {isFDAView ? (
                <th style={{backgroundColor: '#08d3b4'}}>Insurance Number</th>
              ) : isBavariaView ? (
                <th style={{backgroundColor: '#f46f74'}}>Insurance Number</th>
              ) : (
                <>
                  <th>Study Name</th>
                  <th>Study Status</th>
                  <th>Study Start</th>
                  <th>Study End</th>
                  <th>Agreed by Bavaria</th>
                  <th>Agreed by FDA</th>
                  <th>Max Participants</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            
          {study.filter((study)=> {
            if (isFDAView || isBavariaView) {
              return study;
            }/* NEEDS some tweaking to get working
            else if (study.name.toLowerCase().includes(nameSearch.toLowerCase()) && study.status.includes(statusSearch) 
            && study.startDate.includes(startSearch)) { 
              return study;
            } */
            else if (nameSearch === "" && statusSearch === "" && startSearch === "") {
              return study;
            }
          }).map((study) => {
            return (

              <tr key={study.id}>
                {isFDAView || isBavariaView ? (
                      <td>{study.name}</td>
                    ) : (
                      <>
                        <td onClick={() => handleStudyClick(study)}>
                          {study.name}
                        </td>
                        <td>{study.status}</td>
                        <td>{study.start}</td>
                        <td>{study.end}</td>
                        <td>{study.isBavariaAgreed ? 'Yes' : 'No'}</td>
                        <td>{study.isFdaAgreed ? 'Yes' : 'No'}</td>
                        <td>{study.maxPatients}</td>
                      </>
                    )}
                  </tr>
                );
              })}

          </tbody>
        </table>
      )}       
      <div className="sidebar">
      <div className="category approved">
        <i className="fas fa-circle"></i>
        <span>-Approved Studies:</span>
        <span className="count">{approvedCount}</span>
      </div>
      <div className="category pending">
        <i className="fas fa-circle"></i>
        <span>-Pending Studies:</span>
        <span className="count">{pendingCount}</span>
      </div>
      <div className="category cancelled">
        <i className="fas fa-circle"></i>
        <span>-Cancelled Studies:</span>
        <span className="count">{cancelledCount}</span>
      </div>
      <div className="category completed">
        <i className="fas fa-circle"></i>
        <span>-Completed Studies:</span>
        <span className="count">{completedCount}</span>
      </div>
    </div>   
        </div>
    
    )
};