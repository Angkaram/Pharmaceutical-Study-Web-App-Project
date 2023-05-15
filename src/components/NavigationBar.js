import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './NavigationBar.css';
import './home.css';
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";
import { useNavigate, Link } from "react-router-dom";
import homeIcon from "./Icons/homeIcon.png";

function NavigationBar( {isDoctorView, isAdminView, isFDAView, isBavariaView, isLogin, isSignup, user} ) {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  const navigate = useNavigate();
  const location = useLocation();
  
  const logout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <div>
      {isDoctorView ? (
        <nav className="navbar" style={{backgroundColor: '#0e619c', height: "100%"}}>
        <div className='janeHopkinsTitleText'>Jane Hopkins
          <div className='hospitalTitleText'>Hospital</div>
        </div>
        <div className = 'nav-bar' style={{backgroundColor: '#0e619c'}}>
        <div className='displayEmail'>{user?.email}</div>
              <button className='signOutButton' onClick={logout}>
                <div className='signOutIcon'></div>
                <div className='signOutText'>Sign Out</div>
              </button>
          </div>
        </nav>
      ) : isAdminView ? (
        <nav className="navbar" style={{backgroundColor: '#6fabd0', height: "100%"}}>
          <div className='janeHopkinsTitleText'>Jane Hopkins
          <div className='hospitalTitleText'>Hospital</div>
          </div>
          <div className = 'nav-bar' style={{backgroundColor: '#6fabd0'}}>
          <div className='displayEmail'>{user?.email}</div>
            <button className='signOutButton' style={{border: 'black' }} onClick={logout}>
              <div className='signOutIcon'></div>
              <div className='signOutText' style={{color: 'black' }}>Sign Out</div>
            </button>
            </div>
        </nav>
      ) : isFDAView ? (
        <nav className="navbar" style={{backgroundColor: '#08d3b4', height: "100%"}}>
        <div className='janeHopkinsTitleText'>FDA
                <div className='hospitalTitleText' style={{fontSize: 25, textAlign: 'center'}}>U.S. Food and Drug Administration</div>
        </div>
        <div className = 'nav-bar' style={{backgroundColor: '#08d3b4'}}>
        <div className='displayEmail'>{user?.email}</div>
              <button className='signOutButton' onClick={logout}>
                <div className='signOutIcon'></div>
                <div className='signOutText' style={{color: '#069882'}}>Sign Out</div>
              </button>
          </div>
        </nav>
      ) : isBavariaView ? (
        <nav className="navbar" style={{backgroundColor: '#f46f74', height: "100%"}}>
        <div className='janeHopkinsTitleText'>Bavaria
              <div className='hospitalTitleText'>Pharmaceuticals</div>
        </div>
        <div className = 'nav-bar' style={{backgroundColor: '#f46f74'}}>
        <div className='displayEmail'>{user?.email}</div>
        <button className='signOutButton' onClick={logout}>
              <div className='signOutIcon'></div>
              <div className='signOutText' style={{color: '#e7121a' }}>Sign Out</div>
            </button>
          </div>
        </nav>
      ) : isLogin || isSignup ? (
        <nav className="navbar" style={{backgroundColor: '#0e619c', height: "100%"}}>
          <div className="medTitle">
                <div className="abbrvMD">MDMS</div>
                    Medical Data
                <div className="manageTitle">Management System</div>
        </div>
        <div className="links">
            <a href="/" style={{
                        color: "#0E619C",
                        backgroundColor: '#fff',
                        transition: 'all 0.2s',
                        textDecoration: 'none',
                        padding: '5px 10px',
                        borderRadius: '36px',
                        border: '1px solid #0E619C'
                    }}
                    onMouseOver={e => {
                        e.target.style.backgroundColor = '#9ea5aa';
                    }}
                    onMouseOut={e => {
                        e.target.style.color = '#0E619C';
                        e.target.style.backgroundColor = '#fff';
                    }}
            > <img style={{ width: '20px', height: '20px' }}  src={homeIcon}/>  Home </a>
        </div>
        </nav>
      ) : (
        <nav className="navbar" style={{backgroundColor: '#0e619c', height: "100%"}}>
            <div className="medTitle">
                <div className="abbrvMD">MDMS</div>
                    Medical Data
                <div className="manageTitle">Management System</div>
            </div>
                
                <div className="linkCreate">
                    <a href="/SignUp">Create Account</a>
                </div>
                <div className="linkLogin">
                    <a href="/Login" style={{
                    }}
                    onMouseOver={e => {
                        e.target.style.backgroundColor = '#9ea5aa';
                    }}
                    onMouseOut={e => {
                        e.target.style.color = '#0E619C';
                        e.target.style.backgroundColor = '#fff';
                    }}
                    >
                    Sign in
                    </a>

                </div>
            </nav>
      )}
      </div>
    
  );
}

export default NavigationBar;