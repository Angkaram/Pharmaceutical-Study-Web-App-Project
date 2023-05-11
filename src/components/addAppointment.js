import useJaneHopkins from '../hooks/useJaneHopkins';
import "./DoctorView.css";
import { useState } from 'react';

function AddAppointment({togglePopup, selectedPatient}) {

  const {entities} = useJaneHopkins();
  const [currentDose, setCurrentDose] = useState(1);
  const [patientData, setPatientData] = useState(selectedPatient);

  const updatePatient = async() => {
    const patient = await entities.patient.get(selectedPatient._id);

    const newVisit = {
      patient: patient.name,
      dateTime: document.getElementById("dateTime").value,
      notes: document.getElementById("notes").value,
      hivViralLoad: document.getElementById("hivViralLoad").value,
    }

    console.log(newVisit);

    const updated = await entities.patient.update({
      _id: selectedPatient._id,
      visits: newVisit,
      doses: currentDose // use current dose number instead of 1
    });

    // increment dose number if it's less than 5
    if (currentDose < 5) {
      setCurrentDose(currentDose + 1);
    }

    setPatientData(updated);
    
    console.log(`Dose ${currentDose} applied`);
    console.log(updated);
  }

  return (
    <div className="largeView">
    <div className="add-appt-content">
    
      <div className="popup-top">
        <button id="closeAppt" onClick={togglePopup}>X</button>
      </div>

        <div className="add-appt-section">
          <h3>Appointment Details</h3>
          <p><strong>Selected Patient:</strong> {selectedPatient.name}</p>
          <p><strong>Date:</strong> <input type="text" placeholder="Year,Month,Day" id="dateTime"></input></p>
          <p><strong>Notes:</strong> <input type="text" id="notes"></input></p>
          <p><strong>HIV Viral Load:</strong> <input type="text" id="hivViralLoad"></input></p>
        </div>

        <button className='add-patient'onClick = {() => {updatePatient();}}>
          {selectedPatient.isStudy === true ? `Apply Dose ${selectedPatient.doses + 1}` : 'Create Appointment'}
        </button>
      </div>
    </div>
  )
}

export default AddAppointment;