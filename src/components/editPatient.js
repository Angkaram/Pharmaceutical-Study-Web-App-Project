import useJaneHopkins from '../hooks/useJaneHopkins';
import "./DoctorView.css";
import { useState, useEffect } from 'react';

function EditPatient({togglePopup, selectedPatient}) {

  const {entities} = useJaneHopkins();
  const [patientData, setPatientData] = useState(selectedPatient);

  const [name, setName] = useState(selectedPatient.name);
  const [dob, setDob] = useState(selectedPatient.dob);
  const [insuranceNumber, setInsuranceNumber] = useState(selectedPatient.insuranceNumber);
  const [weight, setWeight] = useState(selectedPatient.weight);
  const [address, setAddress] = useState(selectedPatient.address);
  const [uuid, setUuid] = useState(selectedPatient.uuid);
  const [height, setHeight] = useState(selectedPatient.height);
  const [bloodType, setBloodType] = useState(selectedPatient.bloodType);
  const [bloodPressure, setBloodPressure] = useState(selectedPatient.bloodPressure);
  const [temperature, setTemperature] = useState(selectedPatient.temperature);
  const [oxygenSaturation, setOxygenSaturation] = useState(selectedPatient.oxygenSaturation);
  const [currentMedication, setCurrentMedication] = useState(selectedPatient.currentMedications?.map(med => med.medication).join(' ') || '');
  const [familyHistory, setFamilyHistory] = useState(selectedPatient.familyHistory || '');
  const [allergies, setAllergies] = useState(selectedPatient.allergies?.map(allergy => allergy.allergy).join(' ') || '');
  const [icd, setIcd] = useState(selectedPatient.icdHealthCodes?.map(code => code.code).join(' ') || '');
  const [isInsured, setIsInsured] = useState(false);
  const [isEmployed, setIsEmployed] = useState(false);

  const allergyInput = document.getElementById("allergies")?.value;
  const allergyArray = allergyInput ? allergyInput.split(" ").filter(Boolean).map(allergy => ({allergy: allergy})) : [];

  const icdInput = document.getElementById("ICD")?.value;
  const icdArray = icdInput ? icdInput.split(" ").filter(Boolean).map(code => ({code: code })) : [];

  const medicationInput = document.getElementById("currentMedication")?.value;
  const medicationArray = medicationInput ? medicationInput.split(" ").filter(Boolean).map(medication => ({medication: medication})) : [];

  const currentlyEmployed = document.getElementById("employed")?.checked ? "True" : "False";
  const currentlyInsured = document.getElementById("insured")?.checked ? "True" : "False";

  async function handleButtonClick() {
    await editPatientData();
    window.location.reload();
  };
  
  useEffect(() => {
    setIsInsured(selectedPatient.currentlyInsured === "True");
    setIsEmployed(selectedPatient.currentlyEmployed === "True");
  }, [selectedPatient]);
  

  const editPatientData = async() => {

    // Check if the patient is eligible or not
    let bool;
    if (document.getElementById("dob").value === "January 1, 2005" || Number(document.getElementById("dob").value.slice(-4)) < 2005) {
      bool = !icdInput.includes("O00–O99");
    } else {
      bool = false;
    }

    // Function calculates a user's age
    function calculateAge(dob) {
      
      // Convert string to a date object
      const birthday = new Date(dob);
      // Get current date as date object
      const currentDate = new Date();

      // "Subtract" 2 dates, get the age in milliseconds
      const ageInMilliseconds = currentDate - birthday;

      // Convert age in milliseconds to years 
      const ageInYears = Math.floor(ageInMilliseconds / (365.25 * 24 * 60 * 60 * 1000));

      // Return age in years
      return ageInYears;
    }

    let age = calculateAge(document.getElementById("dob").value);

    // TODO: If a patient's ICD healthcodes are deleted using the edit button, they will not appear in searches due to the array being empty

    const updated = await entities.patient.update({
      _id: selectedPatient._id,
      name: document.getElementById("name").value,
      dob: document.getElementById("dob").value,
      age: Number(age),
      insuranceNumber: document.getElementById("insuranceNumber").value,
      weight: document.getElementById("weight").value,
      address: document.getElementById("address").value,
      uuid: document.getElementById("uuid").value,
      bloodType: document.getElementById("bloodType").value,
      height: document.getElementById("height").value,
      bloodPressure: document.getElementById("bloodPressure").value,
      temperature: document.getElementById("temperature").value,
      oxygenSaturation: document.getElementById("oxygenSaturation").value,
      currentMedications: medicationArray,
      familyHistory: document.getElementById("familyHistory").value,
      allergies:  allergyArray,
      icdHealthCodes: icdArray,
      currentlyEmployed: currentlyEmployed,
      currentlyInsured: currentlyInsured,
      isEligible: bool
    });

    console.log(currentlyEmployed);
    console.log(currentlyInsured);
    console.log(updated);

    setPatientData(updated);
}

  return (
    <div className="largeView">
    <div className="add-appt-content">
    
      <div className="popup-top">
        <button id="closeAppt" onClick={togglePopup}>X</button>
      </div>

        <div className="popup-top">
          <h3> Patient Name: <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} style={{width: '100%'}}></input></h3>
        </div>
        <div class="popup-middle">
          <div class="popup-section">
            <h3>General Information</h3>
            <p><b>DOB: </b><input type="text" id = "dob" value={dob} onChange={e => setDob(e.target.value)} style={{width: '100%'}}></input></p>
            <p><b>Insurance Number: </b><input type="text" id = "insuranceNumber" value={insuranceNumber} onChange={e => setInsuranceNumber(e.target.value)} style={{width: '100%'}}></input></p>
            <p><b>Weight:</b><input type="text" id = "weight" value={weight} onChange={e => setWeight(e.target.value)} style={{width: '100%'}}></input></p>
            <p><b>Address: </b><input type="text" id = "address" value={address} onChange={e => setAddress(e.target.value)} style={{width: '100%'}}></input></p>
          </div>
          <div class="popup-section">
            <h3>Health Information</h3>
            <p><strong>Patient ID:</strong> <input type="text" id = "uuid" value={uuid} onChange={e => setUuid(e.target.value)} style={{width: '100%'}}></input></p>
            <p><strong>Blood Type:</strong> <input type="text" id = "bloodType" value={bloodType} onChange={e => setBloodType(e.target.value)} style={{width: '100%'}}></input></p>
          </div>
          <div class="popup-section">
            <h3>Vital Signs</h3>
            <p><strong>Height:</strong> <input type="text" id = "height" value={height} onChange={e => setHeight(e.target.value)} style={{width: '100%'}}></input></p>
            <p><strong>Blood Pressure:</strong> <input type="text" id = "bloodPressure" value={bloodPressure} onChange={e => setBloodPressure(e.target.value)} style={{width: '100%'}}></input></p>
            <p><strong>Temperature:</strong> <input type="text" id = "temperature" value={temperature} onChange={e => setTemperature(e.target.value)} style={{width: '100%'}}></input></p>
            <p><strong>Oxygen Saturation:</strong> <input type="text" id = "oxygenSaturation" value={oxygenSaturation} onChange={e => setOxygenSaturation(e.target.value)} style={{width: '100%'}}></input></p>
          </div>
          <div class="popup-section">
            <h3>Medical History</h3>
            <p><strong>Current Medications:</strong> <input type="text" id = "currentMedication" value={currentMedication} onChange={e => setCurrentMedication(e.target.value)} style={{width: '100%'}}></input></p>
            <p><strong>Family History:</strong> <input type="text" id = "familyHistory" value={familyHistory} onChange={e => setFamilyHistory(e.target.value)} style={{width: '100%'}}></input></p>
            <p><strong>Allergies:</strong> <input type="text" id = "allergies" value={allergies} onChange={e => setAllergies(e.target.value)} style={{width: '100%'}}></input></p>
            <p><strong>ICD Health Code:</strong> <input type="text" id = "ICD" value={icd} onChange={e => setIcd(e.target.value)} style={{width: '100%'}}></input></p>
          </div>
          <div class="popup-section">
            <h3>Insurance & Employment Details</h3>
            <p className='checkbox'><strong className='checkbox-test'>Currently Employed:<input type="checkbox" id="employed" checked={isEmployed} onChange={e => setIsEmployed(e.target.checked)} /></strong></p>
            <p className='checkbox'><strong>Currently Insured:<input type="checkbox" id="insured" checked={isInsured} onChange={e => setIsInsured(e.target.checked)} /></strong></p>
          </div>
        </div>
        <button className='add-patient' onClick={() => {editPatientData(); handleButtonClick();}}>Save</button>
      </div>
    </div>
  )
}

export default EditPatient;