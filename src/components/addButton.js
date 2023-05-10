import { useState } from 'react';
import useJaneHopkins from '../hooks/useJaneHopkins';
import "./DoctorView.css";
import "./ManageStudyView.css";
import DatePicker from 'react-datepicker';

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

function AddPatientButton(togglePopup) {
  const {entities} = useJaneHopkins();
  const [isInsured, setIsInsured] = useState(false);
  const [isEmployed, setIsEmployed] = useState(false);
  const [date, setDate] = useState(null);
  //const [isEligible, setIsEligible] = useState(false);

  const addPatient = async() => {

    // Take allergy input and convert to array
    const allergyInput = document.getElementById("allergies").value;
    const allergyArray = allergyInput.split(" ").map(allergy => ({allergy: allergy}));

    // Take ICD Healthcode input and convert to array
    const icdInput = document.getElementById("ICD").value;
    const icdArray = icdInput.split(" ").map(code => ({code: code }));

    // Take medication input and convert to array
    const medicationInput = document.getElementById("currentMedication").value;
    const medicationArray = medicationInput.split(" ").map(medication => ({medication: medication}));

    // Take boolean input and convert to string
    const currentlyEmployed = document.getElementById("employed").checked ? "True" : "False";
    const currentlyInsured = document.getElementById("insured").checked ? "True" : "False";

    let age = calculateAge(document.getElementById("dob").value);
    console.log(age);

    // Check if the patient is eligible or not
    let bool;
    if (document.getElementById("dob").value === "January 1, 2005" || Number(document.getElementById("dob").value.slice(-4)) < 2005) {
      // Check pregnancy code
      bool = !icdInput.includes("O00–O99");
    } else {
      bool = false;
    }
    
    const addPatientResponse = await entities.patient.add({
      
      // Adds all of this information when creating a patient
      name: document.getElementById("name").value,
      age: Number(age),
      dob: document.getElementById("dob").value,
      insuranceNumber: document.getElementById("insuranceNumber").value,
      address: document.getElementById("address").value,
      height: document.getElementById("height").value,
      weight: document.getElementById("weight").value,
      bloodPressure: document.getElementById("bloodPressure").value,
      temperature: document.getElementById("temperature").value,
      uuid: document.getElementById("uuid").value,
      familyHistory: document.getElementById("familyHistory").value,
      currentMedications: medicationArray,
      allergies:  allergyArray,
      oxygenSaturation: document.getElementById("oxygenSaturation").value,
      icdHealthCodes: icdArray,
      currentlyEmployed: currentlyEmployed,
      currentlyInsured: currentlyInsured,
      isEligible: bool
    },
    {
    aclInput:{
      acl:[
        {
          principal:{
            nodes: ["Bavaria", "FDA"]
          },
          operations:["READ"],
          path: ["dob", "height", "weight", "bloodPressure", 
          "bloodType", "temperature", "oxygenSaturation",
          "uuid", "familyHistory", "currentMedications",
           "allergies", "currentMedications", "currentlyEmployed",
            "currentlyInsured", "icdHealthCodes" ]
        }      
      ]
    }
  }
    );
}
   //console.log(currentlyEmployed);
    //console.log(currentlyInsured);
   //console.log(addPatientResponse);
  
  return (
    <div className="largeView">
    <div className="popup-content">
      
      <div className="popup-top">
        <h3>Add New Patient</h3>
        <button id="close" onClick={togglePopup.handleClose}>X</button>
        
      </div>
      <h3> Patient Name: <input type="text" id="name"></input></h3> 
      
      <div className="popup-middle">
        <div className="popup-section" >
          <h3>General Information</h3>

          <p><b>DOB: </b>
          <DatePicker
            selected = {date}
            onChange={(date => setDate(date))}
            id = "dob"
            dateFormat="MMMM d, yyyy"
          />
          </p>

          <p><b>Insurance Number: </b><input type="text" id = "insuranceNumber"></input></p>
          <p><b>Weight:</b><input type="text" id = "weight"></input></p>
          <p><b>Address: </b><input type="text" id = "address"></input></p>
        </div>
        <div className="popup-section" >
          <h3>Health Information</h3>
          <p><strong>Patient ID:</strong> <input type="text" id = "uuid"></input></p>
          <p><strong>Blood Type:</strong> <input type="text"></input></p>

          <p className='checkbox'><strong className='checkbox-test'>Currently Employed:
            <input type="checkbox" checked = {isEmployed} onChange={()=> setIsEmployed(!isEmployed)} id = "employed"></input>
          </strong></p>

          <p className='checkbox'><strong>Currently Insured:
            <input type="checkbox" checked = {isInsured} onChange={()=> setIsInsured(!isInsured)} id = "insured"></input>
          </strong></p>

        </div>
        <div className="popup-section">
          <h3>Vital Signs</h3>
          <p><strong>Height:</strong> <input type="text" id = "height"></input></p>
          <p><strong>Blood Pressure:</strong> <input type="text" id = "bloodPressure"></input></p>
          <p><strong>Temperature:</strong> <input type="text" id = "temperature"></input></p>
          <p><strong>Oxygen Saturation:</strong> <input type="text" id = "oxygenSaturation"></input></p>
        </div>
        <div className="popup-section">
          <h3>Medical History</h3>
          <p><strong>Current Medications:</strong> <input type="text" id = "currentMedication"></input></p>
          <p><strong>Family History:</strong> <input type="text" id = "familyHistory"></input></p>
          <p><strong>Allergies:</strong> <input type="text" id = "allergies"></input></p>
          <p><strong>ICD Health Code:</strong> <input type="text" id = "ICD"></input></p>
        </div>

      </div>
      <button className='add-patient' onClick={() => {
        addPatient();
        const messageElem = document.createElement('div');
        messageElem.innerText = 'New Patient Added Successfully';
        messageElem.classList.add('message'); // Add CSS class to the message element
        document.body.appendChild(messageElem);
        setTimeout(() => {
            messageElem.remove();
        }, 1000); // Delay message display for 1 second (1000 milliseconds)
        }}>Add/Create Patient</button>
    </div>
  </div>
  )

}

export default AddPatientButton;

/* Original Code:
function AddPatientButton() {
    const {entities} = useJaneHopkins();
  
    const addPatient = async() => {
      const addPatientResponse = await entities.patient.add({
        name: "Demo",
        dob: "Januray 28, 1999",
        insuranceNumber: "259528117",
        address: "8387 North Vernon Dr.La Habra, CA 90631"
      });
      console.log(addPatientResponse);
    }
  
    return (
      <div>
        <button className='addPatientContainer' onClick = {() => {addPatient();}}>
          <div className='addPatientText'>Add Patients</div>
        </button>
      </div>
    );
  }
  export default AddPatientButton;
  */