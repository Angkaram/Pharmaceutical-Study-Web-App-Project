import DisplayStudyData from "./AdminDisplayStudyData";
import './ManageStudyView.css';

function AdminManageStudy({user, logout, gotoHomePage}) {

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
                <button onClick={gotoHomePage}>Return Home</button>
            </div>

            <div className='patientTableLocation' style={{top: 320}}>
                <DisplayStudyData nameSearch={""} statusSearch={""} startSearch={""}/>
            </div>

        </div>
    );

}

export default AdminManageStudy;