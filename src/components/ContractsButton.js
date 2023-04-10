import useFDA from '../hooks/useFDA';
import "./DoctorView.css";

function ContractsButton(togglePopup) {
  const {entities} = useFDA();
  
  const addContract = async() => {
    const addShipmentResponse = await entities.drug.add({
      Dosage: document.getElementById("Dosage").value,
      batchNumber: document.getElementById("batchNumber").value,
    });
    console.log(addShipmentResponse);
  }
  return (
    <div className="largeView">
    <div className="popup-content" style={{borderColor: '#08d3b4'}}>
      
      <div className="popup-top">
        <h3>Add New Contract</h3>
        <button id="close" style={{borderColor: '#08d3b4'}} onClick={togglePopup.handleClose}>X</button>
        
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
      <button className='add-patient' style={{color: 'black', borderColor: 'black'}} onClick = {() => {addContract();}}>Add/Create Contract</button>
    </div>
  </div>
  )

}

export default ContractsButton;