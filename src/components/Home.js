import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import '../Home.css'; // 引入自定义的CSS文件

function Home() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  useEffect(() => {
    axios.get('/api/problems')
      .then(response => {
        setProblems(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Failed to fetch problems');
        setLoading(false);
        console.error('There was an error fetching the problems!', error);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="home-container">
      <div className="header">
        <h1>Prompt Competition</h1>
        {user && (
          <div className="user-info-container">
            <div className="user-info">
              <p>Welcome, {user.username}!</p>
              <p>Email: {user.email}</p>
            </div>
            <button className="logout-button" onClick={logout}>Logout</button>
          </div>
        )}
      </div>
      {user ? (
        <>
          {problems.length > 0 ? (
            <ul className="problems-list">
              {problems.map(problem => (
                <li key={problem.id}>
                  <div>
                    <strong>{problem.title}</strong>
                  </div>
                  <div>
                    <Link to={`/submit/${problem.id}`} className="problem-link">Submit Your Prompt</Link>
                    <Link to={`/rankings/${problem.id}`} className="problem-link">View Rankings</Link>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No problems available</p>
          )}
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
