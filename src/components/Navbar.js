import "./home.css";
const Nav = () => {
    return (
        
        <div className = "background-color">
            <nav className="navbar">
                <h1>MD</h1>
                <h4>MS</h4>
                <h2>Medical Data</h2>
                <h3>Management System</h3>
                <div className="links">
                    <a href="/SignUp">Create Account</a>
                    <a href="/Login" style={{
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
                    >
                    Sign in
                    </a>

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
                    <div className="back">
                        <h1 style={{color: '#0E619C'}}>Compassionate care for all. Here is where the healing begins.</h1>
                    </div>
                </div>

                <div className="background-fda">
                    <p className="fda">U.S. Food and Drug Administration</p>
                    <div className="back">
                        <h1 style={{color: '#0E619C'}}>Ensuring our wellness for decades, the FDA holds all entities accountable at the highest of standards.</h1>
                    </div>
                </div>

                <div className="background-bavaria">
                    <p className="bavaria">Bavaria Pharmaceutics</p>
                    <div className="back">
                        <h1 style={{color: '#0E619C'}}>At the cutting edge of pharmaceutical research, Bavaria strives to give everyone a healthier tomorrow.</h1>
                    </div>
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