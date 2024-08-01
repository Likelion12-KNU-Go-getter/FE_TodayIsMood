// Feed.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CalendarPage.css'; // CSS 파일의 정확한 경로와 이름으로 수정

const Feed = ({ posts, onSave }) => {
  const [allPosts, setAllPosts] = useState(posts);

  useEffect(() => {
    // API를 사용하여 모든 그림일기 데이터를 가져오기
    const fetchAllPosts = async () => {
      try {
        const response = await axios.get('/api/feed', {
          headers: {
            'Authorization': 'Bearer jwt-token' // JWT 토큰
          }
        });
        console.log('Fetch All Posts Response:', response.data); // 응답 바디를 콘솔에 출력
        setAllPosts(response.data.Diary || []); // 모든 데이터를 상태에 저장
      } catch (error) {
        console.error('Error fetching posts:', error.response ? error.response.data : error.message);
      }
    };

    fetchAllPosts();
  }, []);

  return (
    <div className="feed-container">
      <div className="feed-content">
        {allPosts.map((post, index) => (
          <div className="post" key={index}>
            <img src={post.imageurl} alt="post" style={{ width: '100%', borderRadius: '10px' }} />
            <div>{post.title}</div>
            <div>{new Date(post.created).toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feed;
