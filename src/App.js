import { useState } from 'react';

function App() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:8080/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain'
      },
      body: message,
      credentials: 'include'
    });
    setMessage('');
  };

  const handleGetMessages = async () => {
    const response = await fetch('http://localhost:8080/messages', { credentials: 'include' });
    const data = await response.json();
    setMessages(data);
  };

  return (
    <div style={{padding: '20px'}}>
      <h1>Message Sender</h1>
      <form onSubmit={handleSubmit} style={{display: 'flex', marginBottom: '10px'}}>
        <input 
          type="text" 
          value={message} 
          onChange={(e) => setMessage(e.target.value)} 
          style={{flex: 1, padding: '8px', marginRight: '10px'}} 
        />
        <button type="submit" style={{padding: '8px', backgroundColor: 'lightgreen', border: 'none', cursor: 'pointer'}}>Submit</button>
      </form>
      <button onClick={handleGetMessages} style={{padding: '8px', backgroundColor: 'lightblue', border: 'none', cursor: 'pointer'}}>Get Messages</button>
      <ul style={{listStyle: 'none', padding: 0}}>
        {messages.map((msg, index) => (
          <li key={index} style={{marginBottom: '5px'}}>{msg}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
