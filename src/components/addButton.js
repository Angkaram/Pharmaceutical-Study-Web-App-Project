// Button that adds a patient to Jane Hopkins in Vendia, work in progress

import useJaneHopkins from '../hooks/useJaneHopkins';
import "./loginprompt.css";
//import * as React from 'react'; //removed (temp)
import React, { useState } from 'react';

function AddPatientButton() {
    const {entities} = useJaneHopkins();
    const [format, setFormat] = useState("list")
    const [patients, setPatients] = useState();
  
    const addPatient = async() => {
      let patientList = await entities.patient.list();
      const addPatientResponse = await entities.patient.add(
        {
        name: "Billy Patient",
        dob: "Januray 17, 2000",
        insuranceNumber: "114528972",
        weight: "101"
        },
        {
          aclInput:{
            acl:[
              {
                principal: {
                  nodes: ["FDA", "Bavaria"]
                },
                operations: ["READ"],
                path: "weight",
              },
            ],
          },
        }
      );
      console.log(addPatientResponse);
      console.log(patientList.items[8]);
      setPatients(patientList.items[8]);
    };
  
    return (

      <div className='back-button'>
        <button className = "back-button" onClick = {() => {
          addPatient();
          }}>Add patient</button>
        <button className = "back-button">
            {patients.weight}
        </button>
      </div>
    );
  }
  export default AddPatientButton;