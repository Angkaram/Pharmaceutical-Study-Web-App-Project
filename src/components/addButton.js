import useJaneHopkins from '../hooks/useJaneHopkins';
import "./DoctorView.css";

function AddPatientButton() {
    const {entities} = useJaneHopkins();
  
    const addPatient = async() => {
      const addPatientResponse = await entities.patient.add({
        name: "Please Work",
        dob: "Januray 17, 2000",
        insuranceNumber: "259528117",
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