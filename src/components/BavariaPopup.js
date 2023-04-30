import useJaneHopkins from '../hooks/useJaneHopkins';
import { useEffect, useState } from 'react';

function BavariaPopup({selectedStudy, togglePopup}) {

    const [studyData, setStudyData] = useState(selectedStudy);  
    const { entities } = useJaneHopkins();
    const [study, setStudy] = useState([]);
    const [isBavariaAgreed, setIsBavariaAgreed] = useState(false);

    useEffect(() => {
        async function fetchStudy() {
          const studyList = await entities.study.list();
          setStudy(studyList.items);
        }
    
        fetchStudy();
    }, [entities.study]);

    let hasStudy;
    if (selectedStudy.studyPatients === null) {
        hasStudy = false;
    } else {
        hasStudy = true;
    }

    const approveStudy = async() => {
        const study = await entities.study.get(selectedStudy._id);

        const updated = await entities.study.update({
            _id: study._id,
            isBavariaAgreed: true
        });
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

    async function handleButtonClick() {
    await approveStudy();
    window.location.reload();
    };

    return (
        <div className="largeView">

            <div className="popup-content">

                <div className="popup-top">
                    <h3>{selectedStudy.name}</h3>
                    <button id="close" onClick={togglePopup}>X</button>
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
                        <p><b>Bavaria Agrees: </b>{selectedStudy.isBavariaAgreed.toString()}</p>
                        <p><b>FDA Agrees: </b>{selectedStudy.isFdaAgreed.toString()}</p>
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
                    
                        <button className='add-patient' onClick={() => {approveStudy(); handleButtonClick();}}>Approve Study</button>
                        <button className='add-patient' style={{color: "red", borderColor: "red"}}onClick={() => {denyStudy(); handleButtonClick();}}>Deny Study</button>
                </div>            

            </div>
        </div>

    )
}

export default BavariaPopup;