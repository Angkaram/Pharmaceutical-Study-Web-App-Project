import './loginprompt.css';
import "./loginprompt.js";
import './home.css';
import './DoctorView.css';
import './Notifications.css';
import './ManageStudyView.css';
import "./Admin.css";
import useJaneHopkins from '../hooks/useJaneHopkins';
import { useState, useEffect } from 'react';

function DisplayStudyPatients({studyPatients, isFDAView}) {
    const { entities } = useJaneHopkins();
    const patientIDs = studyPatients.map(patient => patient.id);
    const [patientsInStudy, setpatientsInStudy] = useState([]);

    const getPatient = async() => {
        const patientArray = [];
        for (const id of patientIDs) {
            const patient = await entities.patient.get(id);
            patientArray.push(patient);
        }
        setpatientsInStudy(patientArray);
    }

    useEffect(()=> {
        getPatient();
    // eslint-disable-next-line
    }, []);

    let color;
    if (isFDAView) {
        color = '#08d3b4';
    } else {
        color = '#6fabd0';
    }

    return (
        <div className='popup-table'>
            <table className="patientTable" style={{maxWidth:'800px'}}>
                <thead>
                    <tr>
                        <th style={{backgroundColor: color}}>Patient ID</th>
                        <th style={{backgroundColor: color}}>Doses</th>
                        <th style={{backgroundColor: color}}>Drug ID</th>
                    </tr>
                </thead>
                <tbody>      
                    {patientsInStudy.map((patient) => {
                    return (
                        <tr key={patient._id}>              
                            <td>{patient._id}</td>
                            <td>{patient.doses}</td>
                            <td>{patient.assignedDrug}</td>
                        </tr>
                        )
                    })}
                </tbody>
            </table>
            </div>
    )
  };

  export default DisplayStudyPatients;