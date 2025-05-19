// MessagingForm.js
import React, { useState } from 'react';

const MessagingForm = ({ onMessageSave }) => {
  const [messageData, setMessageData] = useState({
    recipient: '',
    content: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMessageData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/api/messages/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(messageData),
    })
      .then((response) => response.json())
      .then(() => {
        onMessageSave();
      });
  };

  return (
    <div>
      <h2>Add Message</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Recipient:</label>
          <input
            type="text"
            name="recipient"
            value={messageData.recipient}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Content:</label>
          <textarea
            name="content"
            value={messageData.content}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
};

export default MessagingForm;
