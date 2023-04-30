import './loginprompt.css';
import "./loginprompt.js";
import './home.css';
import './DoctorView.css';
import './Notifications.css';
import './ManageStudyView.css';
import "./Admin.css";
import useJaneHopkins from '../hooks/useJaneHopkins';
import { useState, useEffect } from 'react';

function DisplayStudyPatients({studyPatients}) {
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

    return (
        <div className='popup-table'>
            <table className="patientTable" style={{maxWidth:'800px'}}>
                <thead>
                    <tr>
                        <th style={{backgroundColor: '#6fabd0'}}>Patient ID</th>
                        <th style={{backgroundColor: '#6fabd0'}}>Doses</th>
                        <th style={{backgroundColor: '#6fabd0'}}>Drug ID</th>
                    </tr>
                </thead>
                <tbody>      
                    {patientsInStudy.map((patient) => {
                    return (
                        <tr key={patient._id}>              
                            <td>{patient._id}</td>
                            <td>{patient.doses}</td>
                            <td>Drug ID</td>
                        </tr>
                        )
                    })}
                </tbody>
            </table>
            </div>
    )
  };

  export default DisplayStudyPatients;