import useBavaria from '../hooks/useBavaria';
import "./DoctorView.css";

function ShipmentsButton(togglePopup) {
  const {entities} = useBavaria();
  
  const addShipment = async() => {
    const addShipmentResponse = await entities.drug.add({
      Dosage: document.getElementById("Dosage").value,
      batchNumber: document.getElementById("batchNumber").value,
      Placebo: document.getElementById("Placebo").value,
    });
    console.log(addShipmentResponse);
  }
  return (
    <div className="largeView">
    <div className="popup-content" style={{borderColor: '#f46f74'}}>
      
      <div className="popup-top">
        <h3>Add New Shipment</h3>
        <button id="close" style={{borderColor: '#f46f74'}} onClick={togglePopup.handleClose}>X</button>
        
      </div>
      <h3> Drug Type: <input type="text" id="name"></input></h3> 
      
      <div className="popup-middle">
        <div className="popup-section">
          <h3>General Information</h3>
          <p><b>Dosage: </b><input type="text" id = "Dosage"></input></p>
          <p><b>Batch Number: </b><input type="text" id = "batchNumber"></input></p>
          <p><b>Placebo? </b><input type="text" id = "Placebo"></input></p>
        </div>
      </div>
      <button className='add-patient' style={{color: 'black', borderColor: 'black'}} onClick = {() => {addShipment();}}>Add/Create Shipment</button>
    </div>
  </div>
  )

}

export default ShipmentsButton;