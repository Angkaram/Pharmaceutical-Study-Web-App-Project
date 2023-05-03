import useJaneHopkins from '../hooks/useJaneHopkins';
import { useEffect, useState } from 'react';
import './ManageStudyView.css';

function Sidebar () {

    const [approvedCount, setApprovedCount] = useState(0);
    const [pendingCount, setPendingCount] = useState(0);
    const [cancelledCount, setCancelledCount] = useState(0);
    const [completedCount, setCompletedCount] = useState(0);
    const [study, setStudy] = useState([]);
    const { entities } = useJaneHopkins();

    useEffect(() => {
        async function fetchStudy() {
          const studyList = await entities.study.list();
          setStudy(studyList.items);
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

  return (
    <div className="sidebar">
        <div className="category approved">
          <i className="fas fa-circle"></i>
          <span>~Approved Studies~</span>
          <span className="count">{approvedCount}</span>
        </div>
        <div className="category pending">
          <i className="fas fa-circle"></i>
          <span>~Pending Studies~</span>
          <span className="count">{pendingCount}</span>
        </div>
        <div className="category cancelled">
          <i className="fas fa-circle"></i>
          <span>~Cancelled Studies~</span>
          <span className="count">{cancelledCount}</span>
        </div>
        <div className="category completed">
          <i className="fas fa-circle"></i>
          <span>~Completed Studies~</span>
          <span className="count">{completedCount}</span>
        </div>
      </div> 
  )
};

export default Sidebar;  
