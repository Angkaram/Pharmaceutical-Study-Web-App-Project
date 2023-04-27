import { useNavigate } from "react-router-dom";
import "./DoctorHomePage.css";
import "./DoctorView.css";

function AdminHomePage ({ user, LogOut, gotoStudy, gotoPatientPage}) { 
    console.log(user?.email);
    return (
      <div className='welcome-body'>

        <div className = 'nav-bar' style={{backgroundColor: '#6fabd0'}}>
            <div className='janeHopkinsTitleText'>Jane Hopkins
              <div className='hospitalTitleText'>Hospital</div>
            </div>
            <div className='displayEmail'>{user?.email}</div>

            <button className='signOutButton' style={{border: 'black' }} onClick={LogOut}>
              <div className='signOutIcon'></div>
              <div className='signOutText' style={{color: 'black' }}>Sign Out</div>
            </button>
        </div>

        <div className='welcome-container'>
          <h1 className="title"> Welcome, Admin</h1>
          <div className="box-container">

            <div className="box" style={{backgroundColor: '#6fabd0'}}>
                <button onClick={gotoStudy}><h3>Manage Study</h3></button>
            </div>
  
            <div className="box" style={{backgroundColor: '#6fabd0'}}>
                <button onClick={gotoPatientPage}><h3>Manage Patients</h3></button>
            </div>
  
          </div>  
  
        </div>
      </div>
    );

}

export default AdminHomePage;