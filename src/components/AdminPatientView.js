import DisplayPatientData from "./DisplayPatientData";
import { useState } from "react";
import "./DoctorView.css";
import "./Admin.css";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";
import { useNavigate } from "react-router-dom";

function AdminPatientView() {

  const navigate = useNavigate();

  const [user, setUser] = useState(null);

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


  const [nameSearch, setNameSearch] = useState("");
  const [idSearch, setIDSearch] = useState("");

  const [isChecked, setIsChecked] = useState(false);

  const filterEligible = isChecked;

  const clearSearch = () => {
    setIDSearch("");
    setNameSearch("");
  }
    
    return (
      <div className='adminView'> 

      <div className='nav-bar' style={{backgroundColor: '#6fabd0'}}>
  
        <div className='doctorViewTitle'>
          <div className='janeHopkinsTitleText'>Jane Hopkins
            <div className='hospitalTitleText'>Hospital</div>
          </div>
        </div>
        <div className='displayEmail'>{user?.email}</div>
        <button className='signOutButton' onClick={logout} style={{border: 'black' }}>
          <div className='signOutIcon'></div>
          <div className='signOutText' style={{color: 'black' }}>Sign Out</div>
        </button>
      </div>
      
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