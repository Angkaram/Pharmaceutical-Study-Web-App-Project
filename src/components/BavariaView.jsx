import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './loginprompt.css';
import "./loginprompt.js";
import './home.css';
import { useNavigate } from "react-router-dom";
import DisplayStudyData from './DisplayStudyData';
import './DoctorView.css';
import Sidebar from './Sidebar';
import NavigationBar from './NavigationBar';

function BavariaView() {

  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state;

  const studyID = '0187a035-03e5-4828-43fc-269e5c9c0961'
  const [isOpen, setIsOpen] = useState(false);
  const togglePopup = () => {
    setIsOpen(!isOpen);
  }


  
  const BavariaHomePage = () => {
    navigate("/View", { state: { user } });
  };

  const ManageShipmentsView = () => {
    navigate("/ManageShipmentsView", { state: { user } });
  };

  return (
    <div className='fdaview'>
       <NavigationBar isBavariaView={true} user={user}/>

      <div className='doctorNavButtonLocations'>
        <div className="welcomeBro" style={{borderColor: '#f46f74'}}>
          <button className='welcomeContainer' onClick={() => BavariaHomePage(user)} style={{color: 'black'}}>Welcome Page</button>
        </div>
        <div className="welcomeBro" style={{borderColor: '#f46f74'}}>
          <button className='welcomeContainer' onClick={() => ManageShipmentsView(user)} style={{color: 'black'}}>Manage Shipments</button>
        </div>
      </div>
      
      <Sidebar></Sidebar>

      

      <div className='patientTableLocation'>
        <DisplayStudyData studyID={studyID} isBavariaView={true}/>
      </div>

    </div>
  );
}

export default BavariaView;