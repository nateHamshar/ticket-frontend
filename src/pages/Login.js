import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import "./login.css"

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const {login, error, isLoading} = useLogin()

    const handleLogin = async (e) => {
        e.preventDefault()

        await login(email, password)
    }

    const handleDemo = async (e) => {
        e.preventDefault()

        await login("demouser@gmail.com", "DemoPassword123!")
    }


    return (
        <div className="login">
            <form className="loginForm">
                <h1 className="loginHeader">Login</h1>
                <div className="inputsDiv">
                    <label className="inputLabel">Email:</label>
                    <input type="email" className="inputField" required onChange={(e) => {setEmail((e.target.value).toLowerCase())}} value={email}/>
                </div>
                <div className="inputsDiv">
                    <label className="inputLabel">Password:</label>
                    <input required type="password" className="inputField" onChange={(e) => {setPassword(e.target.value)}} value={password}/>
                </div>
                {error && <div className="errorDiv">{error}</div>}
                <div className="submitDiv">
                    <button className="loginButton" onClick={handleLogin} disabled={isLoading}>Login</button>
                    <button className="demoButton" onClick={handleDemo} disabled={isLoading}>Demo User</button>
                </div>
            </form>
        </div>
    );
}
 
export default Login;
