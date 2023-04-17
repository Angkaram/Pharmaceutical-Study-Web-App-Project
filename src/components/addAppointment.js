import useJaneHopkins from '../hooks/useJaneHopkins';
import "./DoctorView.css";

function AddAppointment({togglePopup, selectedPatient}) {

  const {entities} = useJaneHopkins();

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
      visits: newVisit
    });

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

        <button className='add-patient'onClick = {() => {updatePatient();}}>Create Appointment</button>
      </div>
    </div>
  )
}

export default AddAppointment;