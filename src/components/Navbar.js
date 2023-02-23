import "./home.css";
const Nav = () => {
    return (
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
    );
}
 
export default Nav;