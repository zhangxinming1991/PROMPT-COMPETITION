import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/AuthContext';

function Home() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  useEffect(() => {
    axios.get('/api/problems')
      .then(response => {
        setProblems(response.data);
      });
  }, []);

  return (
    <div>
      <h1>Prompt Competition</h1>
      {user ? (
        <>
          <button onClick={logout}>Logout</button>
          <ul>
            {problems.map(problem => (
              <li key={problem.id}>
                <Link to={`/submit/${problem.id}`}>{problem.title}</Link>
              </li>
            ))}
          </ul>
          <Link to="/rankings">View Overall Rankings</Link>
        </>
      ) : (
        <>
          <p>Please <Link to="/login">Login</Link> or <Link to="/register">Register</Link></p>
        </>
      )}
    </div>
  );
}

export default Home;
