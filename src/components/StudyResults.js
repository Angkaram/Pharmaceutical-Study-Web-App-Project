import useBavaria from '../hooks/useBavaria';
import "./DoctorView.css";
import { useState, useEffect } from 'react';
import { PDFDownloadLink, Document } from '@react-pdf/renderer';
import PDFDocument from './PDFDocument';

function StudyResultsPopup({selectedStudy, togglePopup, isFDAView, isBavariaView, isAdminView}) {
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

  const sendReport = async() => {
    try {
      const sent = await entities.study.update({
          _id: selectedStudy._id,
          isReportSent: true
      });
      console.log("Data updated successfully!");
      window.location.reload();
      
    } catch (error) {
      console.log("Error updating data:", error);
    }
  }

  const releaseResults = async() => {
    try {
        const released = await entities.study.update({
            _id: selectedStudy._id,
            isResultsReleased: true
        });
        console.log("Data updated successfully!");
        window.location.reload();
        
    } catch (error) {
        console.log("Error updating data:", error);
    }
  }

  const patientsInStudy = patients.filter(patient => patient.assignedStudy === studyID);
  const selectedTreatmentDrug = drugs.filter(drug => drug._id === selectedStudy.realDrug);
  const treatmentPatients = patientsInStudy.filter(patient => {
    // Check if the patient's assignedDrug is present in the selectedTreatmentDrug.id array
    return selectedTreatmentDrug[0].id.some(drugIdObj => drugIdObj.id === patient.assignedDrug);
  });
  const selectedPlaceboDrug = drugs.filter(drug => drug._id === selectedStudy.placeboDrug);
  const controlPatients = patientsInStudy.filter(patient => {
    // Check if the patient's assignedDrug is present in the selectedTreatmentDrug.id array
    return selectedPlaceboDrug[0].id.some(drugIdObj => drugIdObj.id === patient.assignedDrug);
  });
  const getPatientListByDrug = (assignedDrug) => {
    if (assignedDrug === "Treatment") {
      const filteredPatients = treatmentPatients;
      const listPatients = filteredPatients.map(patient =>
        <div>
          <h3 key = {patient._id} > Patient ID: {patient._id} </h3>
          <p><strong>DOB: </strong>{patient.dob}</p>
          <p><strong>Height: </strong>{patient.height}</p>
          <p><strong>Weight: </strong>{patient.weight}</p>
          <p><strong>BloodType: </strong>{patient.bloodType}</p>
          <p><strong>Blood Pressure: </strong>{patient.bloodPressure}</p>
          <p><strong>Temperature: </strong>{patient.temperature}</p>
          <p><strong>Oxygen Saturation: </strong>{patient.oxygenSaturation}</p>
          <p><strong>Doses: </strong>{patient.doses}</p>
          <p><strong>Allergies: </strong>{" "}
            {patient.allergies.map((allergy, index) => (
              <span key={index}>
                {allergy.allergy}
                {index < patient.allergies.length - 1 ? ", " : ""}
              </span>
            ))}
          </p>
          <p><strong>Family History: </strong>{patient.familyHistory}</p>
          <p><strong>Current Medications: </strong>{" "}
            {patient.currentMedications.map((medication, index) => (
              <span key={index}>
                {medication.medication}
                {index < patient.currentMedications.length - 1 ? ", " : ""}
              </span>
            ))}
          </p>
          <p><strong>Visits: </strong></p>
          {patient.visits ? (
            patient.visits.map((visit, index) => (
              <div key={index}>
                <p style={{paddingLeft: '1em'}}>Date: {visit.dateTime}</p>
                <p style={{paddingLeft: '1em'}}>Notes: {visit.notes}</p>
                <p style={{paddingLeft: '1em'}}>HIV Viral Load: {visit.hivViralLoad}</p>
                <hr />
              </div>
            ))
          ) : (
            <p>No visits available.</p>
          )}
        </div>
      );

      return (
        <div>
          <h3>{assignedDrug} Patients: </h3>
          <div className='studyResults'>
            {listPatients}
          </div>
        </div>
      );

    } else {
      const filteredPatients = controlPatients;
      const listPatients = filteredPatients.map(patient => 
        <div>
          <h3 key = {patient._id} > Patient ID: {patient._id} </h3>
          <p><strong>DOB: </strong>{patient.dob}</p>
          <p><strong>Height: </strong>{patient.height}</p>
          <p><strong>Weight: </strong>{patient.weight}</p>
          <p><strong>BloodType: </strong>{patient.bloodType}</p>
          <p><strong>Blood Pressure: </strong>{patient.bloodPressure}</p>
          <p><strong>Temperature: </strong>{patient.temperature}</p>
          <p><strong>Oxygen Saturation: </strong>{patient.oxygenSaturation}</p>
          <p><strong>Doses: </strong>{patient.doses}</p>
          <p><strong>Allergies: </strong>{" "}
            {patient.allergies ?
              patient.allergies.map((allergy, index) => (
                <span key={index}>
                  {allergy.allergy}
                  {index < patient.allergies.length - 1 ? ", " : ""}
                </span>
              ))
              : "No allergies found"
            }
          </p>
          <p><strong>Family History: </strong>{patient.familyHistory}</p>
          <p><strong>Current Medications: </strong>{" "}
            {patient.currentMedications && patient.currentMedications.length > 0 ? (
              patient.currentMedications.map((medication, index) => (
                <span key={index}>
                  {medication.medication}
                  {index < patient.currentMedications.length - 1 ? ", " : ""}
                </span>
              ))
            ) : (
              <span>No current medications</span>
            )}
          </p>
          <p><strong>Visits: </strong></p>
          {patient.visits ? (
            patient.visits.map((visit, index) => (
              <div key={index}>
                <p style={{paddingLeft: '1em'}}>Date: {visit.dateTime}</p>
                <p style={{paddingLeft: '1em'}}>Notes: {visit.notes}</p>
                <p style={{paddingLeft: '1em'}}>HIV Viral Load: {visit.hivViralLoad}</p>
                <hr />
              </div>
            ))
          ) : (
            <p>No visits available.</p>
          )}
        </div>
      );

      return (
        <div>
          <h3>{assignedDrug} Patients: </h3>
          <div className='studyResults'>
            {listPatients}
          </div>
        </div>
      );
    }

  }

  let color;
    if (isFDAView) {
        color = '#08d3b4';
    } else if (isAdminView) {
      color = '#6fabd0';
    } else {
        color = '#f46f74';
    }
  
  return (
    <div className='studyResultsPopup'>
      <div className="largeView">

          <div className="popup-content" style={{borderColor: color}}>

              <div className="popup-top">
                  <h2>{selectedStudy.name} Study Results</h2>
                  <button id="close" onClick={togglePopup} style={{borderColor: color}}>X</button>
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
              <div style={{ display: "flex", justifyContent: 'center' }}>
              {selectedStudy && !isFDAView && !isBavariaView && (selectedStudy.isReportSent ? (
                  <div className="add-patient" style={{ border: "4px solid #007bff", color: "#007bff", backgroundColor: "#ececec" }}>
                    Report Sent To FDA
                  </div>
                ) : (
                  <button className="add-patient" style={{ border: "4px solid #007bff", color: "#007bff" }} onClick={sendReport}>
                    Send Report To FDA
                  </button>
                )
              )}
              {selectedStudy && isFDAView && !isBavariaView && (selectedStudy.isResultsReleased ? (
                  <div className="add-patient" style={{ border: "4px solid #007bff", color: "#007bff", backgroundColor: "#ececec" }}>
                    Report Sent To Bavaria
                  </div>
                ) : (
                  <button className='add-patient' style={{border: '4px solid #007bff', color: '#007bff'}} onClick={() => {releaseResults();}}>
                    Send Report To Bavaria
                  </button>
                )
              )}      
              {isBavariaView && (
                <div style={{display: 'flex', flexDirection: "row", justifyContent: 'center'}}>
                  <button className='add-patient' style={{border: '4px solid #007bff', color: '#007bff', marginRight: '30px'}} onClick={handleReportClick}>Generate Report</button>
                  {isOpen && (
                      <PDFDownloadLink document={<PDFDocument treatment={treatmentPatients} control={controlPatients} />} fileName="study-report.pdf" className='add-patient' style={{border: '4px solid #00FF00', color: '#00FF00', marginLeft: '30px'}}>
                        {({ blob, url, loading, error }) => (loading ? 'Generating report...' : 'Download PDF')}
                      </PDFDownloadLink>
                  )}
                </div>
              )}
              </div>
          </div>
      </div>
    
    </div>
  )
}

  export default StudyResultsPopup;