// MessagingList.js
import React, { useState, useEffect } from 'react';

const MessagingList = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch('/api/messages/')
      .then((response) => response.json())
      .then((data) => setMessages(data));
  }, []);

  const handleDelete = (messageId) => {
    fetch(`/api/messages/${messageId}/`, {
      method: 'DELETE',
    })
      .then(() => {
        setMessages(messages.filter((message) => message.id !== messageId));
      });
  };

  return (
    <div>
      <h2>Message List</h2>
      <table>
        <thead>
          <tr>
            <th>Recipient</th>
            <th>Content</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((message) => (
            <tr key={message.id}>
              <td>{message.recipient}</td>
              <td>{message.content}</td>
              <td>
                <button onClick={() => handleDelete(message.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MessagingList;
