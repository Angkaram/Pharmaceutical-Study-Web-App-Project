import { useNavigate } from "react-router-dom";
import DisplayStudyData from "./AdminDisplayStudyData";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";
import { useState } from "react";
import './ManageStudyView.css';
import Sidebar from './Sidebar';
import { useLocation } from 'react-router-dom';
import ValidateDomain from "./validation";


function AdminManageStudy() {

    const location = useLocation();
    const navigate = useNavigate();
    const [user, setUser] = useState(location.state);

    if (user?.email == null) {
    
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
                
        if (user.role != "admin") {
            navigate("/Login");
        }

        })
        return unsubscribe
    };

    const logout = async () => {
      await signOut(auth);
      navigate("/");
    };

    const gotoHomePage = () => {
        navigate("/View", { state: { user } });
    };
    
    const gotoPatientPage = () => {
        navigate("/AdminManagePatient", { state: { user } });
    };

    return (
        <div className='adminViewMg'> 
            <div className='nav-bar'style={{backgroundColor: '#6fabd0'}}>

                <div className='doctorViewTitle'>
                    <div className='janeHopkinsTitleText'>Jane Hopkins
                        <div className='hospitalTitleText'>Hospital</div>
                    </div>
                </div>

                <div className='displayEmail'>{user?.email}</div>

                <button className='signOutButton' style={{border: 'black' }} onClick={logout}>
                    <div className='signOutIcon'></div>
                    <div className='signOutText' style={{color: 'black' }}>Sign Out</div>
                </button>
            </div>

            <div className='doctorNavButtonLocations' >
                <div className="welcomeBro" style={{borderColor: '#6fabd0'}}>
                    <button onClick = {gotoHomePage} className='welcomeContainer' style={{color: '#6fabd0'}}>Welcome Page</button>
                </div>

                <div className='addPatientBro' style={{borderColor: '#6fabd0'}}>
                    <button onClick = {gotoPatientPage} style={{color: '#6fabd0'}}>Manage Patient</button>
                </div>
            </div>

            <Sidebar></Sidebar>

            <div className='patientTableLocation' >
                <DisplayStudyData nameSearch={""} statusSearch={""} startSearch={""} isAdminView={true}/>
            </div>

        </div>
    );

}

export default AdminManageStudy;