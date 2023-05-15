import { useNavigate } from "react-router-dom";
import "./DoctorHomePage.css";
import "./DoctorView.css";
import NavigationBar from "./NavigationBar";

function AdminHomePage ({ user, LogOut}) { 

  const navigate = useNavigate();

  const gotoStudy = () => {
    navigate("/AdminManageStudy", { state: { user } });
  };

  const gotoPatientPage = () => {
    navigate("/AdminManagePatient", { state: { user } });
  };


    console.log(user?.email);

    return (
      <div className='welcome-body'>

        <NavigationBar isAdminView={true} user={user}/>

        <div className='welcome-container'>
          <h1 className="title"> Welcome, Admin</h1>
          <div className="box-container">

            <div className="box" style={{backgroundColor: '#6fabd0'}}>
                <button onClick={() => gotoStudy(user)}><h3>Manage Study</h3></button>
            </div>
  
            <div className="box" style={{backgroundColor: '#6fabd0'}}>
                <button onClick={() => gotoPatientPage(user)}><h3>Manage Patients</h3></button>
            </div>
  
          </div>  
  
        </div>
      </div>
    );

}

export default AdminHomePage;