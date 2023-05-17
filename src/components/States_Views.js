import React, { useState, useEffect } from 'react';
import './loginprompt.css';
import "./loginprompt.js";
import './home.css';
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";
import { useNavigate, Link, Outlet } from "react-router-dom";
import ValidateDomain from "./validation";
//import DisplayPatientData from './DisplayPatientData';
import './DoctorHomePage.css';
import './FDAHomePage.css';
import './BavariaHomePage.css';
import AdminHomePage from "./AdminHomePage";
import NavigationBar from './NavigationBar';
/*
import ShipmentsButton from './ShipmentsButton';
import ManageStudyView from './ManageStudyView';
import AdminPage from './AdminPage';
import ManageShipmentsView from './ManageShipmentsView';
*/

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
        } else if (user.role === "admin") {
          view = <AdminHomePage user = {user} LogOut = {logout}/>;
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

// what is shown on DoctorHomePage
function DoctorHomePage({ user, LogOut}) {
  const navigate = useNavigate();
  const DoctorView = () => {
    navigate("/DoctorView", { state: { user } });
  };

  const Appointments = () => {
    navigate("/Appointments", { state: { user } });
  };

  const handleManageStudyView = () => {
    navigate("/ManageStudyView", { state: { user } });
  };
  
  console.log(user?.email);
  return (
    // doctorbody in DoctorHomePage.css
    <div className='welcome-body'>
      
      <NavigationBar isDoctorView={true} user={user}/>

      <div className='welcome-container'>
        <h1 className="title"> Welcome, Doctor</h1>
        <div className="box-container">

          <div className="box">
              <button onClick={() => Appointments(user)}><h3>Manage Appointments</h3></button>
          </div>

          <div className="box">
              <button onClick={() => handleManageStudyView(user)}><h3>Manage Study</h3></button>
          </div>

          <div className="box">
              <button onClick={() => DoctorView(user)}><h3>Manage Patients</h3></button>
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

          {/* <div className = 'nav-bar' style={{backgroundColor: '#08d3b4'}}>
            <div className='janeHopkinsTitleText'>FDA
              <div className='hospitalTitleText' style={{fontSize: 25, textAlign: 'center'}}>U.S. Food and Drug Administration</div>
            </div>
            <div className='displayEmail'>{user?.email}</div>
            <button className='signOutButton' onClick={LogOut}>
              <div className='signOutIcon'></div>
              <div className='signOutText' style={{color: '#069882'}}>Sign Out</div>
            </button>
          
        </div> */}
        <NavigationBar isFDAView={true} user={user}/>
        <div className='welcome-container'>
          <h1 className="title"> Welcome</h1>
          <div className="box-container" >
  
            <div className="box" style={{backgroundColor: '#08d3b4'}}>
                <button onClick={FDAView}><h3>Manage Contracts</h3></button>
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

  const handleManageShipmentsView = () => {
    navigate("/ManageShipmentsView", { state: { user } });
  };
  
  console.log(user?.email);
  return (
        <div className='bavariabodyWelcome'>

          <NavigationBar isBavariaView={true} user={user}/>
        <div className='welcome-container'>
          <h1 className="title"> Welcome</h1>
          <div className="box-container" >
  
            <div className="box" style={{backgroundColor: '#f46f74'}}>
                <button onClick={() => BavariaView(user)}><h3>Manage Study</h3></button>
            </div>
            <div className="box" style={{backgroundColor: '#f46f74'}}>
                <button onClick={() => handleManageShipmentsView(user)}><h3>Manage Shipments</h3></button>
            </div>
  
          </div>  
  
        </div>
      </div>
          );
}

export default View;