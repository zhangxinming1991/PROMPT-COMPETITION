import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Ranking() {
  const [rankings, setRankings] = useState([]);

  useEffect(() => {
    axios.get('/api/rankings')
      .then(response => {
        setRankings(response.data);
      });
  }, []);

  return (
    <div>
      <h1>Overall Rankings</h1>
      <ul>
        {rankings.map((ranking, index) => (
          <li key={index}>
            <p>User: {ranking.user}</p>
            <pre>{JSON.stringify(ranking, null, 2)}</pre>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Ranking;
