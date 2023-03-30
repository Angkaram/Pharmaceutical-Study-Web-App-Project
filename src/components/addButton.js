import useJaneHopkins from '../hooks/useJaneHopkins';
import "./DoctorView.css";

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