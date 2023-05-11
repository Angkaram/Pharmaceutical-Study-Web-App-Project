import useJaneHopkins from '../hooks/useJaneHopkins';
import "./DoctorView.css";

function AddAppointment({togglePopup, selectedPatient}) {

  const {entities} = useJaneHopkins();

  // Current amount of doses patient has
  let currentDose = selectedPatient.doses;

  // Dose the patient will be given
  let givenDose = currentDose + 1;

  // Can we give doses to the patient?
  let canGiveDoses;

  // Need patient to be in study and to have less than 5 doses
  if (selectedPatient.isStudy === true && selectedPatient.doses < 5) {
    canGiveDoses = true;
  } else {
    canGiveDoses = false;
  }

  const updatePatient = async() => {
    const patient = await entities.patient.get(selectedPatient._id);

    // Create a visit array
    const newVisit = {
      patient: patient.name,
      dateTime: document.getElementById("dateTime").value,
      notes: document.getElementById("notes").value,
      hivViralLoad: document.getElementById("hivViralLoad").value,
    }

    console.log(newVisit);

    // Update the patient
    const updated = await entities.patient.update({
      _id: selectedPatient._id,
      visits: newVisit,
      // If we can give doses, doses is added to array, otherwise it will not be added
      ...(canGiveDoses === true
      ? { doses: givenDose }
      : {})
    });
    
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

        {canGiveDoses === true ? (
          <button className='add-patient'onClick = {() => {updatePatient();}}>Apply Dose {givenDose}</button>
        ):
          <button className='add-patient'onClick = {() => {updatePatient();}}>Create Appointment</button>
        }
      </div>
    </div>
  )
}

export default AddAppointment;