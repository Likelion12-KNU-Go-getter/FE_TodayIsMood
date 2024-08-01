// Calendar.jsx
import React, { useState, useEffect } from 'react';
import './CalendarPage.css';
import axios from 'axios';

const Calendar = ({ posts = [], onAddPost }) => {
  const [date, setDate] = useState(new Date());
  const [monthlyPosts, setMonthlyPosts] = useState([]);

  useEffect(() => {
    // API를 사용하여 현재 년도와 월에 해당하는 그림일기 데이터를 가져오기
    const fetchMonthlyPosts = async () => {
      try {
        const year = date.getFullYear();
        const month = date.getMonth() + 1; // 월은 0부터 시작하므로 1씩 더한다.
        const response = await axios.get(`/api/calender/${year}/${month}`, {
          headers: {
            'Authorization': 'Bearer jwt-token' // JWT 토큰
          }
        });
        setMonthlyPosts(response.data.Diary || []); // 월간 데이터를 상태에 저장
      } catch (error) {
        console.error('Error fetching monthly posts:', error.response ? error.response.data : error.message);
      }
    };

    fetchMonthlyPosts();
  }, [date]);

  const handlePrevMonth = () => {
    const prevMonth = new Date(date.setMonth(date.getMonth() - 1));
    setDate(new Date(prevMonth));
  };

  const handleNextMonth = () => {
    const nextMonth = new Date(date.setMonth(date.getMonth() + 1));
    setDate(new Date(nextMonth));
  };

  const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();

  const renderCalendar = () => {
    const days = [];
    const year = date.getFullYear();
    const month = date.getMonth();
    const totalDays = daysInMonth(month, year);
    const startDay = new Date(year, month, 1).getDay();

    for (let i = 0; i < startDay; i++) {
      days.push(<div className="calendar-day empty" key={`empty-${i}`}></div>);
    }

    for (let i = 1; i <= totalDays; i++) {
      const dayPosts = monthlyPosts.filter(post => {
        const postDate = new Date(post.created);
        return postDate.getFullYear() === year && postDate.getMonth() === month && postDate.getDate() === i;
      });

      days.push(
        <div className="calendar-day" key={`day-${i}`} onClick={() => onAddPost(new Date(year, month, i))}>
          <div className="day-number">{i}</div>
          {dayPosts.map((post, index) => (
            <div className="event-icon" key={`post-${index}`}>
              <img src={post.imageurl} alt="event" />
            </div>
          ))}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="calendar-page">
      <div className="calendar-header">
        <button onClick={handlePrevMonth}>{'<'}</button>
        <div className="calendar-month-year">{date.toLocaleString('en-US', { month: 'long', year: 'numeric' })}</div>
        <button onClick={handleNextMonth}>{'>'}</button>
      </div>
      <div className="calendar-day-headers">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
          <div className={`calendar-day-header ${day === 'Sun' ? 'sunday' : ''}`} key={`header-${index}`}>{day}</div>
        ))}
      </div>
      <div className="calendar-container">
        <div className="calendar-grid">
          {renderCalendar()}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
