const Nav = () => {
    return (
        <nav className="navbar">
            <h1>Microhard</h1>
            <div className="links">
                <a href="/">Create Account</a>
                <a href="/create" style={{
                    color: "white",
                    backgroundColor: '#7f0a14',
                    borderRadius: '10px'
                }}> Sign in </a>
            </div>
        </nav>
    );
}
 
export default Nav;