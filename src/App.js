import React, { useState, useEffect } from 'react';
import { fetchTickets } from './components/API';
import Board from './components/Board';
import GroupingSelector from './components/GroupingSelector';

function App() {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);  // Store the users fetched from API
  const [grouping, setGrouping] = useState('status');  // Default grouping by status
  const [ordering, setOrdering] = useState('priority');  // Default ordering by priority

  useEffect(() => {
    const getData = async () => {
      const data = await fetchTickets();
      setTickets(data.tickets);
      setUsers(data.users);  // Set users from API response
    };
    getData();
  }, []);

  const handleGroupingChange = (newGrouping) => {
    setGrouping(newGrouping);
  };

  const handleOrderingChange = (newOrdering) => {
    setOrdering(newOrdering);
  };

  return (
    <div className="app">
      <GroupingSelector 
        onGroupingChange={handleGroupingChange}
        onOrderingChange={handleOrderingChange}
      />
      <Board tickets={tickets} users={users} grouping={grouping} ordering={ordering} />
    </div>
  );
}

export default App;
