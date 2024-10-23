import React, { useState, useEffect } from 'react';
import Ticket from './Ticket';

function Board({ tickets, users }) {
  // Load initial grouping and ordering state from localStorage or set default values
  const [grouping, setGrouping] = useState('status');  // Default to 'status'
  const [ordering, setOrdering] = useState('priority');  // Default to 'priority'

  // Load saved grouping and ordering from localStorage when component mounts
  useEffect(() => {
    const savedGrouping = localStorage.getItem('grouping');
    const savedOrdering = localStorage.getItem('ordering');
    
    if (savedGrouping) setGrouping(savedGrouping);
    if (savedOrdering) setOrdering(savedOrdering);
  }, []);

  // Handle grouping change and save to localStorage
  const handleGroupingChange = (newGrouping) => {
    setGrouping(newGrouping);
    localStorage.setItem('grouping', newGrouping);
  };

  // Handle ordering change and save to localStorage
  const handleOrderingChange = (newOrdering) => {
    setOrdering(newOrdering);
    localStorage.setItem('ordering', newOrdering);
  };

  const groupedTickets = groupTickets(tickets, users, grouping);
  const orderedTickets = orderTickets(groupedTickets, ordering);

  return (
    <div className="board">
      {/* You can add buttons or a selector here for changing grouping and ordering */}
      <div className="controls">
        <select value={grouping} onChange={(e) => handleGroupingChange(e.target.value)}>
          <option value="status">Group by Status</option>
          <option value="user">Group by User</option>
          <option value="priority">Group by Priority</option>
        </select>

        <select value={ordering} onChange={(e) => handleOrderingChange(e.target.value)}>
          <option value="priority">Sort by Priority</option>
          <option value="title">Sort by Title</option>
        </select>
      </div>

      {Object.keys(orderedTickets).map((group) => (
        <div className="column" key={group}>
          <h3>{group}</h3>
          {orderedTickets[group].map((ticket) => (
            <Ticket key={ticket.id} ticket={ticket} users={users} />
          ))}
        </div>
      ))}
    </div>
  );
}

function groupTickets(tickets, users, grouping) {
  let grouped = {};

  tickets.forEach((ticket) => {
    let groupKey;

    if (grouping === 'user') {
      // Find the user name from the userId
      const user = users.find((user) => user.id === ticket.userId);
      groupKey = user ? user.name : 'Unknown';
    } else {
      // Default grouping by status or priority
      groupKey = ticket[grouping];
    }

    if (!grouped[groupKey]) {
      grouped[groupKey] = [];
    }
    grouped[groupKey].push(ticket);
  });

  return grouped;
}

function orderTickets(groupedTickets, ordering) {
  let ordered = {};

  Object.keys(groupedTickets).forEach((group) => {
    ordered[group] = groupedTickets[group].sort((a, b) => {
      if (ordering === 'priority') {
        return b.priority - a.priority;  // Descending order of priority
      } else {
        return a.title.localeCompare(b.title);  // Ascending order of title
      }
    });
  });

  return ordered;
}

export default Board;
