import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import useJaneHopkins from '../hooks/useJaneHopkins';
import { useEffect, useState } from 'react';
import "./Appointments.css";
import { useNavigate, Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { useLocation } from "react-router-dom";
import { auth } from "./firebase-config";


function DoctorAppointments() {

    const location = useLocation();
    const { user } = location.state;

    const navigate = useNavigate();

    const logout = async () => {
        await signOut(auth);
        navigate("/");
    };

    const locales = {
        "en-US": require("date-fns/locale/en-US")
    };
    
    const localizer = dateFnsLocalizer({
        format,
        parse,
        startOfWeek,
        getDay,
        locales
    });

    const { entities } = useJaneHopkins();
    const [patients, setPatients] = useState([]);
  
    useEffect(() => {
      async function fetchPatients() {
        const patientList = await entities.patient.list();
        setPatients(patientList.items);
      }
  
      fetchPatients();
    }, [entities.patient]);


    const eventList =[];
    patients.forEach(patient => {
        if (patient && patient.visits) {
        patient.visits.forEach(visit =>{
            eventList.push({
                title: visit.patient,
                start: new Date(visit.dateTime),
                end: new Date(visit.dateTime)
            });
        })
        }
    });

    return (
        <div className='center'> 
            <div className='doctorNavbar'>
                <div className='doctorViewTitle'>
                    <div className='janeHopkinsTitleText'>Jane Hopkins</div>
                    <div className='hospitalTitleText'>Hospital</div>
                </div>
                <div className='displayEmail'>{user.email}</div>
                <button className='signOutButton' onClick = {logout}>
                    <div className='signOutIcon'></div>
                    <div className='signOutText'>Sign Out</div>
                </button>
            </div>
            <div className="buttonLocations">
            <Link to="/View">
                <button className='welcomeContainer'>
                    <div className='welcomeText'>Welcome Page</div>
                </button>
            </Link>

            <Link to="/DoctorView">
                <button className='patientContainer'>
                    <div className='patientText'>Manage Patients</div>
                </button>
            </Link>

                <h1 className = "header">Manage Appointments</h1>
            </div>

            <div className="calendar">
                <Calendar localizer={localizer} events={eventList}
                startAccessor="start" endAccessor="end" style={{height: 600, margin: "250px"}} />
            </div>
        </div>
    );
};

export default DoctorAppointments;