import "./cssFiles/ticketPreview.css"
import format from "date-fns/format"
import { useAuthContext } from "../hooks/useAuthContext";
const TicketPreview = ({previewTicket}) => {

    let open = previewTicket.open;
    
    let openStatus = null;
    if (previewTicket.open){
        openStatus = "Open"
    } else {
        openStatus = "Closed"
    }

    const { user } = useAuthContext()

    const handleStatusChange = async () => {
        if (!user) {
            return
        }    
        
        if (open){
            open = false;
        } else if (!open) {
            open = true;
        }

        const ticket = {open: open}
    
        const response = await fetch(`https://ticket-system-ldom.onrender.com/api/tickets/${previewTicket._id}`, {
            method: "PATCH",
            body: JSON.stringify(ticket),
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${user.token}`
                }
        })
    
        const json = await response.json()

        if (!response.ok){
            console.log(json.error)
        }
        if (response.ok){
            console.log("status has been changed", json)
        }

        window.location.reload()
    }

    return (
        <div className="ticketView">
            <h1 className="previewTitle">{previewTicket.title}</h1>
            <h3 className="previewLocation">Located at: {previewTicket.location}</h3>
            <p className="previewTime">Ticket created on: {format(new Date(previewTicket.createdAt), 'MM/dd/yyyy')}</p>
            <p className="previewDescription">{previewTicket.description}</p>
            <div className="statusDiv">
            <p className="previewStatus">Status: {openStatus}</p>
            <button className="statusChanger" onClick={handleStatusChange}>Change Status</button>
            </div>
        </div>
    );
}
 
export default TicketPreview;
