import formatDistanceToNow from "date-fns/formatDistanceToNow"


const TicketDetails = ({ticket, changePreview}) => {

    let openStatus = null;
    if(ticket.open){
        openStatus = "open"
    } else{
        openStatus = "closed"
    }
    return (
        <div className="ticketDetails" onClick={() => changePreview(ticket._id)} >
            <h2 className="ticketTitle">{ticket.title}</h2>
            <p className="ticketTime">created {formatDistanceToNow(new Date(ticket.createdAt), {addSuffix: true})}</p>
            <p className="openStatus">{openStatus}</p>
        </div>
    );
}
 
export default TicketDetails;
