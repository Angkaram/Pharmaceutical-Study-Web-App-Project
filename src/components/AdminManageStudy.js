import DisplayStudyData from "./AdminDisplayStudyData";
import './ManageStudyView.css';

function AdminManageStudy({user, logout, gotoHomePage, gotoPatientPage}) {

    return (
        <div className='managePatient'> 
            <div className='doctorNavbar'style={{backgroundColor: '#6fabd0'}}>

                <div className='doctorViewTitle'>
                    <div className='janeHopkinsTitleText'>Jane Hopkins
                        <div className='hospitalTitleText'>Hospital</div>
                    </div>
                </div>

                <div className='displayEmail'>{user?.email}</div>

                <button className='signOutButton' onClick={logout}>
                    <div className='signOutIcon'></div>
                    <div className='signOutText'>Sign Out</div>
                </button>
            </div>

            <div className='doctorNavButtonLocations'>
                <div>
                    <button onClick = {gotoHomePage} className='welcomeContainer' style={{borderColor: '#6fabd0', marginLeft:"170px"}}>
                        <div className='welcomeText' style={{color: '#6fabd0' }}>Welcome Page</div>
                    </button>
                </div>

                <div>
                    <button onClick = {gotoPatientPage} className='addPatientContainer' style={{borderColor: '#6fabd0', marginLeft:"-170px"}}>
                        <div className='addPatientText' style={{color: '#6fabd0' }}>Manage Patient</div>
                    </button>
                </div>
            </div>

            <div className='patientTableLocation' style={{top: 320}}>
                <DisplayStudyData nameSearch={""} statusSearch={""} startSearch={""} isAdminView={true}/>
            </div>

        </div>
    );

}

export default AdminManageStudy;