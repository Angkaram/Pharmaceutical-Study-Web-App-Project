import { useLocation } from 'react-router-dom';
import './loginprompt.css';
import "./loginprompt.js";
import './home.css';
import { auth } from "./firebase-config";
import { useNavigate} from "react-router-dom";
import './DoctorView.css';

import './ManageStudyView.css';
import useJaneHopkins from '../hooks/useJaneHopkins';
import { useEffect, useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DisplayStudyData from './DisplayStudyData';
import Sidebar from './Sidebar';

import NavigationBar from './NavigationBar';

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
  const [user, setUser] = useState(location.state);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      const user = {
        email: userAuth?.email,
        role: userAuth?.displayName,
        id: userAuth?.uid
      };
      setUser(user);
      setLoading(false);

      if (!userAuth || user.role !== "doctor") {
        navigate("/Login");
      }
    });

    return unsubscribe;
  }, []);

  if (loading) {
    // Fixes the issue of the view briefly showing
    return null;
  }

  
  const studyID = '0187a035-03e5-4828-43fc-269e5c9c0961'

  return (
    <div className='managePatient'> 

      <NavigationBar isDoctorView={true} user={user}/>

    <Sidebar></Sidebar>

    <div className='patientTableLocation'>
      <DisplayStudyData />
    </div>
    
    <div className='doctorNavButtonLocations'>
        <div className="welcomeBro">
          <button onClick={() => DoctorHomePage(user)}>Welcome Page</button>
        </div>
        <div className='addPatientBro'>
          <button onClick={togglePopup} >Add Study</button>
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

  const addStudy = async() => {
    console.log('addStudy called with study data');
    const addStudyResponse = await entities.study.add({
      name: document.getElementById("name").value,
      status: "Pending",
      start: document.getElementById("start").value,
      end: document.getElementById("end").value,
      maxPatients: Number(document.getElementById("maxPatients").value),
    });
    
    console.log(addStudyResponse);

  }



  // Initial state of the dropdown menu
  const initialState = () => {
    const value = "Pending";
    return value;
  }

  // Change value depending on dropdown menu
  const [value, setValue] = useState(initialState);

  const handleChange = (e) => {
    setValue(e.target.value);
  }

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  async function handleButtonClick() {
    await addStudy();
    window.location.reload();
  };

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
          <div style={{marginTop:'20px'}}><b>Study Start:</b>
            <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            id="start"
            dateFormat="MMMM d, yyyy"
            />
          </div>
          <div style={{marginTop:'15px'}}><b>Study End: </b>
            <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            id="end"
            dateFormat="MMMM d, yyyy"
            />
          </div>
          <div style={{marginTop:'15px'}}><b>Max Participants: </b><input type="number" id = "maxPatients"></input></div>

        </div>
      </div>
      <button className='add-patient' onClick={() => {handleButtonClick();
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