import { useLocation } from 'react-router-dom';
import './loginprompt.css';
import "./loginprompt.js";
import './home.css';
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";
import { useNavigate, Link } from "react-router-dom";
import './DoctorView.css';
import View from "./States_Views";

function ManageStudyView() { 
  
  const location = useLocation();
  const { user } = location.state;  //LogOut not working yet
  const navigate = useNavigate();
  const logout = async () => {
    await signOut(auth);
    navigate("/");
  };

  console.log(user?.email);
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
</div>)}

export default ManageStudyView;