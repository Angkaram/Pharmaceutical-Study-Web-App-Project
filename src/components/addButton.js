// Button that adds a patient to Jane Hopkins in Vendia, work in progress

import useJaneHopkins from '../hooks/useJaneHopkins';
import "./loginprompt.css";

function AddPatientButton() {
    const {entities} = useJaneHopkins();
  
    const addPatient = async() => {
      const addPatientResponse = await entities.patient.add({
        name: "Billy",
        dob: "Januray 17, 2000",
        insuranceNumber: "114528972",
      });
      console.log(addPatientResponse);
    }
  
    return (

      <div className='container'>
        <button className = "login-button" onClick = {() => {
          addPatient();
        }}>Add patient</button>
      </div>


    );
  }
  export default AddPatientButton;