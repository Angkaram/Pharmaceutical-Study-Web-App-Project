import DisplayStudyData from "./AdminDisplayStudyData";
import './ManageStudyView.css';

function AdminManageStudy({user, logout, gotoHomePage, gotoPatientPage}) {

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

            <div className='patientTableLocation' >
                <DisplayStudyData nameSearch={""} statusSearch={""} startSearch={""} isAdminView={true}/>
            </div>

        </div>
    );

}

export default AdminManageStudy;