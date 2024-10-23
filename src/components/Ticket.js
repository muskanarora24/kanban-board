import React from 'react';

function Ticket({ ticket }) {
  return (
    <div className="ticket">
      <h4>{ticket.title}</h4>
      <p>Priority: {ticket.priority}</p>
      <p>Status: {ticket.status}</p>
      <p>Assigned to: {ticket.user}</p>
    </div>
  );
}

export default Ticket;
