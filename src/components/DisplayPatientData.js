// Please Note: If there are any patients that lack any of the features that we search by, it creates multiple errors.
// For example: If I made a patient with no insurance number and added that to vendia, it would cause the errors.
import useJaneHopkins from '../hooks/useJaneHopkins';
import { useEffect, useState } from 'react';
import { css } from "@emotion/react";
import { ClipLoader } from "react-spinners";
import "./DoctorView.css";

function DisplayPatientData({nameSearch, insuranceSearch, ICDSearch}) {
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
            if (patient.name.toLowerCase().includes(nameSearch.toLowerCase()) && patient.insuranceNumber.includes(insuranceSearch) 
            && patient.icdHealthCodes.some(code => code.code.toLowerCase().includes(ICDSearch.toLowerCase()))) { 
              return patient;
            } 
            else if (nameSearch === "" && insuranceSearch === "" && ICDSearch === "") {
              return patient;
            }
          }).map((patient) => {
            return (
              // Changed the key to get rid of the error in the console
              <tr key={patient.insuranceNumber}>
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
