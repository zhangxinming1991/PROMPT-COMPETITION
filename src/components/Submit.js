import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Submit() {
  const { id } = useParams();
  const [prompt, setPrompt] = useState('');
  const [user, setUser] = useState('');  // Add user state
  const [response, setResponse] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post(`/api/submit/${id}`, { prompt, user })  // Include user in request
      .then(response => {
        setResponse(response.data);
      });
  };

  return (
    <div>
      <h1>Submit Your Prompt</h1>
      <form onSubmit={handleSubmit}>
        <label>
          User:
          <input
            type="text"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
        </label>
        <br />
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows="10"
          cols="50"
        />
        <button type="submit">Submit</button>
      </form>
      {response && (
        <div>
          <h2>Result</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default Submit;

