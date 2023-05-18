import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { auth } from "./firebase-config";
import Sidebar from './Sidebar';
import NavigationBar from './NavigationBar';
import DisplayStudyData from './DisplayStudyData';
import './loginprompt.css';
import "./loginprompt.js";
import './home.css';
import './DoctorView.css';

function BavariaView() {

  const location = useLocation();
  const [user, setUser] = useState(location.state);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const studyID = '0187a035-03e5-4828-43fc-269e5c9c0961'
  const [isOpen, setIsOpen] = useState(false);
  const togglePopup = () => {
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      const user = {
        email: userAuth?.email,
        role: userAuth?.displayName,
        id: userAuth?.uid
      };
      setUser(user);
      setLoading(false);

      if (!userAuth || user.role !== "bavaria") {
        navigate("/Login");
      }
    });

    return unsubscribe;
  }, []);
  
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