// UserForm.js
import React, { useState, useEffect } from 'react';

const UserForm = ({ userId, onUserSave }) => {
  const [userData, setUserData] = useState({
    username: '',
    password: '',
    role: ''
  });

  useEffect(() => {
    if (userId) {
      fetch(`/api/users/${userId}/`)
        .then((response) => response.json())
        .then((data) => setUserData(data));
    }
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const method = userId ? 'PUT' : 'POST';
    const url = userId ? `/api/users/${userId}/` : '/api/users/';

    fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        onUserSave(); // Callback to refresh the UserList after saving
      });
  };

  return (
    <div>
      <h2>{userId ? 'Edit User' : 'Add User'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={userData.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Role:</label>
          <input
            type="text"
            name="role"
            value={userData.role}
            onChange={handleChange}
          />
        </div>
        <button type="submit">{userId ? 'Update User' : 'Add User'}</button>
      </form>
    </div>
  );
};

export default UserForm;
