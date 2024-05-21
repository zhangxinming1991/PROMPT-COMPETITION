import React, { useState, useContext, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; // 引入 useNavigate
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from '../context/AuthContext';
import '../Submit.css'; // 引入自定义的CSS文件

function Submit() {
  const { id } = useParams();
  const navigate = useNavigate(); // 获取 navigate 函数
  const [prompt, setPrompt] = useState('');
  const [problem, setProblem] = useState(null);
  const [history, setHistory] = useState([]);
  const { user } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchHistory = useCallback((page = 1) => {
    return axios.get(`/api/submissions/${id}`, { params: { page, per_page: 10 } })
      .then(response => {
        setHistory(response.data.submissions);
        setCurrentPage(response.data.current_page);
        setTotalPages(response.data.pages);
      })
      .catch(error => {
        console.error('There was an error fetching the submission history!', error);
      });
  }, [id]);

  const manualFetchHistory = (page = 1) => {
    fetchHistory(page)
      .then(() => {
        toast.success('Submission history refreshed successfully!', {
          autoClose: 1500, // 设置提示框停留时间为2秒
          hideProgressBar: false, // 显示进度条
          progressClassName: 'faster-progress' // 自定义进度条样式
        });
      })
      .catch(() => {
        toast.error('There was an error refreshing the submission history!', {
          autoClose: 1500, // 设置提示框停留时间为2秒
          hideProgressBar: false, // 显示进度条
          progressClassName: 'faster-progress' // 自定义进度条样式
        });
      });
  };

  useEffect(() => {
    axios.get(`/api/problems/${id}`)
      .then(response => {
        setProblem(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the problem!', error);
      });

    fetchHistory();
  }, [id, fetchHistory]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!user) {
      console.error('User not logged in');
      return;
    }
    axios.post(`/api/submit/${id}`, { prompt })
      .then(() => {
        toast.success('Submission successful!', {
          autoClose: 1500, // 设置提示框停留时间为2秒
          hideProgressBar: false, // 显示进度条
          progressClassName: 'faster-progress' // 自定义进度条样式
        });
        fetchHistory();
      })
      .catch(error => {
        toast.error('There was an error submitting the prompt!', {
          autoClose: 1500, // 设置提示框停留时间为2秒
          hideProgressBar: false, // 显示进度条
          progressClassName: 'faster-progress' // 自定义进度条样式
        });
        console.error('There was an error submitting the prompt!', error);
      });
  };

  const handlePageChange = (newPage) => {
    fetchHistory(newPage);
  };

  return (
    <div className="submit-container">
      <button className="back-home-button" onClick={() => navigate('/')}>Back to Home</button> {/* 添加返回首页按钮 */}
      <h1>{problem ? problem.title : 'Loading...'}</h1>
      <p>{problem ? problem.description : 'Loading...'}</p>
      <form onSubmit={handleSubmit}>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows="10"
          cols="50"
          required
        />
        <button type="submit">Submit</button>
      </form>
      <div className="table-header">
        <h2>Submission History</h2>
        <button className="refresh-button" onClick={() => manualFetchHistory(currentPage)}>Refresh</button>
      </div>
      {history.length > 0 ? (
        <div>
          <table>
            <thead>
              <tr>
                <th>Submission ID</th>
                <th>Prompt</th>
                <th>Output</th>
                <th>Score</th>
                <th>Status</th>
                <th>Submitted At</th>
                <th>Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.prompt}</td>
                  <td>{JSON.stringify(item.output)}</td>
                  <td>{item.score}</td>
                  <td>{item.status}</td>
                  <td>{new Date(item.created_at).toLocaleString()}</td>
                  <td>{new Date(item.updated_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                disabled={page === currentPage}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <p>No submissions yet</p>
      )}
      <ToastContainer />
    </div>
  );
}

export default Submit;
