import useJaneHopkins from '../hooks/useJaneHopkins';
import "./loginprompt.css";

function AddPatientButton() {
    const {entities} = useJaneHopkins();
    const addPatient = async() => {
      const addPatientResponse = await entities.patient.add({
        name: "Billy The Patient",
        dob: "Januray 17, 2000",
        insuranceNumber: "114528972",
      });
      console.log(addPatientResponse);
    }
    return (
      <button className='addPatientContainer'onClick={() => {
         addPatient(); }}>
      </button>
    );
  }
  export default AddPatientButton;