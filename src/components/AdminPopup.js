import useJaneHopkins from '../hooks/useJaneHopkins';
import { useEffect, useState } from 'react';

function AdminPopup({selectedStudy, togglePopup}) {
    const { entities } = useJaneHopkins();
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        async function fetchPatients() {
          const patientList = await entities.patient.list();
          setPatients(patientList.items);
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
                isEligible: false
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
                    


                </div>

                {hasPatient ? (
                    <div className='add-patient' style={{border: '4px solid #FFA500', color: '#FFA500', backgroundColor: '#ececec'}}>Patients Already Added</div>
                ): 
                    <button className='add-patient' onClick={addRandomPatients}>Add {selectedStudy.maxPatients.toString()} Random Eligible Patients</button>
                }             

            </div>
        </div>

    )
}

export default AdminPopup;