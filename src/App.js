import React, { useState } from 'react';

function App() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/messages', {
        method: 'POST',
        body: message,
        credentials: 'include',
        headers: {
          'Content-Type': 'text/plain'
        }
      });
      if (response.ok) {
        setMessage('');
      }
    } catch (error) {
      console.error('Error submitting message:', error);
    }
  };

  const handleGetMessages = async () => {
    try {
      const response = await fetch('http://localhost:8080/messages', {
        method: 'GET',
        credentials: 'include'
      });
      if (response.ok) {
        const data = await response.json();
        setMessages(data);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
      <input 
        type="text" 
        value={message} 
        onChange={(e) => setMessage(e.target.value)} 
        style={{ marginBottom: '10px', padding: '5px' }} 
      />
      <button onClick={handleSubmit} style={{ marginBottom: '10px', padding: '5px' }}>Submit</button>
      <button onClick={handleGetMessages} style={{ padding: '5px' }}>Get Messages</button>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {messages.map((msg, index) => (
          <li key={index} style={{ marginBottom: '5px' }}>{msg}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
