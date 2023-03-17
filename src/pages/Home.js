import { useEffect, useState } from "react";
import TicketDetails from "../components/TicketDetails";
import TicketPreview from "../components/TicketPreview";
import TicketForm from "../components/TicketForm"
import { useAuthContext } from "../hooks/useAuthContext";

import "./home.css"

const Home = () => {

    const [tickets, setTickets] = useState(null);
    const [showTicket, setShowTicket] = useState(false)
    const [previewTicket, setPreviewTicket] = useState();

    const { user } = useAuthContext()

// gets the tickets for both closed and open tickets
    useEffect(() => {
        if (user){
        const fetchTickets = async () => {
            const response = await fetch("/api/tickets", {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()
            if (response.ok) {
                setTickets(json.tickets)
            }
        }
        fetchTickets()
    }
    }, [user])
//////////////////
// updates the preview ticket when tickets are fetched initially
    useEffect(() => {
        if (tickets) {
            setPreviewTicket(tickets[0])
        }
    },[tickets])
//////////////////
// changes between ticket viewer and new ticket form
    const showFormView = () => {
        if (showTicket){
            setShowTicket(false)
            const activeHeader = document.getElementById("NT")
            activeHeader.style.color = "orangered";
            activeHeader.style.textDecoration = "underline"
            const notActive = document.getElementById("TV");
            notActive.style.color = "black";
            notActive.style.textDecoration = "none";
        } else return
    }

    const showTicketView = () => {
        if (!showTicket){
            setShowTicket(true)
            const activeHeader = document.getElementById("TV");
            activeHeader.style.color = "orangered";
            activeHeader.style.textDecoration = "underline";
            const notActive = document.getElementById("NT");
            notActive.style.color = "black";
            notActive.style.textDecoration = "none";
        } else return
    }

// sets the previewed ticket based on which was clicked
    const changePreview = (id) => {
        const fetchTicket = async () => {
            const response = await fetch(`/api/tickets/${id}`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()
            if (response.ok) {
                setPreviewTicket(json.ticket)
                showTicketView()
            }
        }
        fetchTicket()
    }
//////////////////

    return (
        <div className="home">
            <div className="left-side">
                <div className="tickets openTickets">
                <h1 className="ticketAreaHeader">Open Tickets</h1>
                    <div className="ticketArea">
                    {tickets && tickets.filter((ticket) => ticket.open === true).map((ticket) => (
                        <TicketDetails key={ticket._id} ticket={ticket} changePreview={changePreview}/>
                    ))}
                    </div>
                </div>
                <div className="tickets closedTickets">
                <h1 className="ticketAreaHeader">Closed Tickets</h1>
                    <div className="ticketArea">
                    {tickets && tickets.filter((ticket) => ticket.open === false).map((ticket) => (
                        <TicketDetails key={ticket._id} ticket={ticket} changePreview={changePreview}/>
                    ))}
                    </div>
                </div>
            </div>
            <div className="right-side">
                <div className="viewChanger">
                    <h1 className="viewChangeHeader" id="TV" onClick={() => showTicketView()}>Ticket View</h1>
                    <h1 className="viewChangeHeader" id="NT" onClick={() => showFormView()}>New Ticket</h1>
                </div>
                <div className="ticketViewer">
                    {showTicket && <TicketPreview key={previewTicket._id} previewTicket={previewTicket} />
                    }
                    {!showTicket && <TicketForm />
                    }
                </div>  
            </div>
        </div>
    );
}


export default Home;
