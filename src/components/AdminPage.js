import { useState } from "react";
import AdminManageStudy from "./AdminManageStudy";
import AdminHomePage from "./AdminHomePage";
import AdminPatientView from "./AdminPatientView";

let display;
function AdminPage({user, LogOut}) {

    const [adminView, setAdminView] = useState('Home');

    const gotoStudy = async () => {
        setAdminView('Study');
    }

    const gotoHomePage = async () => {
        setAdminView('Home');
    }

    const gotoPatientPage = async () => {
        setAdminView('Patient');
    }

    if (adminView === 'Home') {
        display = <AdminHomePage user = {user} LogOut = {LogOut} gotoStudy={gotoStudy} gotoPatientPage = {gotoPatientPage}/>;
    } else if (adminView === 'Study') {
        display = <AdminManageStudy user = {user} logout = {LogOut} gotoHomePage = {gotoHomePage} gotoPatientPage = {gotoPatientPage}/>;
    } else if (adminView === 'Patient') {
        display = <AdminPatientView user = {user} logout = {LogOut} gotoHomePage = {gotoHomePage} gotoStudy = {gotoStudy}/>
    }

    return (
        <div>
            {display}
        </div>
    );

}

export default AdminPage