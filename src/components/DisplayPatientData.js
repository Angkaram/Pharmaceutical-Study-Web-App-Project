import useJaneHopkins from '../hooks/useJaneHopkins';
import { useEffect, useState } from 'react';
import { css } from "@emotion/react";
import { ClipLoader } from "react-spinners";
import "./DoctorView.css";

function DisplayPatientData({searchTerm}) {
  const { entities } = useJaneHopkins();
  const [patients, setPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPatient, setSelectedPatient] = useState(null);

  useEffect(() => {
    async function fetchPatients() {
      const patientList = await entities.patient.list();
      setPatients(patientList.items);
      setIsLoading(false);
    }

    fetchPatients();
  }, [entities.patient]);

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  const handlePatientClick = (patient) => {
    setSelectedPatient(patient);
  }

  return (
    <div>
      <ClipLoader color={"blue"} loading={isLoading} css={override} size={40} />
      {!isLoading && (
        <table className="patientTable">
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Date of Birth</th>
              <th>Insurance Number</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            
          {patients.filter((patient)=> {
            if (patient.name.toLowerCase().includes(searchTerm.toLowerCase())) {
              return patient;
            } 
            else if (searchTerm === "") {
              return patient;
            }
          }).map((patient) => {
            return (
              <tr key={patient.id}>
                <td onClick={() => handlePatientClick(patient)}>{patient.name}</td>
                <td>{patient.age}</td>
                <td>{patient.dob}</td>
                <td>{patient.insuranceNumber}</td>
                <td>{patient.address}</td>
              </tr>
            )
          })}
            
          </tbody>
        </table>
      )}
      {selectedPatient && (
       <div class="largeView">
       <div class="popup-content">
         <div class="popup-top">
           <h3> Patient:<i> {selectedPatient.name}</i></h3> 
           <button id="close" onClick={() => setSelectedPatient(null)}>X</button>
         </div>
         <div class="popup-middle">
           <div class="popup-section">
             <h3>General Information</h3>
             <p><b>DOB: </b>{selectedPatient.dob}</p>
             <p><b>Insurance Number: </b>{selectedPatient.insuranceNumber}</p>
             <p><b>Weight:</b>{selectedPatient.weight}</p>
             <p><b>Address: </b>{selectedPatient.address}</p>
           </div>
           <div class="popup-section">
             <h3>Health Information</h3>
             <p><strong>Patient ID:</strong> <input type="text"></input></p>
             <p><strong>Blood Type:</strong> <input type="text"></input></p>
           </div>
           <div class="popup-section">
             <h3>Vital Signs</h3>
             <p><strong>Height:</strong> <input type="text"></input></p>
             <p><strong>Blood Pressure:</strong> <input type="text"></input></p>
             <p><strong>Temperature:</strong> <input type="text"></input></p>
             <p><strong>Oxygen Saturation:</strong> <input type="text"></input></p>
           </div>
           <div class="popup-section">
             <h3>Medical History</h3>
             <p><strong>Current Medications:</strong> <input type="text"></input></p>
             <p><strong>Family History:</strong> <input type="text"></input></p>
             <p><strong>Allergies:</strong> <input type="text"></input></p>
           </div>
         </div>
        
       </div>
     </div>
     
      
      )}
    </div>
  );
}

export default DisplayPatientData;
