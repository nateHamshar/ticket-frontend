import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import "./signup.css"

const Signup = () => {

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [companyCode, setCompanyCode] = useState('')
    const { signup, error, isLoading} = useSignup()

    const handleSignup = async (e) => {
        e.preventDefault()

        await signup(email, password, firstName, lastName, companyCode)
    }


    return (
        <div className="signup">
            <form className="signupForm">
                <h1 className="signupHeader">Signup</h1>
                <div className="inputsDiv">
                    <label className="inputLabel">First Name:</label>
                    <input type="text" className="inputField" required onChange={(e) => {setFirstName((e.target.value))}} value={firstName}/>
                </div>
                <div className="inputsDiv">
                    <label className="inputLabel">Last Name:</label>
                    <input type="text" className="inputField" required onChange={(e) => {setLastName((e.target.value))}} value={lastName}/>
                </div>
                <div className="inputsDiv">
                    <label className="inputLabel">Email:</label>
                    <input type="email" className="inputField" required onChange={(e) => {setEmail((e.target.value).toLowerCase())}} value={email}/>
                </div>
                <div className="inputsDiv">
                    <label className="inputLabel">Password:</label>
                    <input required type="password" className="inputField" onChange={(e) => {setPassword(e.target.value)}} value={password}/>
                </div>
                <div className="inputsDiv">
                    <label className="inputLabel">Company Code (Case-sensitive):</label>
                    <input type="text" className="inputField" required onChange={(e) => {setCompanyCode((e.target.value))}} value={companyCode}/>
                </div>
                {error && <div className="errorDiv">{error}</div>}
                <div className="submitDiv">
                    <button className="signupButton" disabled={isLoading} onClick={handleSignup}>Signup</button>
                </div>
            </form>
        </div>
    );
}
 
export default Signup;
