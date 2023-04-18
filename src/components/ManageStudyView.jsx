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
import { ClipLoader } from "react-spinners";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function ManageStudyView({studyName, studyStatus, studyStart, studyEnd, bavariaAgreed, fdaAgreed, maxPatients}) {

  /* EDIT BELOW TO MATCH STUDY LOGIC, NOT PATIENT LOGIC */
  const { entities } = useJaneHopkins();
  const [patients, setPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const [isOpen, setIsOpen] = useState(false);
  const togglePopup = () => {
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    async function fetchPatients() {
      const patientList = await entities.patient.list();
      setPatients(patientList.items);
      setIsLoading(false);
    }
  
    fetchPatients();
  
  }, [entities.patient]);
  
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

    <div class="patientTableLocation">
  <table class="patientTable">
    <thead>
      <tr>
        <th>Study Name</th>
        <th>Study Status</th>
        <th>Study Start</th>
        <th>Study End</th>
        <th>Agreed by Bavaria</th>
        <th>Agreed by FDA</th>
        <th>Max Participants</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Study 1</td>
        <td>Active</td>
        <td>01/01/2022</td>
        <td>05/01/2022</td>
        <td>Yes</td>
        <td>Yes</td>
        <td>50</td>
      </tr>
      <tr>
        <td>Study 2</td>
        <td>Pending</td>
        <td>02/01/2022</td>
        <td>06/01/2022</td>
        <td>No</td>
        <td>Yes</td>
        <td>100</td>
      </tr>
      <tr>
        <td>Study 3</td>
        <td>Cancelled</td>
        <td>03/01/2022</td>
        <td>07/01/2022</td>
        <td>Yes</td>
        <td>No</td>
        <td>20</td>
      </tr>
      <tr>
        <td>Study 4</td>
        <td>Completed</td>
        <td>04/01/2022</td>
        <td>08/01/2022</td>
        <td>Yes</td>
        <td>Yes</td>
        <td>75</td>
      </tr>
        </tbody>
        </table>
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

//new function
function AddStudyButton(togglePopup) {
  const {entities} = useJaneHopkins();
  const [bavariaAgreed, setBavariaAgreed] = useState(false);
  const [fdaAgreed, setFdaAgreed] = useState(false);

  const addPatient = async() => {

    const isBavariaAgreed = document.getElementById("bavariaAgreed").checked ? "True" : "False";
    const isFdaAgreed = document.getElementById("fdaAgreed").checked ? "True" : "False";

    const addPatientResponse = await entities.patient.add({
      
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
    console.log(addPatientResponse);
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
          <b>Study Status: </b>  {/* needs the id="status" */}
          <select value={value} onChange={handleChange} className = "drop-down" name = "select-organization">
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
            id="start"
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
      <button className='add-patient'onClick = {() => {addPatient();}}>Add/Create Study</button>
    </div>
  </div>
  )

}