import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './loginprompt.css';
import "./loginprompt.js";
import './home.css';
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";
import DisplayDrugsData from "./DisplayDrugsData";
import { useNavigate } from "react-router-dom";
import ShipmentsButton from "./ShipmentsButton";
import NavigationBar from './NavigationBar';

function ManageShipmentsView () {

    const drugID = `0187d449-b778-acbd-27c6-94b2a9be0287`

    const location = useLocation();
    const [user, setUser] = useState(location.state);
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const logout = async () => {
        await signOut(auth);
        navigate("/");
    };
    const togglePopup = () => {
        setIsOpen(!isOpen);
    }


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
  
        if (!userAuth || user.role !== "bavaria") {
          navigate("/Login");
        }
      });
  
      return unsubscribe;
    }, []);
  
    if (loading) {
      // Fixes the issue of the view briefly showing
      return null;
    }
    
    
    const BavariaHomePage = () => {
      navigate("/View", { state: { user } });
    };


    return (
        <div className='bavariabody'>

          <NavigationBar isBavariaView={true} user={user}/> 

            <div className='doctorNavButtonLocations'>
                <div className="welcomeBro" style={{borderColor: '#f46f74'}}>
                    <button className='welcomeContainer' onClick={() => BavariaHomePage(user)} style={{color: 'black'}}>Welcome Page</button>
                </div>

                <div className='addPatientBro' style={{borderColor: '#f46f74'}}>
                    <button className='welcomeContainer' onClick={togglePopup} style={{color: 'black'}}>Add Shipments</button>
                </div>
            </div>

            <div className='patientTableLocation'>
                <DisplayDrugsData isFDAView={false} isBavariaView={true}/>
            </div>
            {isOpen && <ShipmentsButton handleClose={togglePopup}/>}
        </div>
    )

};
export default ManageShipmentsView;
