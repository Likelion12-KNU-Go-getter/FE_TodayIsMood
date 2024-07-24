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
  const [posts, setPosts] = useState([]); // Api 받으려면 빈배열로 초기화해야됨

  const handleSavePost = (newPost) => {
    setPosts([...posts, newPost]);
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
        </div>
      </div>
    </Router>
  );
};

export default App;
