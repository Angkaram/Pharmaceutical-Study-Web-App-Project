import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";
import { useNavigate } from "react-router-dom";
import "./loginprompt.css";
function Works(){
    
    let navigate = useNavigate();

    const logout = async () => {
        navigate("/");
        await signOut(auth);
    };


    return (
        <section className="container">
            <div className="background">
                <h1 className = "header">Successfully Logged In!</h1> 
                <button onClick = {logout} className="login-button">Sign Out</button>
            </div>
        </section>
    );

}

export default Works;