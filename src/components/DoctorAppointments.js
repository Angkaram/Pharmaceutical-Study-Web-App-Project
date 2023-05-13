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
import ValidateDomain from "./validation";



function DoctorAppointments() {

    const location = useLocation();

    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const logout = async () => {
    await signOut(auth);
    navigate("/");
    };
    const { entities } = useJaneHopkins();
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        async function fetchPatients() {
          const patientList = await entities.patient.list();
          setPatients(patientList.items);
        }
    
        fetchPatients();
      }, [entities.patient]);

    if (user?.email == null) {
    
        let view;
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
      
        // Validates the user
        let isValidated = ValidateDomain(user.email, user.role);
      
        // Checks their role and redirects them accordingly
        if (isValidated === true) {
          if (user.role === 'doctor') {
            view = <DoctorHomePage user = {user} LogOut = {logout} />;
          }
          else {
            navigate("/Login");
          }
        // If everything fails, kicks unauthorized user to the login page
        } else {
          navigate("/Login");
        }
    
      })
      return unsubscribe
      };

    const locales = {
        "en-US": require("date-fns/locale/en-US")
    };

    const DoctorView = () => {
        navigate("/DoctorView", { state: { user } });
    };

    const DoctorHomePage = () => {
        navigate("/View", { state: { user } });
      };
    
    const localizer = dateFnsLocalizer({
        format,
        parse,
        startOfWeek,
        getDay,
        locales
    });


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
            <div className='nav-bar'>
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
            <div className="doctorNavButtonLocations">
                <div className="welcomeBro">
                    <button className='welcomeContainer' onClick={() => DoctorHomePage(user)}>Welcome Page</button>
                </div>
                
                <div className="appointmentBro">
                    <button className='welcomeContainer' onClick={() => DoctorView(user)}>Manage Patients</button>
                </div>
            </div>

            <div className="calendar">
                <Calendar localizer={localizer} events={eventList}
                startAccessor="start" endAccessor="end" style={{backgroundColor: "white"}} />
            </div>
        </div>
    );
};

export default DoctorAppointments;