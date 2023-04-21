import { useLocation } from 'react-router-dom';
import './loginprompt.css';
import "./loginprompt.js";
import './home.css';
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";
import { useNavigate } from "react-router-dom";
import './DoctorView.css';
import './Notifications.css';
import './ManageStudyView.css';
import useJaneHopkins from '../hooks/useJaneHopkins';
import { useEffect, useState } from 'react';
import { css } from "@emotion/react";
import { ClipLoader } from "react-spinners"; // need to implement again in DisplayStudyData
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from 'react-toastify';

function ManageStudyView() {

  /* EDIT BELOW TO MATCH STUDY LOGIC, NOT PATIENT LOGIC */
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
  
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  //const [studyName, setStudySearch] = useState("");

  //////////END OF PART TO BE EDITED////////
  
  
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

  const [nameSearch, setNameSearch] = useState("");
  const [statusSearch, setStatusSearch] = useState("");
  const [startSearch, setStartSearch] = useState("");
  const studyID = '0187a035-03e5-4828-43fc-269e5c9c0961'

  const handleButtonClick = () => {
    toast.success('Notification message');
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
        <button onClick={handleButtonClick}>Show Notification</button>
      </div>

    <div className="sidebar">
      <div className="category active">
        <i className="fas fa-circle"></i>
        <span>Active Studies</span>
        <span className="count">5</span>
      </div>
      <div className="category pending">
        <i className="fas fa-circle"></i>
        <span>Pending Studies</span>
        <span className="count">3</span>
      </div>
      <div className="category cancelled">
        <i className="fas fa-circle"></i>
        <span>Cancelled Studies</span>
        <span className="count">1</span>
      </div>
      <div className="category completed">
        <i className="fas fa-circle"></i>
        <span>Completed Studies</span>
        <span className="count">10</span>
      </div>
    </div>

    <div className='patientTableLocation'>
      <DisplayStudyData nameSearch={nameSearch} statusSearch={statusSearch} startSearch={startSearch} studyID={studyID}/>
    </div>

    <div>
      <button onClick={togglePopup} className='addPatientContainer' style={{top: 200, left: 1000}}>
        <div className='addPatientText'>Add Study</div>
      </button>
    </div>

    {isOpen && <AddStudyButton handleClose={togglePopup}/>}
            
    </div>
  );
}

export default ManageStudyView;

//new function for the AddStudyButton
function AddStudyButton(togglePopup) {
  const {entities} = useJaneHopkins();
  const [bavariaAgreed, setBavariaAgreed] = useState(false);
  const [fdaAgreed, setFdaAgreed] = useState(false);

  const addStudy = async() => {

    const isBavariaAgreed = document.getElementById("bavariaAgreed").checked ? "True" : "False";
    const isFdaAgreed = document.getElementById("fdaAgreed").checked ? "True" : "False";

    const addStudyResponse = await entities.study.add({
      
      name: document.getElementById("name").value,
      status: document.getElementById("status").value,
      start: document.getElementById("start").value,
      end: document.getElementById("end").value,
      maxPatients: document.getElementById("maxPatients").value,
      isBavariaAgreed: isBavariaAgreed,
      isFdaAgreed: isFdaAgreed
    });
    
    console.log(isBavariaAgreed);
    console.log(isFdaAgreed);
    console.log(addStudyResponse);
  }

  // Initial state of the dropdown menu
  const initialState = () => {
    const value = "Active";
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
                <option value = "Active">Active</option>
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
            <input type="checkbox" checked = {bavariaAgreed} onChange={()=> setBavariaAgreed(!bavariaAgreed)} id = "bavariaAgreed"></input>
          </strong></p>
          <p className='checkbox'><strong>Agreed By FDA?
            <input type="checkbox" checked = {fdaAgreed} onChange={()=> setFdaAgreed(!fdaAgreed)} id = "fdaAgreed"></input>
          </strong></p>
          <p><b>Max Participants: </b><input type="text" id = "maxPatients"></input></p>

        </div>
      </div>
      <button className='add-patient'onClick = {() => {addStudy();}}>Add/Create Study</button>
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

  useEffect(() => {
    async function fetchStudy() {
      const studyList = await entities.study.list();
      setStudy(studyList.items);
      setIsLoading(false);
    }

    fetchStudy();
  }, [entities.study]);

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
                        <td>{study.startDate}</td>
                        <td>{study.endDate}</td>
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
      </div>
    )
};