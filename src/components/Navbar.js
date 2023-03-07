import "./home.css";
const Nav = () => {
    return (
        <body>
        <div className = "background-color">
            <nav className="navbar">
                <h1>Macrohard</h1>
                <div className="links">
                    <a href="/SignUp">Create Account</a>
                    <a href="/Login" style={{
                        color: "white",
                        backgroundColor: '#7f0a14',
                        borderRadius: '10px'
                    }}> Sign in </a>
                </div>
            </nav>
            
        </div>
        <div class="coder-name">
  <b> <i>Developers: </i></b><br></br>
        Angelo Karam (lead)<br></br>
        Rahul Gupta<br></br>
        J.D. Cruz<br></br>
        Anthony Dominguez<br></br>
        Devesh Naidu<br></br>
        Farhad Lakzaei<br></br>
        Dakshina  Waduge<br></br>
        
</div>
        </body>

    );
}
 
export default Nav;