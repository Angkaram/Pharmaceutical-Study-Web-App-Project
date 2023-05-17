import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './loginprompt.css';
import "./loginprompt.js";
import './home.css';
import { auth } from "./firebase-config";
import { useNavigate } from "react-router-dom";
import DisplayStudyData from './AdminDisplayStudyData';
import './DoctorView.css';

import Sidebar from './Sidebar';

import NavigationBar from './NavigationBar';

function FDAView() {

  const location = useLocation();
  const initialUser = location.state || null;
  const [user, setUser] = useState(initialUser);
  
  const navigate = useNavigate();

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

      if (!userAuth || user.role !== "fda") {
        navigate("/Login");
      }
    });

    return unsubscribe;
  }, []);

  if (loading) {
    // Fixes the issue of the view briefly showing
    return null;
  }
  




  const FDAHomePage = () => {
    navigate("/View", { state: { user } });
  };

  return (
    <div className='fdaview'> 

      <NavigationBar isFDAView={true} user={user}/>

      <div className='doctorNavButtonLocations'>
          <div className="welcomeBro" style={{borderColor: '#08d3b4'}}>
            <button className='welcomeContainer' onClick={() => FDAHomePage()} style={{color: 'black'}}>Welcome Page</button>
          </div>
      </div>

      <Sidebar></Sidebar>

      <div className='patientTableLocation' style={{top: '300px'}}>
        <DisplayStudyData isFDAView={true}/>
      </div>
      
    </div>
  );
}

export default FDAView;