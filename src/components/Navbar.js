import "./home.css";
const Nav = () => {
    return (
        
        <div className = "background-color">
            <nav className="navbar">
                <h1>MDMS</h1>
                <h2>Medical Data</h2>
                <h3>Management System</h3>
                <div className="links">
                    <a href="/SignUp">Create Account</a>
                    <a href="/Login" style={{
                        color: "#0E619C",
                        backgroundColor: '#fff',
                    }}> Sign in </a>
                </div>
            </nav>
            
        <body className="mission-container">
            <div className="mission-head">
                <h1> Our Mission </h1>
            </div>
           
                <p className="basic-info">We have developed various programs, services, and initiatives in our hospitals that aim to enhance the health of the 
                community and make healthcare more accessible. Through our collaborative partnerships, 
                we strive to build connections to healthcare and community resources to promote better access and wellness.</p>
       
            <div className="org-partners">
                <h1>Partners</h1>
            </div>

            <body className="organizations">
            {/* could probably change these from p tags to a href tags to make it interactable */}
            <div className="background-hospital">
                <p className="hospital">Jane Hopkins Hospital</p>
            </div>

            <div className="background-fda">
                <p className="fda">U.S. Food and Drug Administration</p>
            </div>

            <div className="background-bavaria">
                <p className="bavaria">Bavaria Pharmaceutics</p>
            </div>
            </body>

        </body>


        


        {/* <div class="coder-name">
  <b> <i>Developers: </i></b><br></br>
        Angelo Karam (lead)<br></br>
        Rahul Gupta<br></br>
        J.D. Cruz<br></br>
        Anthony Dominguez<br></br>
        Devesh Naidu<br></br>
        Farhad Lakzaei<br></br>
        Dakshina  Waduge<br></br>
        
</div> */}
        </div>

    );
}
 
export default Nav;