// UserList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('/api/users/')
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  const handleDelete = (userId) => {
    fetch(`/api/users/${userId}/`, {
      method: 'DELETE',
    })
      .then(() => {
        setUsers(users.filter((user) => user.id !== userId)); 
      });
  };

  return (
    <div>
      <h2>User List</h2>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.role}</td>
              <td>
                <Link to={`/users/edit/${user.id}`}>Edit</Link> | 
                <button onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
