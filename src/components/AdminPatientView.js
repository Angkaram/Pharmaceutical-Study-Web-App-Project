import DisplayPatientData from "./DisplayPatientData";
import { useState } from "react";
import "./DoctorView.css";

function AdminPatientView({user, logout, gotoHomePage}) {
  const [nameSearch, setNameSearch] = useState("");
  const [insuranceSearch, setInsuranceSearch] = useState("");

  const clearSearch = () => {
    setInsuranceSearch("");
    setNameSearch("");
  }
    
    return (
      <div className='managePatient'> 

      <div className='doctorNavbar' style={{backgroundColor: '#6fabd0'}}>
  
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
      
      <div className='doctorNavButtonLocations'>
        <div>

          <button onClick = {gotoHomePage} className='welcomeContainer' style={{borderColor: '#6fabd0'}}>
            <div className='welcomeText' style={{color: '#6fabd0' }}>Welcome Page</div>
          </button>

        </div>

        <div className='appointmentContainer' style={{borderColor: '#6fabd0'}}>
          <div className='appointmentText' style={{color: '#6fabd0' }}>Manage Appointments</div>
        </div>

        <div>
          <button className='addPatientContainer' style={{borderColor: '#6fabd0'}}>
            <div className='addPatientText' style={{color: '#6fabd0' }}>Add Patients</div>
          </button>
        </div>
      </div>
  
      <div className='patientSearchBox' style={{borderColor: '#6fabd0', width: '730px'}}>

        <div className='patientSearchBoxName'>Patient Search</div>

        <div className='searchUndoLocations'>
          <button onClick = {clearSearch} className='searchButton'> Clear Search </button>
        </div>

      <div className='patientNameSearch'>      
          <input className='patientNameSearchBox' type="text" onChange = {(event) => {setNameSearch(event.target.value)}} value={nameSearch}/>
          <div className='patientNameSearchLabel'>Name</div>
      </div>

      <div className='patientNameSearch' style={{marginLeft: '300px'}} >
          <input className='patientInsuranceSearchBox' type="text" onChange = {(event) => {setInsuranceSearch(event.target.value)}} value={insuranceSearch}/>
          <div className='patientInsuranceSearchLabel'>Patient ID</div>
      </div>


    </div>

      <div className='patientTableLocation'>
        <DisplayPatientData nameSearch={nameSearch} insuranceSearch={insuranceSearch} isAdminView={true}/>
      </div>
  
    </div>
    );

}

export default AdminPatientView;