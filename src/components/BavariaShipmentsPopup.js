import useBavaria from '../hooks/useBavaria';
import { useEffect, useState } from 'react';

function BavariaShipmentsPopup({selectedDrug, togglePopup}) {
    const [drugData, setDrugData] = useState(selectedDrug);  
    const { entities } = useBavaria();
    const [drug, setDrug] = useState([]);
    const [sendFDA, setSendFDA] = useState(false);

    useEffect(() => {
        async function fetchDrug() {
          const drugList = await entities.drug.list();
          setDrug(drugList.items);
        }
    
        fetchDrug();
    }, [entities.drug]);

    const sendDrug = async() => {
        const drug = await entities.drug.get(selectedDrug._id);

        const updated = await entities.drug.update({
            _id: drug._id,
            sendFDA: true
        });
        setDrugData(updated);
        console.log("Send Drug Button was clicked");
    }

    useEffect(() => {
        setSendFDA(selectedDrug.sendFDA === "True");
    }, [selectedDrug]);

    async function handleButtonClick() {
    await sendDrug();
    window.location.reload();
    };

    return (
        <div className="largeView">

            <div className="popup-content" style={{borderColor:'#f46f74'}}>

                <div className="popup-top">
                    <h3>{selectedDrug.name}</h3>
                    <button id="close" style={{borderColor:'#f46f74'}} onClick={togglePopup}>X</button>
                </div>

                <div className="popup-middle">
                    <div className="popup-section" >
                        <h3 style={{ textDecoration: 'underline', textDecorationThickness: '2px'}}>General Information</h3>
                        <p><b>ID: </b>{selectedDrug._id}</p>
                        <p><b>Placebo: </b>{selectedDrug.placebo ? 'Yes' : 'No'}</p>
                        <p><b>Batch Number: </b>{selectedDrug.batchNumber}</p>
                    </div>

                    <div className="popup-section">
                        <h3>Agreements</h3> 
                        <p><b>Sent to FDA: </b>{selectedDrug.sendFDA  ? 'Yes' : 'No'}</p>
                    </div>
                    
                        <button className='add-patient' onClick={() => {sendDrug(); handleButtonClick();}}>Send Drug to FDA</button>
                    </div>            

            </div>
        </div>

    )
}

export default BavariaShipmentsPopup;