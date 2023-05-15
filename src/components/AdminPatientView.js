import DisplayPatientData from "./DisplayPatientData";
import { useState } from "react";
import "./DoctorView.css";
import "./Admin.css";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import ValidateDomain from "./validation";
import NavigationBar from './NavigationBar';

function AdminPatientView() {

  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(location.state);
  const [nameSearch, setNameSearch] = useState("");
  const [idSearch, setIDSearch] = useState("");

  const [isChecked, setIsChecked] = useState(false);

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

  const gotoStudy = () => {
    navigate("/AdminManageStudy", { state: { user } });
  };

  const gotoHomePage = () => {
    navigate("/View", { state: { user } });
  };


  const filterEligible = isChecked;

  const clearSearch = () => {
    setIDSearch("");
    setNameSearch("");
  }
    
    return (
      <div className='adminView'> 

        <NavigationBar isAdminView={true} user={user}/>
      
      <div className='doctorNavButtonLocations' >
          <div className="welcomeBro" style={{borderColor: '#6fabd0'}}>
              <button onClick = {gotoHomePage} className='welcomeContainer' style={{color: '#6fabd0'}}>Welcome Page</button>
          </div>

          <div className='addPatientBro' style={{borderColor: '#6fabd0'}}>
              <button onClick = {gotoStudy} style={{color: '#6fabd0'}}>Manage Study</button>
          </div>
        </div>
  
      <div className='patientSearchBox' style={{borderColor: '#6fabd0'}}>
        <div className='patientSearchBoxName'>Patient Search</div>

        <div className='patientSearchBars'>

          <div className='patientNameSearch'>      
            <div className='patientNameSearchLabel'>Name</div>
            <input className='patientNameSearchBox' type="text" onChange = {(event) => {setNameSearch(event.target.value)}} value={nameSearch}/>
          </div>

          <div className='patientICDSearch'>
            <div className='patientICDSearchLabel'>Patient ID</div>
            <input className='patientICDSearchBox' type="text" onChange = {(event) => {setIDSearch(event.target.value)}} value={idSearch}/>
          </div>

          <div className='patientNameSearch'>
            <div className='patientNameSearchLabel'>Show Eligible</div>
            <input type="checkbox" checked = {isChecked} onChange={()=> setIsChecked(!isChecked)} className="admin-checkbox" style={{marginLeft: '30px'}}></input>
          </div>
        </div>
  

          <div className='searchUndoLocations'>
              <button onClick = {clearSearch} className='searchButton'> Clear Search </button>
          </div>
      
    </div>

      <div className='patientTableLocation'>
        <DisplayPatientData nameSearch={nameSearch} idSearch={idSearch} isAdminView={true} filterEligible={filterEligible}/>
      </div>
  
    </div>
    );

}

export default AdminPatientView;