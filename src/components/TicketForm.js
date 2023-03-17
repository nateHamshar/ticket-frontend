import "./cssFiles/ticketForm.css"
import {useState} from "react";
import { useAuthContext } from "../hooks/useAuthContext";

const TicketForm = () => {

const [title, setTitle] = useState("")
const [location, setLocation] = useState("")
const [description, setDescription] = useState("")
const [error, setError] = useState(null)

const { user } = useAuthContext()
const handleSubmit = async () => {

    if (!user) {
        return
    }
    
    const open = true
    const companyCode = user.companyCode;
    console.log(companyCode)
    const ticket = {title, location, description, open, companyCode}
    
    const response = await fetch("https://ticket-system-ldom.onrender.com/api/tickets", {
        method: "POST",
        body: JSON.stringify(ticket),
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${user.token}`
        }
    })
    const json = await response.json()

    if (!response.ok){
        setError(json.error)
    }
    if (response.ok){
        setTitle("")
        setLocation("")
        setDescription("")
        setError(null)
        console.log("new ticket added", json)

    }
}

    return (
        <div className="formDiv">
            <form className="ticketForm" onSubmit={handleSubmit}>
                <label htmlFor="titleInput" className="inputLabel">Choose a descriptive, yet concise title.</label>
                <input type="text" id="titleInput" className="titleInput inputField" required 
                onChange={(e) => setTitle(e.target.value)} />
                <label htmlFor="locationInput" className="inputLabel notFirst">Where is the problem located?</label>
                <input type="text"  id="locationInput" className="locationInput inputField" required 
                onChange={(e) => setLocation(e.target.value)} />
                <label htmlFor="descriptionInput" className="inputLabel notFirst">Describe the problem with as much detail as possible.</label>
                <textarea type="text" id="descriptionInput" className="descriptionInput inputField" required
                onChange={(e) => setDescription(e.target.value)} />
                <input type="submit" value={"Create New Ticket"} className="submitButton" />
                {error && <div className="errorMsg">{error}</div>}
            </form>
        </div>
    );
}
 
export default TicketForm;
