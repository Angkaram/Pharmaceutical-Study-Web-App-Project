import useJaneHopkins from '../hooks/useJaneHopkins';
import { css } from "@emotion/react";
import { ClipLoader } from "react-spinners";
import { useEffect, useState } from 'react';
import BavariaShipmentsPopup from './BavariaShipmentsPopup';

// new function to display Drugs data:
function DisplayDrugsData (isFDAView, isBavariaView) {

    const { entities } = useJaneHopkins();
    const [drug, setDrug] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedDrug, setSelectedDrug] = useState(null);

    useEffect(() => {
        async function fetchDrug() {
          const drugList = await entities.drug.list();
          setDrug(drugList.items);
          setIsLoading(false);
        }
    
        fetchDrug();
      }, [entities.drug]);

    const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
    `;

    const [isOpen, setIsOpen] = useState(false);

    const togglePopup = () => {
      setIsOpen(!isOpen);
    }

    const handleDrugClick = (drug) => {
      setSelectedDrug(drug);
      togglePopup();
    }

    const bavariaColor = '#f46f74';

    return (
        <div>
          <ClipLoader color={"blue"} loading={isLoading} css={override} size={40} />
          {!isLoading && (
            <table className="patientTable">
              <thead>
              <tr>
                  {isBavariaView ? (
                    <>
                    <th style={{backgroundColor: bavariaColor}}>Drug ID</th>
                    <th style={{backgroundColor: bavariaColor}}>Sent to FDA</th>
                    <th style={{backgroundColor: bavariaColor}}>Placebo</th>
                    <th style={{backgroundColor: bavariaColor}}>Batch Number</th>
                    
                    </>
                  ) : (
                    <>
                    <th>Drug ID</th>
                    <th>Sent to FDA</th>
                    <th>Batch Number</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                
              {drug.filter((drug)=> {
                if (isFDAView || isBavariaView) {
                  return drug;
                }/* NEEDS some tweaking to get working
                else if (study.name.toLowerCase().includes(nameSearch.toLowerCase()) && study.status.includes(statusSearch) 
                && study.startDate.includes(startSearch)) { 
                  return study;
                }
                else if (nameSearch === "" && statusSearch === "" && startSearch === "") {
                  return study;
                }*/
              }).map((drug) => {
                return (
    
                  <tr key={drug._id}>
                    
                          <>
                            <td onClick={() => handleDrugClick(drug)}>
                              {drug._id}
                            </td>
                            <td>{drug.sendFDA  ? 'Yes' : 'No'}</td>
                            <td>{drug.placebo ? 'Yes' : 'No'}</td>
                            <td>{drug.batchNumber}</td>
                          </>
                        
                      </tr>
                    );
                  })}
    
              </tbody>
            </table>
    
          )} 
          {isBavariaView ?(
            <>
            {isOpen && <BavariaShipmentsPopup selectedDrug={selectedDrug} togglePopup={togglePopup}/>}
            </>
          ):
          <></>
          }
       
    </div>
  
    )
};

export default DisplayDrugsData;