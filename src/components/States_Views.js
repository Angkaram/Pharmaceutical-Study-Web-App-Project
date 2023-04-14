import React, { useState, useEffect } from 'react';
import './loginprompt.css';
import "./loginprompt.js";
import './home.css';
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";
import { useNavigate, Link } from "react-router-dom";
import ValidateDomain from "./validation";
import DisplayPatientData from './DisplayPatientData';
import './DoctorHomePage.css';
import './FDAHomePage.css';
import './BavariaHomePage.css';
import ShipmentsButton from './ShipmentsButton';


let view;

function View() {
  
  // the email for the user is displayed.
  // changes based on state, role, and view
  // eslint-disable-next-line
  const [user, setUser] = useState(null);

  let navigate = useNavigate();
  
  useEffect(() => {
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

      const logout = async () => {
        await signOut(auth);
        navigate("/");
      };

      
    
      // Validates the user
      let isValidated = ValidateDomain(user.email, user.role);
    
      // Checks their role and redirects them accordingly
      if (isValidated === true) {
        if (user.role === 'doctor') {
          view = <DoctorHomePage user = {user} LogOut = {logout} />;
        } else if (user.role === "fda") {
          view = <FDAHomePage user = {user} LogOut = {logout}/>;
        } else if (user.role === "bavaria") {
          view = <BavariaHomePage user = {user} LogOut = {logout}/>;
        }
    // If everything fails, kicks unauthorized user to the login page
    } else {
      navigate("/Login");
    }

    })

    return unsubscribe
// eslint-disable-next-line
  }, []);


  // styling
  return (
    <div>
      {view}
    </div>
  );
};

// what is shown on DoctorView
function DoctorHomePage({ user, LogOut}) {
  const navigate = useNavigate();
  const DoctorView = () => {
    navigate("/DoctorView", { state: { user } });
  };
  
  console.log(user?.email);
  return (
    <div className='doctorbody'>
      <div className='doctorNavbar'>

<div className='doctorViewTitle'>
<div className='janeHopkinsTitleText'>Jane Hopkins</div>
<div className='hospitalTitleText'>Hospital</div>
</div>
<div className='displayEmail'>{user?.email}</div>
<button className='signOutButton' onClick={LogOut}>
<div className='signOutIcon'></div>
<div className='signOutText'>Sign Out</div>
</button>
</div>
<div className='container'>
            <h1 className="title"> Welcome, Doctor</h1>
            <div className="box-container">
            <div className="box">
        <div className="button-container">
        <button className="buttons"><h3>Manage Appointments</h3></button>
        </div>
        </div>
        <div className="box">
          <div className="button-container">
            <button className="buttons" onClick={() => DoctorView(user)}><h3>Manage Patients</h3></button>
          </div>
        </div>
            </div>
            
        </div>
        </div>
  );
}

// what is shown on FDAView. Line below h4 displays the user email logged in to FDA view
function FDAHomePage({ user, LogOut }) {
  const navigate = useNavigate();
  const FDAView = () => {
    navigate("/FDAView", { state: { user } });
  };
  
  console.log(user?.email);
  return (
    <div className='fdabody'> 
      <div className='doctorNavbar' style={{backgroundColor: '#08d3b4'}}>

        <div className='doctorViewTitle'>
        <div className='janeHopkinsTitleText'style={{left: '138px', top: '14px', color: 'white', fontFamily: 'Georgia'}}>FDA</div>
        <div className='hospitalTitleText' style={{fontSize: 25, textAlign: 'center', left: '0', top: '18px'}}>U.S. Food and Drug Administration</div>
      </div>
    <div className='displayEmail'>{user?.email}</div>
      <button className='signOutButton' style={{border: '#069882' }} onClick={LogOut}>
        <div className='signOutIcon'></div>
        <div className='signOutText' style={{color: '#069882' }}>Sign Out</div>
      </button>
    </div>
    <div className='container'>
      <h1 className="title"> Welcome</h1>
      <div className="box-container">
        <div className="box" style={{backgroundColor: '#069882'}}>
          <div className="button-container">
            <button className="buttons" style={{backgroundColor: '#069882'}}><h3>Manage Studies</h3></button>
          </div>
        </div>
        <div className="box" style={{backgroundColor: '#069882'}}>
          <div className="button-container">
            <button className="buttons" style={{backgroundColor: '#069882'}} onClick={() => FDAView(user)}><h3>Manage Contracts</h3></button>
          </div>
        </div>
      </div>   
    </div>
  </div>
  );
}

// bavaria view (work in progress)
function BavariaHomePage({ user, LogOut }) {
  const navigate = useNavigate();
  const BavariaView = () => {
    navigate("/BavariaView", { state: { user } });
  };
  
  console.log(user?.email);
  return (
    <div className='bavariabody'> 
      <div className='doctorNavbar' style={{backgroundColor: '#f46f74'}}>

        <div className='doctorViewTitle'>
        <div className='janeHopkinsTitleText' style={{left: '78px', top: '8px', color: 'white', fontFamily: 'Georgia'}}>Bavaria</div>
        <div className='hospitalTitleText' style={{textAlign: 'center', left: '0', top: '18px'}}>Pharmaceuticals</div>
      </div>
    <div className='displayEmail'>{user?.email}</div>
      <button className='signOutButton' style={{border: '#f46f74' }} onClick={LogOut}>
        <div className='signOutIcon'></div>
        <div className='signOutText' style={{color: '#e7121a' }}>Sign Out</div>
      </button>
    </div>
    <div className='container'>
      <h1 className="title"> Welcome</h1>
      <div className="box-container">
        <div className="box" style={{backgroundColor: '#f46f74'}}>
          <div className="button-container">
            <button className="buttons" style={{backgroundColor: '#f46f74'}}><h3>Manage Something</h3></button>
          </div>
        </div>
        <div className="box" style={{backgroundColor: '#f46f74'}}>
          <div className="button-container">
            <button className="buttons" style={{backgroundColor: '#f46f742'}} onClick={() => BavariaView(user)}><h3>Manage Shipments</h3></button>
          </div>
        </div>
      </div>   
    </div>
  </div>
  );
}

export default View;

