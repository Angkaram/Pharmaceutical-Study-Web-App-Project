import { css } from "@emotion/react";
import { ClipLoader } from "react-spinners"; // need to implement again in DisplayStudyData
import useJaneHopkins from '../hooks/useJaneHopkins';
import { useEffect, useState } from 'react';
import BavariaPopup from './BavariaPopup';
import "./Admin.css";

// new function to display Study data:
function DisplayStudyData({nameSearch, statusSearch, startSearch, isFDAView, isBavariaView}) {

    const { entities } = useJaneHopkins();
    const [study, setStudy] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedStudy, setSelectedStudy] = useState(null);
    const [approvedCount, setApprovedCount] = useState(0);
    const [pendingCount, setPendingCount] = useState(0);
    const [cancelledCount, setCancelledCount] = useState(0);
    const [completedCount, setCompletedCount] = useState(0);
  
    useEffect(() => {
      async function fetchStudy() {
        const studyList = await entities.study.list();
        setStudy(studyList.items);
        setIsLoading(false);
      }
  
      fetchStudy();
    }, [entities.study]);
  
    // Count the number of studies with a special status
    useEffect(() => {
      let myApprovedCount = 0;
      let myPendingCount = 0;
      let myCancelledCount = 0;
      let myCompletedCount = 0;
      for (const s of study) {
        if (s.status === "Approved") {
          myApprovedCount++;
        }
        else if (s.status === "Pending") {
          myPendingCount++;
        }
        else if (s.status === "Cancelled") {
          myCancelledCount++;
        }
        else {
          myCompletedCount++;
        }
      }
      setApprovedCount(myApprovedCount);
      setPendingCount(myPendingCount);
      setCancelledCount(myCancelledCount);
      setCompletedCount(myCompletedCount);
    }, [study]);
  
    const override = css`
      display: block;
      margin: 0 auto;
      border-color: red;
    `;
    
    const [isOpen, setIsOpen] = useState(false);

    const togglePopup = () => {
      setIsOpen(!isOpen);
    }

    const handleStudyClick = (study) => {
      setSelectedStudy(study);
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
                  <th style={{backgroundColor: bavariaColor}}>Study Name</th>
                  <th style={{backgroundColor: bavariaColor}}>Study Status</th>
                  <th style={{backgroundColor: bavariaColor}}>Study Start</th>
                  <th style={{backgroundColor: bavariaColor}}>Study End</th>
                  <th style={{backgroundColor: bavariaColor}}>Agreed by Bavaria</th>
                  <th style={{backgroundColor: bavariaColor}}>Agreed by FDA</th>
                  <th style={{backgroundColor: bavariaColor}}>Max Participants</th>
                  {isOpen && <BavariaPopup selectedStudy={selectedStudy} togglePopup={togglePopup}/>}
                  </>
                ) : (
                  <>
                  <th>Study Name</th>
                  <th>Study Status</th>
                  <th>Study Start</th>
                  <th>Study End</th>
                  <th>Agreed by Bavaria</th>
                  <th>Agreed by FDA</th>
                  <th>Max Participants</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              
            {study.filter((study)=> {
              if (isFDAView || isBavariaView) {
                return study;
              }/* NEEDS some tweaking to get working
              else if (study.name.toLowerCase().includes(nameSearch.toLowerCase()) && study.status.includes(statusSearch) 
              && study.startDate.includes(startSearch)) { 
                return study;
              } */
              else if (nameSearch === "" && statusSearch === "" && startSearch === "") {
                return study;
              }
            }).map((study) => {
              return (
  
                <tr key={study.id}>
                  
                        <>
                          <td onClick={() => handleStudyClick(study)}>
                            {study.name}
                          </td>
                          <td>{study.status}</td>
                          <td>{study.start}</td>
                          <td>{study.end}</td>
                          <td>{study.isBavariaAgreed ? 'Yes' : 'No'}</td>
                          <td>{study.isFdaAgreed ? 'Yes' : 'No'}</td>
                          <td>{study.maxPatients}</td>
                        </>
                      
                    </tr>
                  );
                })}
  
            </tbody>
          </table>
  
        )} 
        
      <div className="sidebar">
        <div className="category approved">
          <i className="fas fa-circle"></i>
          <span>-Approved Studies:</span>
          <span className="count">{approvedCount}</span>
        </div>
        <div className="category pending">
          <i className="fas fa-circle"></i>
          <span>-Pending Studies:</span>
          <span className="count">{pendingCount}</span>
        </div>
        <div className="category cancelled">
          <i className="fas fa-circle"></i>
          <span>-Cancelled Studies:</span>
          <span className="count">{cancelledCount}</span>
        </div>
        <div className="category completed">
          <i className="fas fa-circle"></i>
          <span>-Completed Studies:</span>
          <span className="count">{completedCount}</span>
        </div>
      </div> 
    
        
  </div>

    )
  };
  
  export default DisplayStudyData;