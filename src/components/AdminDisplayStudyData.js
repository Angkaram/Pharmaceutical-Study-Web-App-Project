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
import "./Admin.css";

function DisplayStudyData({nameSearch, statusSearch, startSearch, isFDAView, isBavariaView, isAdminView}) {

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
                  <>
                    <th style={{backgroundColor: '#08d3b4'}}>Study Name</th>
                    <th style={{backgroundColor: '#08d3b4'}}>Study Status</th>
                    <th style={{backgroundColor: '#08d3b4'}}>Has Patients</th>
                    <th style={{backgroundColor: '#08d3b4'}}>Study Start</th>
                    <th style={{backgroundColor: '#08d3b4'}}>Study End</th>
                    <th style={{backgroundColor: '#08d3b4'}}>Agreed by Bavaria</th>
                    <th style={{backgroundColor: '#08d3b4'}}>Agreed by FDA</th>
                    <th style={{backgroundColor: '#08d3b4'}}>Max Participants</th>
                  </>
                ) : isBavariaView ? (
                  <th style={{backgroundColor: '#f46f74'}}>Insurance Number</th>
                ) : isAdminView ? (
                  <>
                    <th style={{backgroundColor: '#6fabd0'}}>Study Name</th>
                    <th style={{backgroundColor: '#6fabd0'}}>Study Status</th>
                    <th style={{backgroundColor: '#6fabd0'}}>Study Start</th>
                    <th style={{backgroundColor: '#6fabd0'}}>Study End</th>
                    <th style={{backgroundColor: '#6fabd0'}}>Agreed by Bavaria</th>
                    <th style={{backgroundColor: '#6fabd0'}}>Agreed by FDA</th>
                    <th style={{backgroundColor: '#6fabd0'}}>Max Participants</th>
                    <th style={{backgroundColor: '#6fabd0'}}>Need Patients</th>
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
              // filtering still not working  
              if (study.status.includes("Approved")) {
                //console.log(study);
                return study;
              } 
              else if (isBavariaView) {
                return study;
              }
              else if (nameSearch === "" && statusSearch === "" && startSearch === "") {
                return study;
              }
            }).map((study) => {
              return (
  
                <tr key={study._id}>
                  {isFDAView ? (
                      <>
                        <td onClick={() => handleStudyClick(study)}>{study.name}</td>
                        <td>{study.status}</td>
                        <td>{study.studyPatients ? 'Yes' : 'No'}</td>
                        <td>{study.start}</td>
                        <td>{study.end}</td>
                        <td>{study.isBavariaAgreed ? 'Yes' : 'No'}</td>
                        <td>{study.isFdaAgreed ? 'Yes' : 'No'}</td>
                        <td>{study.maxPatients}</td>
                      </>

                      ) : isBavariaView ? (
                        <>
                          <td>{study.name}</td>
                          <td>{study.status}</td>
                          <td>{study.start}</td>
                          <td>{study.end}</td>
                          <td>{study.isBavariaAgreed ? 'Yes' : 'No'}</td>
                          <td>{study.isFdaAgreed ? 'Yes' : 'No'}</td>
                          <td>{study.maxPatients}</td>
                        </>
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
                          <td>{study.studyPatients ? 'No' : 'Yes'}</td>
                        </>
                      )}
                    </tr>
                  );
                })}
  
            </tbody>
          </table>
         {isFDAView && isOpen ? (
            <AdminPopup selectedStudy={selectedStudy} togglePopup={togglePopup} isFDAView={true}/>
         ): isOpen ? (
            <AdminPopup selectedStudy={selectedStudy} togglePopup={togglePopup}/>
         ):
          <></>
         }
        </div>
      )
  };

  export default DisplayStudyData;