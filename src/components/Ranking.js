import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Rankings() {
  const { problemId } = useParams();
  const navigate = useNavigate(); // 获取 navigate 函数
  const [rankings, setRankings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchRankings = useCallback((page = 1) => {
    return axios.get(`/api/rankings/${problemId}`, { params: { page, per_page: 10 } })
      .then(response => {
        setRankings(response.data.rankings);
        setCurrentPage(response.data.current_page);
        setTotalPages(response.data.pages);
      })
      .catch(error => {
        console.error('There was an error fetching the rankings!', error);
      });
  }, [problemId]);

  const manualFetchRankings = (page = 1) => {
    fetchRankings(page)
      .then(() => {
        toast.success('Rankings refreshed successfully!', {
          autoClose: 1500, // 设置提示框停留时间为3秒
          hideProgressBar: false, // 显示进度条
          progressClassName: 'faster-progress' // 自定义进度条样式
        });
      })
      .catch(() => {
        toast.error('There was an error refreshing the rankings!', {
          autoClose: 3000, // 设置提示框停留时间为3秒
          hideProgressBar: false, // 显示进度条
          progressClassName: 'faster-progress' // 自定义进度条样式
        });
      });
  };

  useEffect(() => {
    fetchRankings();
  }, [fetchRankings]);

  const handlePageChange = (newPage) => {
    fetchRankings(newPage);
  };

  return (
    <div>
      <h1>Rankings</h1>
      <button onClick={() => navigate('/')}>Back to Home</button> {/* 添加返回首页按钮 */}
      <button onClick={() => manualFetchRankings(currentPage)}>Refresh Rankings</button>
      <ToastContainer />
      {rankings.length > 0 ? (
        <div>
          <table>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Username</th>
                <th>Score</th>
                <th>Prompt</th>
                <th>Output</th>
                <th>created_at</th>
                <th>updated_at</th>
              </tr>
            </thead>
            <tbody>
              {rankings.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1 + (currentPage - 1) * 10}</td>
                  <td>{item.username}</td>
                  <td>{item.score}</td>
                  <td>{item.prompt}</td>
                  <td>{JSON.stringify(item.output)}</td>
                  <td>{item.created_at}</td>
                  <td>{item.updated_at}</td>
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
        <p>No rankings available</p>
      )}
    </div>
  );
}

export default Rankings;
