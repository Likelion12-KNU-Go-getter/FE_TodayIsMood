import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation, useNavigate } from 'react-router-dom';
import Calendar from './components/Calendar';
import Feed from './components/Feed';
import DrawingPage from './components/DrawingPage';
import IntroPage from './components/IntroPage';
import Auth from './components/AuthPage';
import './components/CalendarPage.css';
import './components/AuthPage.module.css';


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
  const [authenticated, setAuthenticated] = useState(true); // 임시로 true

  const handleSavePost = (newPost) => {
    setPosts([...posts, newPost]);
  };

  return (
    <Router>
      <Routes>
        {/* Auth와 IntroPage는 같은 authBackground 레이아웃을 사용 */}
        <Route
          path="/auth"
          element={
            <div className="authBackground">
              <Auth setAuthenticated={setAuthenticated} />
            </div>
          }
        />
        <Route
          path="/"
          element={
            <div className="authBackground">
              <IntroPage />
            </div>
          }
        />
        {/* 인증된 사용자만 접근할 수 있는 다른 페이지들 */}
        <Route
          path="*"
          element={
            <div className="app-container">
              {authenticated && <Sidebar />}
              <div className="main-content">
                <Routes>
                  {authenticated && (
                    <>
                      <Route path="/calendar" element={<Calendar posts={posts} onAddPost={handleSavePost} />} />
                      <Route path="/feed" element={<Feed posts={posts} onSave={handleSavePost} />} />
                      <Route path="/drawing" element={<DrawingPage onSave={handleSavePost} />} />
                    </>
                  )}
                </Routes>
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
