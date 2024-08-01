// App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import Calendar from './components/Calendar';
import Feed from './components/Feed';
import DrawingPage from './components/DrawingPage';
import './components/CalendarPage.css';

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="sidebar">
      <Link to="/calendar">
        <button className={location.pathname === '/calendar' ? 'active' : ''}>Calendar</button>
      </Link>
      <Link to="/feed">
        <button className={location.pathname === '/feed' ? 'active' : ''}>Feed</button>
      </Link>
      <Link to="/drawing">
        <button className={location.pathname === '/drawing' ? 'active' : ''}>Draw</button>
      </Link>
    </div>
  );
};

const App = () => {
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState('');

  // API를 통해 모든 그림일기 가져오기
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('/api/feed', {
          headers: {
            'Authorization': 'Bearer jwt-token' // JWT 토큰은 실제 값으로 교체
          }
        });
        console.log('Fetch Posts Response:', response.data); // 응답 바디를 콘솔에 출력
        setPosts(response.data.Diary); // 받아온 데이터를 상태로 저장
      } catch (error) {
        console.error('Error fetching posts:', error.response ? error.response.data : error.message);
      }
    };

    fetchPosts();
  }, []);

  // 그림일기 저장 핸들러
  const handleSavePost = async (newPost) => {
    try {
      const response = await axios.post('/api/create', {
        title: newPost.mood, // title 필드에 적절한 값을 전달
        imageUrl: newPost.image // imageUrl 필드에 적절한 값을 전달
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer jwt-token' // JWT 토큰은 실제 값으로 교체
        }
      });

      console.log('Save Post Response:', response.data); // 응답 바디를 콘솔에 출력

      if (response.data.success) {
        setPosts([...posts, newPost]); // 새 게시물을 상태에 추가
        setMessage('Diary created successfully.'); // 성공 메시지 설정
      } else {
        console.error('Failed to create post:', response.data.message);
        setMessage('Failed to create diary.'); // 실패 메시지 설정
      }
    } catch (error) {
      console.error('Error saving post:', error.response ? error.response.data : error.message);
      setMessage('Error saving diary.'); // 오류 메시지 설정
    }
  };

  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/calendar" element={<Calendar posts={posts} onAddPost={handleSavePost} />} />
            <Route path="/feed" element={<Feed posts={posts} onSave={handleSavePost} />} />
            <Route path="/drawing" element={<DrawingPage onSave={handleSavePost} />} />
          </Routes>
          {message && <div className="message">{message}</div>} {/* 메시지 표시 */}
        </div>
      </div>
    </Router>
  );
};

export default App;
