import useJaneHopkins from "../hooks/useJaneHopkins";
import { useState, useEffect } from "react";

function AssignDrug({toggleDrugSelect, selectedStudy}) {
  const { entities } = useJaneHopkins();
  const [drugs, setDrugs] = useState([]);
  const [placeboDrugs, setPlaceboDrugs] = useState([]);
  const [realDrugs, setRealDrugs] = useState([]);
  const [selectedPlacebo, setSelectedPlacebo] = useState("");
  const [selectedReal, setSelectedReal] = useState("");

  useEffect(() => {
    async function fetchDrugs() {
      const drugList = await entities.drug.list();
      setDrugs(drugList.items);
    }

    fetchDrugs();
  }, [entities.drug]);

  useEffect(() => {
    const placeboDrugs = drugs.filter((drug) => drug.placebo);
    setPlaceboDrugs(placeboDrugs);

    const realDrugs = drugs.filter((drug) => !drug.placebo);
    setRealDrugs(realDrugs);
  }, [drugs]);

  const handlePlaceboSelection = (event) => {
    setSelectedPlacebo(event.target.value);
  };

  const handleRealSelection = async(event) => {
    setSelectedReal(event.target.value);
  };



  const handleSubmit = async(event) => {
    event.preventDefault();
    console.log("Placebo selected:", selectedPlacebo);
    console.log("Real selected:", selectedReal);
    

    const study = await entities.study.get(selectedStudy._id);

    const updateStudy = await entities.study.update({
      _id: study._id,
      placeboDrug: selectedPlacebo,
      realDrug: selectedReal
    })

    console.log(updateStudy);

    const patientIDs = study.studyPatients.map(patient => patient.id);
    const length = patientIDs.length;

    for (let i = 0; i < length; i++) {
      const assignedDrug = i < length/2 ? selectedPlacebo : selectedReal;
      const id = patientIDs[i];

      const currentPatient = await entities.patient.get(id);

      const updatePatient = await entities.patient.update({
        _id: currentPatient._id,
        assignedDrug: assignedDrug,
        doses: 0
      });
      console.log(updatePatient);
    }
    

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
                  {drug.id}
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
                  {drug.id}
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
