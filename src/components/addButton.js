import useJaneHopkins from '../hooks/useJaneHopkins';

function AddPatientButton() {
  const { entities } = useJaneHopkins();
  const addPatient = async () => {
    const addPatientResponse = await entities.patient.add({
      name: "Billy The Patient",
      dob: "Januray 17, 2000",
      insuranceNumber: "114528972",
    });
    console.log(addPatientResponse);
  };

  return (
      <AddPatientButton addPatient={addPatient} />
  );
}
export default AddPatientButton;