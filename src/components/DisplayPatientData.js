import useJaneHopkins from '../hooks/useJaneHopkins';
import { useEffect, useState } from 'react';

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

// the code below spams all the data into the page rather than based on the ID (singular patient)
/*
function DisplayPatientData({}) {
    const { entities } = useJaneHopkins();
    const [patients, setPatients] = useState([]);
  
    useEffect(() => {
      async function fetchPatients() {
        const patientList = await entities.patient.list();
        setPatients(patientList.items);
      }
  
      fetchPatients();
    }, [entities.patient]);
  
    return (
      <div>
        {patients.map((patient) => (
          <div key={patient.id}>
            <h2>{patient.name}</h2>
            <p>Date of Birth: {patient.dob}</p>
            <p>Insurance Number: {patient.insuranceNumber}</p>
            <p>Weight: {patient.weight}</p>
          </div>
        ))}
      </div>
    );
  }
*/

  export default DisplayPatientData;