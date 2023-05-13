import useJaneHopkins from '../hooks/useJaneHopkins';
import "./DoctorView.css";
import { css } from "@emotion/react";
import { ClipLoader } from "react-spinners";
import { useState } from 'react';

function AddAppointment({togglePopup, selectedPatient}) {

  const [isLoading, setIsLoading] = useState(true);

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

  async function handleButtonClick() {
    await updatePatient();
    window.location.reload();
  };

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

    // get id
    const studyID = selectedPatient.assignedStudy;

    // Get study object 
    const study = await entities.study.get(studyID);

    // the patients assigned to the study (array)
    const studyPatients = study.studyPatients.map(patient => patient.id);
    const length = studyPatients.length;
    let allPatientsCompleted;

    // Loop through all of the patients in study
    for (let i = 0; i < length; i++) {

      // Get a patient ID from the study
      const id = studyPatients[i];

      // Get the patient object from vendia by using their ID
      const currentPatient = await entities.patient.get(id);

      // if all patients have 5 doses, true for completed
      if (currentPatient.doses === 5)
      {
        allPatientsCompleted = true;
      }
      else {
        allPatientsCompleted = false;
        break;
      }
    };
    
    // If all patients have completed, update study and patient statuses
    if (allPatientsCompleted) {
      // Mark all patients in the study as no longer in a study, and thus Eligible again
      const updatePatients = studyPatients.map(patient => {
        return entities.patient.update({
          _id: patient._id,
          isStudy: false,
          isEligible: true,
        });
      });
      //await Promise.all(updatePatients);
      console.log("Study patients now eligible again");
    
      const study = await entities.study.get(patient.assignedStudy);

      // Update the study status to "Completed"
      const updatedStudy = await entities.study.update({
        _id: study._id,
        status: "Completed",
      });
      console.log("Study completed:", updatedStudy);
    }
    
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
          <button className='add-patient'onClick = {() => {updatePatient(); handleButtonClick();
            const messageElem = document.createElement('div');
            messageElem.innerText = `Dose ${givenDose} Added, page reloading...`;
            messageElem.classList.add('message'); // Add CSS class to the message element
            document.body.appendChild(messageElem);
            setTimeout(() => {
                messageElem.remove();
            }, 1000); // Delay message display for 1 second (1000 milliseconds)
        }}>Apply Dose {givenDose}</button>
        ):
          <button className='add-patient'onClick = {() => {updatePatient();
            const messageElem = document.createElement('div');
            messageElem.innerText = `New Appointment Created`;
            messageElem.classList.add('message'); // Add CSS class to the message element
            document.body.appendChild(messageElem);
            setTimeout(() => {
                messageElem.remove();
            }, 1000); // Delay message display for 1 second (1000 milliseconds)
          }}>Create Appointment</button>
        }
      </div>
    </div>
  )
}

export default AddAppointment;