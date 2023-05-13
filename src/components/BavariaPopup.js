import useJaneHopkins from '../hooks/useJaneHopkins';
import { useEffect, useState } from 'react';
import StudyResultsPopup from './StudyResults';

function BavariaPopup({selectedStudy, togglePopup}) {

    const [studyData, setStudyData] = useState(selectedStudy);  
    const { entities } = useJaneHopkins();
    const [study, setStudy] = useState([]);
    const [isBavariaAgreed, setIsBavariaAgreed] = useState(false);
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        async function fetchStudy() {
            const patientList = await entities.patient.list();
            setPatients(patientList.items);

            const studyList = await entities.study.list();
            setStudy(studyList.items);
        }
    
        fetchStudy();
    }, [entities.study]);

    const [studyID, setStudyID] = useState([]);
    const patientsInStudy = patients.filter(patient => patient.assignedStudy === studyID);
    const [isOpenResults, setIsOpenResults] = useState(false);
    const togglePopupResults = () => {
        setIsOpenResults(!isOpenResults);
    }

    let hasStudy;
    if (selectedStudy.studyPatients === null) {
        hasStudy = false;
    } else {
        hasStudy = true;
    }

    const approveStudy = async() => {
        const study = await entities.study.get(selectedStudy._id);

        let updated = null;
      
        if (study.isFdaAgreed) {
        const updated = await entities.study.update({
            _id: study._id,
            isBavariaAgreed: true,
            status: "Approved"
        });
        } else {
        updated = await entities.study.update({
            _id: study._id,
            isBavariaAgreed: true
        });
        }
        setStudyData(updated);
        console.log("Approve Study Button was clicked");
    }

    const denyStudy = async() => {
        const study = await entities.study.get(selectedStudy._id);

        const updated = await entities.study.update({
            _id: study._id,
            isBavariaAgreed: false
        });
        setStudyData(updated);
        console.log("Deny Study Button was clicked");
    }

    useEffect(() => {
        setIsBavariaAgreed(selectedStudy.isBavariaAgreed === "True");
    }, [selectedStudy]);

    // to make the page reload once data is input into the system
    async function handleButtonClick() {
        await approveStudy();
        window.location.reload();
    };

    return (
        <div className="largeView">

            <div className="popup-content" style={{borderColor:'#f46f74'}}>

                <div className="popup-top">
                    <h3>{selectedStudy.name}</h3>
                    <button id="close" style={{borderColor:'#f46f74'}} onClick={togglePopup}>X</button>
                </div>

                <div className="popup-middle">
                    <div className="popup-section" >
                        <h3>General Information</h3>
                        <p><b>DOB: </b>{selectedStudy.name}</p>
                        <p><b>Study Status: </b>{selectedStudy.status}</p>
                        <p><b>Maximum Patients: </b>{selectedStudy.maxPatients.toString()}</p>    
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

                    
                        <p>
                        <strong>Patients in Study:</strong>{" "}
                            {selectedStudy.studyPatients?.map((id, index) => (
                            <span key={index}>
                                {id.id}
                                {index < selectedStudy.studyPatients.length - 1 ? ", " : ""}
                            </span>
                            ))}
                        </p>
                </div>            
                {!selectedStudy.isResultsReleased && selectedStudy.isBavariaAgreed === null? (
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <button className='add-patient' onClick={() => {approveStudy(); handleButtonClick();}}>Approve Study</button>
                        <button className='add-patient' style={{color: "red", borderColor: "red", marginLeft: "2px"}}onClick={() => {denyStudy(); handleButtonClick();}}>Deny Study</button>
                    </div>
                ): selectedStudy.isResultsReleased ? (
                    <button className='add-patient' onClick={togglePopupResults}>Study Completed - See Report</button>
                ): !selectedStudy.isResultsReleased && selectedStudy.status === 'Completed' ? (
                    <div className='add-patient' style={{backgroundColor: '#ececec', cursor: 'auto'}}> Study Completed, Awaiting Release</div>
                ): selectedStudy.status === 'Approved' ? (    
                    <div className='add-patient' style={{color: '#0074ae', border: '4px solid #0074ae', backgroundColor: '#ececec', cursor: 'auto'}}>Study Approved</div>
                ): selectedStudy.status === 'Pending' ? (
                    <div className='add-patient' style={{color: '#f0ad4e', border: '4px solid #f0ad4e', backgroundColor: '#ececec', cursor: 'auto'}}>Study Pending</div>
                ): <div className='add-patient' style={{border: '4px solid red', color: "red", backgroundColor: '#ececec', cursor: 'auto'}}>Study Cancelled</div>
                }
            </div>
            {isOpenResults && <StudyResultsPopup togglePopup={togglePopupResults} selectedStudy={selectedStudy} patientsInStudy={patientsInStudy} isFDAView={false} isBavariaView={true}/>}
        </div>

    )
}

export default BavariaPopup;