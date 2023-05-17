import useBavaria from '../hooks/useBavaria';
import "./DoctorView.css";
import { useState } from 'react';

function ShipmentsButton(togglePopup) {
  const {entities} = useBavaria();
  const [isPlacebo, setIsPlacebo] = useState(false);
  
  const addShipment = async() => {
    const placebo = document.getElementById("placebo").checked;

    const addShipmentResponse = await entities.drug.add({
      batchNumber: document.getElementById("batchNumber").value,
      placebo: placebo
      
    },
    {
    aclInput: {
      acl: [
        {
          principal: {
            nodes:  "FDA",
          },
          operations: ["READ"],
          path: "placebo",
        },
      ]
    }
  } 
    );
    console.log(addShipmentResponse);
  }


    // to make the page reload once data is input into the system
    async function handleButtonClick() {
      await addShipment();
      setTimeout(() => {
        window.location.reload();
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }, 500);
    }


  return (
    <div className="largeView">
    <div className="popup-content" style={{borderColor: '#f46f74'}}>
      
      <div className="popup-top">
        <h3>Add New Shipment</h3>
        <button id="close" style={{borderColor: '#f46f74'}} onClick={togglePopup.handleClose}>X</button>
        
      </div>
      
      <div className="popup-middle">
        <div className="popup-section">
          <h3>General Information</h3>
          <p><b>Batch Number: </b><input type="text" id = "batchNumber"></input></p>
          

          <p className='checkbox'><strong>Placebo?
            <input type="checkbox" checked = {isPlacebo} onChange={()=> setIsPlacebo(!isPlacebo)} id = "placebo"></input>
          </strong></p>
        </div>
      </div>
      <button className='add-patient' style={{color: 'black', borderColor: 'black'}} onClick = {() => {handleButtonClick();}}>Add/Create Shipment</button>
    </div>
  </div>
  )

}

export default ShipmentsButton;