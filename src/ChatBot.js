// filepath: c:\Users\Jake\outreach-app\src\ChatBot.js
import React, { useState } from 'react';
import axios from 'axios';
import regionalServices from './regional_services.json'; // Ensure the path is correct

function ChatBot() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const handleQuerySubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('Sending request to server with query:', query);
      const result = await axios.post('http://localhost:3001/api/openai', { query });

      console.log('Received response from server:', result.data);
      const aiResponse = result.data.choices[0].text.trim();
      const filteredResources = filterResources(aiResponse);
      setResponse(filteredResources);
    } catch (err) {
      console.error('Error fetching response from server:', err.response ? err.response.data : err.message);
      setError('Error fetching response from server');
    } finally {
      setLoading(false);
    }
  };

  const filterResources = (aiResponse) => {
    // Implement your logic to filter resources based on the AI response
    // For example, you can search for keywords in the resource list
    return regionalServices.filter(resource => 
      resource.name.toLowerCase().includes(aiResponse.toLowerCase()) ||
      resource.description.toLowerCase().includes(aiResponse.toLowerCase())
    );
  };

  return (
    <div>
      <h2>Chat Bot</h2>
      <div>
        <label>
          Enter your query:
          <input
            type="text"
            value={query}
            onChange={handleQueryChange}
          />
        </label>
        <button onClick={handleQuerySubmit} disabled={loading}>
          {loading ? 'Loading...' : 'Submit'}
        </button>
      </div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {response && (
        <div>
          <h3>Response</h3>
          <ul>
            {response.map((resource, index) => (
              <li key={index}>
                <strong>{resource.name}</strong>: {resource.description}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ChatBot;