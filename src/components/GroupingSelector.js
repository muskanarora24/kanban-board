import React from 'react';

function GroupingSelector({ onGroupingChange, onOrderingChange }) {
  return (
    <div className="grouping-selector">
      <label htmlFor="grouping">Group By: </label>
      <select id="grouping" onChange={(e) => onGroupingChange(e.target.value)}>
        <option value="status">Status</option>
        <option value="user">User</option>
        <option value="priority">Priority</option>
      </select>

      <label htmlFor="ordering">Order By: </label>
      <select id="ordering" onChange={(e) => onOrderingChange(e.target.value)}>
        <option value="priority">Priority</option>
        <option value="title">Title</option>
      </select>
    </div>
  );
}

export default GroupingSelector;
