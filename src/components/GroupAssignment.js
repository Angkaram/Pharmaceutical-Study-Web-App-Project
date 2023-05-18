import useBavaria from '../hooks/useBavaria';
import "./DoctorView.css";
import { useState, useEffect } from 'react';
import StudyResultsPopup from './StudyResults';

function AssignmentPopup({selectedStudy, togglePopup, isFDAView}) {
  const { entities } = useBavaria();
  const [patients, setPatients] = useState([]);
  const [studyID, setStudyID] = useState([]);
  const [drugs, setDrugs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
      async function fetchPatientsAndStudies() {
        const patientList = await entities.patient.list();
        setPatients(patientList.items);
        
        const studyNew = await entities.study.get(selectedStudy._id);
        setStudyID(studyNew._id);
      }
  
      fetchPatientsAndStudies();
  }, [entities.patient]); 

  useEffect(() => {
    async function fetchDrug() {
      const drugList = await entities.drug.list();
      setDrugs(drugList.items);
      setIsLoading(false);
    }

    fetchDrug();
  }, [entities.drug]);

  const [isOpen, setIsOpen] = useState(false);
  const togglePopupResults = () => {
    setIsOpen(!isOpen);
  }
  const handleReportClick = () => {
    togglePopupResults();
  }

  const selectedTreatmentDrug = drugs.filter(drug => drug._id === selectedStudy.realDrug);
  const selectedPlaceboDrug = drugs.filter(drug => drug._id === selectedStudy.placeboDrug);

  const patientsInStudy = patients.filter(patient => patient.assignedStudy === studyID);
  const getPatientListByDrug = (assignedDrug) => {
    if (assignedDrug === "Treatment") {
      const filteredPatients = patientsInStudy.filter(patient => {
        // Check if the patient's assignedDrug is present in the selectedTreatmentDrug.id array
        return selectedTreatmentDrug[0].id.some(drugIdObj => drugIdObj.id === patient.assignedDrug);
      });
      const listPatients = filteredPatients.map(patient => <li key={patient._id}>{patient.name}</li>);

      return (
        <div>
          <h3>{assignedDrug} Patients: </h3>
          <ul>
            {listPatients}
          </ul>
        </div>
      );

    } else {
      const filteredPatients = patientsInStudy.filter(patient => {
        // Check if the patient's assignedDrug is present in the selectedTreatmentDrug.id array
        return selectedPlaceboDrug[0].id.some(drugIdObj => drugIdObj.id === patient.assignedDrug);
      });
      const listPatients = filteredPatients.map(patient => <li key={patient._id}></li>);

      return (
        <div>
          <h3>{assignedDrug} Patients: </h3>
          <ul>
            {listPatients}
          </ul>
        </div>
      );
    }

  }
  
  
  return (
    <div className="largeView">

        <div className="popup-content" style={{borderColor: '#6fabd0'}}>

            <div className="popup-top">
                <h2>{selectedStudy.name} Group Assignment</h2>
                <button id="close" onClick={togglePopup}>X</button>
            </div>
            <div className="popup-middle" style={{ display: "flex", justifyContent: "space-between"}}>
              <div className="popup-section-container" style={{ width: "50%"}}>
                <div className="popup-section" style={{ width: "100%"}}>
                  {getPatientListByDrug('Treatment')}
                </div>
              </div>
              <div className="popup-section-container" style={{ width: "50%"}}>
                <div className="popup-section" style={{ width: "100%"}}>
                  {getPatientListByDrug('Control')}
                </div>
              </div>
            </div>
            <button className='add-patient' style={{border: '4px solid #007bff', color: '#007bff'}} onClick={togglePopupResults}>
              Create Study Report
            </button>
        </div>
        {isOpen && <StudyResultsPopup togglePopup={togglePopupResults} selectedStudy={selectedStudy} patientsInStudy={patientsInStudy} isFDAView={!isFDAView} isBavariaView={false}/>}
    </div>
  )
}

  export default AssignmentPopup;