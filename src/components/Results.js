import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Results() {
  const { id } = useParams();
  const [results, setResults] = useState([]);
  const [user, setUser] = useState('');  // Add user state

  useEffect(() => {
    axios.get(`/api/results/${id}`)
      .then(response => {
        setResults(response.data);
      });
  }, [id]);

  const userResults = results.filter(result => result.user === user);

  return (
    <div>
      <h1>Results</h1>
      <label>
        User:
        <input
          type="text"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
      </label>
      <ul>
        {userResults.map((result, index) => (
          <li key={index}>
            <pre>{JSON.stringify(result, null, 2)}</pre>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Results;
