import {Link} from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
import "./cssFiles/navbar.css"

const Navbar = () => {


    const {logout} = useLogout()
    const {user} = useAuthContext()

    const handleLogout = () => {
        logout()
    }
    return (
        <header className="navHeader">
            <div className="container">
                <div className="titleDiv">
                    <Link to="/" className="homeLink">
                        <h1>Ticket Manager</h1>
                    </Link>
                </div>
            {!user &&
                <div className="notLoggedInDiv">
                    <Link to="/login" className="navLink">
                        <h1 className="actionHeader">Login</h1>
                    </Link>
                    <Link to="/signup" className="navLink">
                        <h1 className="actionHeader">Sign up</h1>
                    </Link>
                </div>
            }
            {user &&
                <div className="logoutDiv">
                    <span className="greetingMessage">Hello, {user.firstName}!</span>
                    <button onClick={handleLogout} className="logoutButton">Logout</button>
                </div>
            }
            </div>
        </header>
    );
}
 
export default Navbar;
