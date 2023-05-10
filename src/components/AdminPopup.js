import useJaneHopkins from '../hooks/useJaneHopkins';
import { useEffect, useState } from 'react';
import DisplayStudyPatients from './DisplayStudyPatient';
import AssignDrug from './ChooseStudyDrug';
import AssignmentPopup from './GroupAssignment';
import StudyResultsPopup from './StudyResults';

function AdminPopup({selectedStudy, togglePopup, isFDAView}) {
    const { entities } = useJaneHopkins();
    const [patients, setPatients] = useState([]);

    const [isDrugOpen, setIsDrugOpen] = useState(false);
    const toggleDrugSelect = () => {
        setIsDrugOpen(!isDrugOpen);
    }

    const [isOpen, setIsOpen] = useState(false);
    const togglePopupNew = () => {
        setIsOpen(!isOpen);
    }

    useEffect(() => {
        async function fetchPatients() {
            const patientList = await entities.patient.list();
            setPatients(patientList.items);

            const studyNew = await entities.study.get(selectedStudy._id);
            setStudyID(studyNew._id);
        }
    
        fetchPatients();
        }, [entities.patient]);

    let hasPatient;
    if (selectedStudy.studyPatients === null) {
        hasPatient = false;
    } else {
        hasPatient = true;
    }
    
    const addRandomPatients = async() => {
        const study = await entities.study.get(selectedStudy._id);
        const studyID = study._id;

        const eligiblePatients = patients.filter(patient => patient.isEligible);
        //console.log(eligiblePatients);
        const x = study.maxPatients;

        eligiblePatients.sort(() => Math.random() - 0.5);
        const studyPatients = eligiblePatients.slice(0,x);

        for (const selectedPatient of studyPatients) {
            const patient = await entities.patient.get(selectedPatient._id);

            const updatePatient = await entities.patient.update({
                _id: patient._id,
                isStudy: true,
                isEligible: false,
                assignedStudy: studyID
            })
            console.log(updatePatient);
        }   

        const studyPatientIds = studyPatients.map(patient => patient._id);
        const studyArray = studyPatientIds.map(id => ({id: id }));

        console.log(studyPatientIds);

        const updated = await entities.study.update({
            _id: selectedStudy._id,
            studyPatients: studyArray
        });

        console.log(updated);
    }

    const notifyFDA = async() => {
        //const study = await entities.study.get(selectedStudy._id);

        const update = await entities.study.update({
            _id: selectedStudy._id,
            isFDANotified: true
        });
    }

    const sendAssignment = async() => {
        const sent = await entities.study.update({
            _id: selectedStudy._id,
            isAssignmentSent: true
        });
    }

    const releaseResults = async() => {
        const released = await entities.study.update({
            _id: selectedStudy._id,
            isResultsReleased: true
        });
    }

    const [studyID, setStudyID] = useState([]);
    const patientsInStudy = patients.filter(patient => patient.assignedStudy === studyID);
    const [isOpenResults, setIsOpenResults] = useState(false);
    const togglePopupResults = () => {
        setIsOpenResults(!isOpenResults);
    }

    let color;
    if (isFDAView) {
        color = '#08d3b4';
    } else {
        color = '#6fabd0';
    }

    // for the Approve and Cancel Button on FDA Popup
    const [isFdaAgreed, setIsFdaAgreed] = useState(false);
    const [studyData, setStudyData] = useState(selectedStudy); 
    const approveStudy = async() => {
        const study = await entities.study.get(selectedStudy._id);
      
        let updated = null;
      
        if (study.isBavariaAgreed) {
          updated = await entities.study.update({
            _id: study._id,
            isFdaAgreed: true,
            status: "Approved"
          });
        } else {
          updated = await entities.study.update({
            _id: study._id,
            isFdaAgreed: true
          });
        }
      
        setStudyData(updated);
        console.log("Approve Study Button from the FDA was clicked");
      }      
    useEffect(() => {
        setIsFdaAgreed(selectedStudy.isBavariaAgreed === "True");
    }, [selectedStudy]);
    // to make the page reload once data is input into the system
    async function handleButtonClick() {
        await approveStudy();
        window.location.reload();
    };

    const cancelStudy = async() => {
        const study = await entities.study.get(selectedStudy._id);
      
        const updated = await entities.study.update({
        _id: study._id,
        isFdaAgreed: false,
        isBavariaAgreed: false,
        start: "Cancelled",
        end: "Cancelled",
        maxPatients: 0,
        status: "Cancelled"
        });
      
        setStudyData(updated);
    }
    // to make the page reload once data is input into the system
    async function handleCancelButtonClick() {
        await cancelStudy();
        window.location.reload();
    };
    // end of FDA approval and cancel button

    return (
        <div className="largeView">

            <div className="popup-content" style={{borderColor:color}}>

                <div className="popup-top">
                    <h3>{selectedStudy.name}</h3>
                    <button style={{borderColor:color}} id="close" onClick={togglePopup}>X</button>
                </div>

                <div className="popup-middle">
                    <div className="popup-section" >
                        <h3>General Info.</h3>
                        <p><b>DOB: </b>{selectedStudy.name}</p>
                        <p><b>Study Status: </b>{selectedStudy.status}</p>   
                    </div>

                    <div className="popup-section">
                        <h3>Agreements</h3> 
                        <p><b>Bavaria Agrees: </b>{selectedStudy.isBavariaAgreed ? 'Yes' : 'No'}</p>
                        <p><b>FDA Agrees: </b>{selectedStudy.isFdaAgreed ? 'Yes' : 'No'}</p>
                    </div>

                    <div className="popup-section" >
                        <h3>Dates</h3>
                        <p><b>Start Date: </b>{selectedStudy.start}</p>
                        <p><b>End Date: </b>{selectedStudy.end}</p>
                    </div>

                    <div className='popup-section'>
                        <h3>Patients</h3>
                        <p> <b>Needed:</b> {hasPatient ? "No" : "Yes"}</p>
                        <p><b>Maximum Patients: </b>{selectedStudy.maxPatients.toString()}</p> 
                    </div>     
                </div> 

                {isFDAView && selectedStudy.studyPatients !== null && selectedStudy.status === "Approved" && selectedStudy.placeboDrug === null && selectedStudy.realDrug === null ? (
                    <button onClick={toggleDrugSelect}className='add-patient' style={{marginBottom:'25px'}}>Assign Drugs to {selectedStudy.maxPatients.toString()} Patients</button>
                ):
                    <></>
                }

                {selectedStudy.status === "Cancelled" ? (
                    <div className='add-patient' style={{border: '4px solid #EE6C4D', color: '#EE6C4D', backgroundColor: '#ececec'}}>Study Cancelled</div>
                    ) : selectedStudy.status === "Pending" ? (
                        <>
                            <div style={{ display: "flex", flexDirection: "row" }}>
                                <button className='add-patient' onClick={() => { approveStudy(); handleButtonClick(); } }>Approve Study</button>
                                <button className='add-patient' style={{color: "red", borderColor: "red", marginLeft: "2px"}}onClick={() => { cancelStudy(); handleCancelButtonClick(); } }>Cancel Study</button>
                            </div>
                        </> 
                    ) : selectedStudy.status === "Completed" && !selectedStudy.isFDANotified && !isFDAView ? (
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            <div className='add-patient' style={{border: '4px solid #0E619C', color: '#0E619C', backgroundColor: '#ececec'}}>Study Completed</div>
                            <button className='add-patient' style={{border: '4px solid #00FF00', color: '#00FF00'}} onClick={() => {notifyFDA();}}>Notify FDA</button>
                        </div>
                    ) : selectedStudy.status === "Completed" && !selectedStudy.isFDANotified ? (
                        <div className='add-patient' style={{border: '4px solid #FFA500', color: '#FFA500', backgroundColor: '#ececec'}}>Awaiting Study Status</div>
                    ) : selectedStudy.status === "Completed" && selectedStudy.isFDANotified && !selectedStudy.isAssignmentSent && isFDAView ? (
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            <div className='add-patient' style={{border: '4px solid #0E619C', color: '#0E619C', backgroundColor: '#ececec'}}>Study Completed</div>
                            <button className='add-patient' style={{border: '4px solid #FFA500', color: '#FFA500'}} onClick={() => {sendAssignment();}}>Send Group Assignment</button>
                        </div>
                    ) : selectedStudy.status === "Completed" && selectedStudy.isFDANotified && !selectedStudy.isAssignmentSent && !isFDAView ? (
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            <div className='add-patient' style={{border: '4px solid #0E619C', color: '#0E619C', backgroundColor: '#ececec'}}>Study Completed</div>
                            <div className='add-patient' style={{border: '4px solid #00FF00', color: '#00FF00', backgroundColor: '#ececec'}}>Awaiting Group Assignment</div>
                        </div>
                    ) : selectedStudy.status === "Completed" && selectedStudy.isFDANotified && selectedStudy.isAssignmentSent && !isFDAView ? (
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            <div className='add-patient' style={{border: '4px solid #0E619C', color: '#0E619C', backgroundColor: '#ececec'}}>Study Completed</div>
                            <button className='add-patient' style={{border: '4px solid #00FF00', color: '#00FF00'}} onClick={togglePopupNew}>Group Assignment</button>
                        </div>
                    ) : selectedStudy.status === "Completed" && selectedStudy.isFDANotified && selectedStudy.isAssignmentSent && !selectedStudy.isReportSent ? (
                        <div className='add-patient' style={{border: '4px solid #00FF00', color: '#00FF00'}}>Awaiting Study Report</div>
                    ) : selectedStudy.status === "Completed" && selectedStudy.isFDANotified && selectedStudy.isAssignmentSent && selectedStudy.isReportSent ? (
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            <button className='add-patient' style={{border: '4px solid #0E619C', color: '#0E619C'}} onClick={togglePopupResults}>Study Report</button>
                            <button className='add-patient' style={{border: '4px solid #FFA500', color: '#FFA500'}} onClick={() => {releaseResults();}}>Send Report To Bavaria</button>
                        </div>
                    ) : selectedStudy.status === "Completed" && selectedStudy.isFDANotified && selectedStudy.isAssignmentSent && selectedStudy.isReportSent && selectedStudy.isResultsReleased ? (
                        <button className='add-patient' style={{border: '4px solid #0E619C', color: '#0E619C'}} onClick={togglePopupResults}>Study Ended - See Report</button>
                    ): hasPatient ? (
                        <DisplayStudyPatients studyPatients = {selectedStudy.studyPatients} isFDAView={isFDAView} />
                    ): isFDAView ? (
                        <div className='add-patient' style={{border: '4px solid #FFA500', color: '#FFA500', backgroundColor: '#ececec'}}>Need Patients</div>
                    ):
                        <button className='add-patient' onClick={addRandomPatients}>Add {selectedStudy.maxPatients.toString()} Random Eligible Patients</button>
                }             

            </div>
            {isDrugOpen && <AssignDrug toggleDrugSelect = {toggleDrugSelect} selectedStudy={selectedStudy}/>}
            {isOpen && <AssignmentPopup togglePopup = {togglePopupNew} selectedStudy={selectedStudy} isFDAView={!isFDAView} isBavariaView={false}/>}
            {isOpenResults && <StudyResultsPopup togglePopup={togglePopupResults} selectedStudy={selectedStudy} patientsInStudy={patientsInStudy} isFDAView={isFDAView} isBavariaView={false}/>}
        </div>

    )
}

export default AdminPopup;