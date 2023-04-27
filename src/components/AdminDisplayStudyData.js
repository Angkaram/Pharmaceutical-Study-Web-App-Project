import './loginprompt.css';
import "./loginprompt.js";
import './home.css';
import './DoctorView.css';
import './Notifications.css';
import './ManageStudyView.css';
import useJaneHopkins from '../hooks/useJaneHopkins';
import { useEffect, useState } from 'react';
import { css } from "@emotion/react";
import "react-datepicker/dist/react-datepicker.css";
import AdminPopup from './AdminPopup';

function DisplayStudyData({nameSearch, statusSearch, startSearch, isFDAView, isBavariaView, isAdmin}) {

    const { entities } = useJaneHopkins();
    const [study, setStudy] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedStudy, setSelectedStudy] = useState(null);

    const [isOpen, setIsOpen] = useState(false);
    const togglePopup = () => {
      setIsOpen(!isOpen);
    }
  
    useEffect(() => {
      async function fetchStudy() {
        const studyList = await entities.study.list();
        setStudy(studyList.items);
        setIsLoading(false);
      }
  
      fetchStudy();
    }, [entities.study]);

  
    const override = css`
      display: block;
      margin: 0 auto;
      border-color: red;
    `;
  
    const handleStudyClick = (study) => {
      setSelectedStudy(study);
      console.log("clicked");
      togglePopup();
    }
  
    return (
      <div>
        
          <table className="patientTable">
            <thead>
            <tr>
                {isFDAView ? (
                  <th style={{backgroundColor: '#08d3b4'}}>Insurance Number</th>
                ) : isBavariaView ? (
                  <th style={{backgroundColor: '#f46f74'}}>Insurance Number</th>
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
              }

              // Tried filtering the list, but it is not working right now
              else if (Boolean(study.isFdaAgreed) && Boolean(study.isBavariaAgreed)) {
                //console.log(study.isFdaAgreed);
                //console.log(study.isBavariaAgreed);
                return study;
              }
              else if (nameSearch === "" && statusSearch === "" && startSearch === "") {
                return study;
              }
            }).map((study) => {
              return (
  
                <tr key={study.id}>
                  {isFDAView || isBavariaView  ? (
                        <td>{study.name}</td>
                      ) : (
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
                      )}
                    </tr>
                  );
                })}
  
            </tbody>
          </table>

         {isOpen && <AdminPopup selectedStudy={selectedStudy} togglePopup={togglePopup}/>}
        </div>
      )
  };

  export default DisplayStudyData;