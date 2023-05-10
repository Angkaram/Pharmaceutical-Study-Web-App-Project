import useJaneHopkins from "../hooks/useJaneHopkins";
import { useState, useEffect } from "react";

// Make a random drug ID (7 digit)
function generateRandomId() {
  const min = 1000000; // Minimum 7 digit number
  const max = 9999999; // Maximum 7 digit number

  // Create random id
  const randomId = Math.floor(Math.random() * (max - min + 1)) + min;

  // Return id as a string
  return randomId.toString();
}

// Assigns drug to patient
function AssignDrug({toggleDrugSelect, selectedStudy}) {
  const { entities } = useJaneHopkins();
  const [drugs, setDrugs] = useState([]); // Drugs array includes all drugs available to FDA
  const [placeboDrugs, setPlaceboDrugs] = useState([]); // Include all placebo drugs available to FDA
  const [realDrugs, setRealDrugs] = useState([]); // Include all real drugs available to FDA
  const [selectedPlacebo, setSelectedPlacebo] = useState(""); // Set placebo drug id (from object)
  const [selectedReal, setSelectedReal] = useState(""); // Set real drug id (from object)

// Gets the list of drugs
  useEffect(() => {
    async function fetchDrugs() {
      const drugList = await entities.drug.list();
      // Filter, only show drugs displayed by the FDA
      setDrugs(drugList.items.filter((drug) => drug.sendFDA));
    }

    fetchDrugs();
  }, [entities.drug]);

  useEffect(() => {

    // Gets a list of placebo drugs
    const placeboDrugs = drugs.filter((drug) => drug.placebo);
    setPlaceboDrugs(placeboDrugs);

    // Gets a list of real drugs
    const realDrugs = drugs.filter((drug) => !drug.placebo);
    setRealDrugs(realDrugs);
  }, [drugs]);

  // Select placebo drug
  const handlePlaceboSelection = (event) => {
    setSelectedPlacebo(event.target.value);
  };

  // Select real drug
  const handleRealSelection = async(event) => {
    setSelectedReal(event.target.value);
  };

  // Submit the selected drugs, assign them to patients
  const handleSubmit = async(event) => {

    // Prevents default submission
    event.preventDefault();

    // Console log for testing
    console.log("Placebo selected:", selectedPlacebo);
    console.log("Real selected:", selectedReal); 

    // Get selected study
    const study = await entities.study.get(selectedStudy._id);

    // Assign drugs to the study
    const updateStudy = await entities.study.update({
      _id: study._id,
      placeboDrug: selectedPlacebo,
      realDrug: selectedReal
    })

    console.log(updateStudy);

    // Get patient ids from the study
    const patientIDs = study.studyPatients.map(patient => patient.id);
    const length = patientIDs.length;

    // Random drug ids are stored here
    const randomDrugIds = [];

    // Loop through all of the patients in study
    for (let i = 0; i < length; i++) {

      // Generate random ID
      const randomId = generateRandomId();

      // Random ID to the array
      randomDrugIds.push(randomId);

      // Get a patient ID from the study
      const id = patientIDs[i];

      // Get the patient object from vendia by using their ID
      const currentPatient = await entities.patient.get(id);

      // Update the patient, assign them a random drug ID
      const updatePatient = await entities.patient.update({
        _id: currentPatient._id,
        assignedDrug: randomId,
        doses: 0
      });

      console.log(updatePatient);
    }

    // This number is important for geting half of the patients placebo and half real
    const half = Math.floor(length / 2);

    // These 2 arrays will store the random drug IDs
    let placeboArray;
    let realArray;

    // Adds some more randomization to drug assignment
    if (Math.random() < 0.5) {
      // First Half of the random drug IDs belong to placebo
      placeboArray = randomDrugIds.slice(0, half).map((id) => ({ id }));
      // Other half belong to real
      realArray = randomDrugIds.slice(half).map((id) => ({ id }));

    } else {
      // First Half of the random drug IDs belong to real
      placeboArray = randomDrugIds.slice(half).map((id) => ({ id }));
      // Other half belong to placebo
      realArray = randomDrugIds.slice(0, half).map((id) => ({ id }));
    }

    //console.log("Placebo Array:", placeboArray);
    //console.log("Real Array:", realArray);

    // Update the placebo drug, assign random IDs for placebo
    const currentPlacebo = await entities.drug.get(selectedPlacebo);
    const updatePlacebo = await entities.drug.update({
      _id: currentPlacebo._id,
      id: placeboArray,
    });

    // Update the real drug, assign random IDs for real
    const currentReal = await entities.drug.get(selectedReal);
    const updateReal =  await entities.drug.update({
      _id: currentReal._id,
      id: realArray
    })
    

  };

  return (
    <div className="largeView">
      <div className="popup-content" style={{borderColor:'#08d3b4', paddingRight:'40px', paddingLeft:'40px'}}>

        <div className="popup-top">
            <h3>Choose Available Drugs to Assign</h3>
            <button style={{borderColor:'#08d3b4'}} id="close" onClick={toggleDrugSelect}>X</button>
        </div>

        <div className="drug-selection">

          <div>
            <label className="drug-label" htmlFor="placeboSelect">Placebo Drug: </label>
            <select className='drug-dropdown' id="placeboSelect" onChange={handlePlaceboSelection}>
              <option value="">Select</option>
              {placeboDrugs.map((drug) => (
                <option key={drug._id} value={drug._id}>
                  {drug.batchNumber}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="drug-label" htmlFor="realSelect">Real Drug: </label>
            <select  className='drug-dropdown' id="realSelect" onChange={handleRealSelection}>
              <option value="">Select</option>
              {realDrugs.map((drug) => (
                <option key={drug._id} value={drug._id}>
                  {drug.batchNumber}
                </option>
              ))}
            </select>
          </div>

        </div>

        <button className='add-patient' style={{marginTop:'30px'}} onClick={handleSubmit}>Confirm/Assign Drug Selection</button>
      </div>
    </div>
  );
}

export default AssignDrug;
