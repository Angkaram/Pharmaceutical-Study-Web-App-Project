// Please Note: If there are any patients that lack any of the features that we search by, it creates multiple errors.
// For example: If I made a patient with no insurance number and added that to vendia, it would cause the errors.
import useJaneHopkins from '../hooks/useJaneHopkins';
import { useEffect, useState } from 'react';
import { css } from "@emotion/react";
import { ClipLoader } from "react-spinners";
import AddAppointment from './addAppointment';
import EditPatient from './editPatient';
import "./DoctorView.css";

function DisplayPatientData({nameSearch, insuranceSearch, ICDSearch, isFDAView, isBavariaView, isAdminView, filterEligible, idSearch}) {

  const { entities } = useJaneHopkins();
  const [patients, setPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [patientData, setPatientData] = useState(selectedPatient);

  const [isOpen, setIsOpen] = useState(false);
  const togglePopup = () => {
    setIsOpen(!isOpen);
  }

  const [isOpenNew, setIsOpenNew] = useState(false);
  const togglePopupNew = () => {
    setIsOpenNew(!isOpenNew);
  }

  const handlePatientDataUpdate = (updatedPatient) => {
    // Find the index of the updated patient in the patientData array
    const index = patientData.findIndex(patient => patient._id === updatedPatient._id);
    // Create a copy of the patientData array
    const updatedPatientData = [...patientData];
    // Replace the updated patient with the new data
    updatedPatientData[index] = updatedPatient;
    // Update the state to trigger a re-render of the table with the updated data
    setPatientData(updatedPatientData);
  }

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
              {isFDAView ? (
                <th style={{backgroundColor: '#08d3b4'}}>Insurance Number</th>
              ) : isBavariaView ? (
                <th style={{backgroundColor: '#f46f74'}}>Insurance Number</th>
              ) : isAdminView ? (
                <>
                  <th style={{backgroundColor: '#6fabd0'}}>Name</th>
                  <th style={{backgroundColor: '#6fabd0'}}>Patient ID</th>
                  <th style={{backgroundColor: '#6fabd0'}}>Eligible</th>
                  <th style={{backgroundColor: '#6fabd0'}}>Study Participant</th>
                  <th style={{backgroundColor: '#6fabd0'}}>Doses</th>
                </>
              ) : (
                <>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Date of Birth</th>
                  <th>Insurance Number</th>
                  <th>Address</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            
          {patients.filter((patient)=> {
            if (isFDAView || isBavariaView) {
              return patient;
            } else if (isAdminView && patient.name.toLowerCase().includes(nameSearch.toLowerCase()) && patient._id.includes(idSearch) 
            && (filterEligible === false ||filterEligible === patient.isEligible)) {
              return patient;
            }
            else if (patient.name.toLowerCase().includes(nameSearch.toLowerCase()) && patient.insuranceNumber.includes(insuranceSearch) 
            && patient.icdHealthCodes.some(code => code.code.toLowerCase().includes(ICDSearch.toLowerCase()))) { 
              return patient;
            } 
            else if (nameSearch === "" && insuranceSearch === "" && ICDSearch === "") {
              return patient;
            }
          }).map((patient) => {
            return (

              <tr key={patient.id}>
                {isFDAView || isBavariaView ? (
                      <td>{patient.insuranceNumber}</td>
                
                ) : isAdminView ? (
                  <>
                  <td>{patient.name}</td>
                  <td>{patient._id}</td>
                  <td>{patient.isEligible ? 'Yes' : 'No'}</td>
                  <td>{patient.isStudy ? 'Yes' : 'No'}</td>
                  <td>{patient?.doses}</td>
                  </>
                    ) : (
                      <>
                        <td onClick={() => handlePatientClick(patient)}>
                          {patient.name}
                        </td>
                        <td>{patient.age}</td>
                        <td>{patient.dob}</td>
                        <td>{patient.insuranceNumber}</td>
                        <td>{patient.address}</td>
                      </>
                    )}
                  </tr>
                );
              })}

          </tbody>
        </table>
      )}{selectedPatient && (
        <div class="largeView">
        <div class="popup-content">
        <button id="close" onClick={() => setSelectedPatient(null)}>X</button>
          <div class="popup-top">
            <h3 class = "pName"> Patient:<i> <br></br>&emsp; {selectedPatient.name}</i></h3> 
          
            <img class = "profilePic" src = "https://www.unitedway.ca/wp-content/uploads/2017/06/TempProfile.jpg"/> 
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
              <p><strong>Patient ID:</strong> {selectedPatient.uuid}</p>
              <p><strong>Blood Type:</strong> {selectedPatient.bloodType}</p>
            </div>
            <div class="popup-section">
              <h3>Vital Signs</h3>
              <p><strong>Height:</strong> {selectedPatient.height}</p>
              <p><strong>Blood Pressure:</strong> {selectedPatient.bloodPressure}</p>
              <p><strong>Temperature:</strong> {selectedPatient.temperature}</p>
              <p><strong>Oxygen Saturation:</strong> {selectedPatient.oxygenSaturation}</p>
            </div>
            <div class="popup-section">
              <h3>Medical History</h3>
              <p><strong>Current Medications: </strong>
              {selectedPatient.currentMedications.map((medication, index) => (
                  <span key={index}>
                    {medication.medication}
                    {index < selectedPatient.currentMedications.length - 1 ? ", " : ""}
                  </span>
                ))}
              
              </p>
              <p><strong>Family History:</strong> {selectedPatient.familyHistory} </p>
              <p>
                <strong>Allergies:</strong>{" "}
                {selectedPatient.allergies.map((allergy, index) => (
                  <span key={index}>
                    {allergy.allergy}
                    {index < selectedPatient.allergies.length - 1 ? ", " : ""}
                  </span>
                ))}
              </p>

            </div>
            <button className='add-patient' onClick={togglePopup}>
            {selectedPatient.doses < 5 && selectedPatient.isStudy === true ? 'Add Appointment and Dose' : 'Create Appointment'}</button>
            <button className='add-patient' style={{border: '4px solid #FFA500', color: '#FFA500'}} onClick={togglePopupNew}>Edit Patient</button>
          </div>
        </div>
      </div>
      
      )}
      {isOpen && <AddAppointment togglePopup={togglePopup} selectedPatient={selectedPatient}/>}
      {isOpenNew && <EditPatient togglePopup={togglePopupNew} selectedPatient={selectedPatient} onPatientDataUpdate={handlePatientDataUpdate}/>}
    </div>
  );
}

export default DisplayPatientData;
