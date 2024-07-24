// Feed.jsx
import React, { useState } from 'react';
import './CalendarPage.css';
import DrawingPage from './DrawingPage';

const Feed = ({ posts, onSave }) => {
  const [showDrawingPage, setShowDrawingPage] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleSaveDrawing = (imageData, moodText, date) => {
    const newPost = {
      image: imageData,
      mood: moodText,
      date: date // DrawingPage에서 전달된 날짜를 사용
    };
    onSave(newPost);
    setShowDrawingPage(false);
  };

  if (showDrawingPage) {
    return <DrawingPage onSave={handleSaveDrawing} selectedDate={selectedDate} />;
  }

  const handleAddPost = (date) => {
    setSelectedDate(date);
    setShowDrawingPage(true);
  };

  return (
    <div className="feed-container">
      <button className="add-post-button" onClick={() => handleAddPost(new Date().toISOString())}>+</button>
      <div className="feed-content">
        {posts.map((post, index) => (
          <div className="post" key={index}>
            <img src={post.image} alt="post" style={{ width: '100%', borderRadius: '10px' }} />
            <div>{post.mood}</div>
            <div>{new Date(post.date).toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feed;
