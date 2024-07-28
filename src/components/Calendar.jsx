<<<<<<< HEAD
// Calendar.jsx
import React, { useState } from 'react';
import './CalendarPage.css';

const Calendar = ({ posts = [], onAddPost }) => {
  const [date, setDate] = useState(new Date());

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
      const dayPosts = posts.filter(post => {
        const postDate = new Date(post.date);
        return postDate.getFullYear() === year && postDate.getMonth() === month && postDate.getDate() === i;
      });

      days.push(
        <div className="calendar-day" key={`day-${i}`} onClick={() => onAddPost(new Date(year, month, i))}>
          <div className="day-number">{i}</div>
          {dayPosts.map((post, index) => (
            <div className="event-icon" key={`post-${index}`}>
              <img src={post.image} alt="event" />
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

=======
// Calendar.jsx
import React, { useState } from 'react';
import './CalendarPage.css';

const Calendar = ({ posts = [], onAddPost }) => {
  const [date, setDate] = useState(new Date());

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
      const dayPosts = posts.filter(post => {
        const postDate = new Date(post.date);
        return postDate.getFullYear() === year && postDate.getMonth() === month && postDate.getDate() === i;
      });

      days.push(
        <div className="calendar-day" key={`day-${i}`} onClick={() => onAddPost(new Date(year, month, i))}>
          <div className="day-number">{i}</div>
          {dayPosts.map((post, index) => (
            <div className="event-icon" key={`post-${index}`}>
              <img src={post.image} alt="event" />
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

>>>>>>> 728365fc0bb64a3b13ee508b4b783211b50135b6
export default Calendar;