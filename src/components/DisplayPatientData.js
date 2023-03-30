import useJaneHopkins from '../hooks/useJaneHopkins';
import { useEffect, useState } from 'react';
import { css } from "@emotion/react";
import { ClipLoader } from "react-spinners";
import "./DoctorView.css";

// the code below puts all the data into a table rather than based on the ID (singular patient)
function DisplayPatientData({searchTerm}) {
  const { entities } = useJaneHopkins();
  const [patients, setPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
              return patient
            } else if (searchTerm === "") {
              return patient;
            }
          }).map((patient) => {
            return (
              <tr key={patient.id}>
                <td>{patient.name}</td>
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
    </div>
  );
}

export default DisplayPatientData;

/*
function DisplayPatientData({ patientId }) { // patient ID from Vendia can be passed in
  const { entities } = useJaneHopkins();
  const [patient, setPatient] = useState();

  useEffect(() => {
    const fetchPatientData = async () => { // fetch request based on ID
      const patientData = await entities.patient.get(patientId);
      setPatient(patientData);
    };

    fetchPatientData();
  }, [entities.patient, patientId]);
    
  // display relevant info
  return (
    <div> 
      <h3>Patient: {patient?.name}</h3>
      <p>DOB: {patient?.dob}</p>
      <p>Insurance Number: {patient?.insuranceNumber}</p>
      <p>Weight: {patient?.weight}</p>
    </div>
  );
}
*/