import React, { useState } from 'react';

const ExamPreparationForm = ({clicked, setForm}) => {
  const [name, setName] = useState('');
  const [prepStartDate, setPrepStartDate] = useState('');
  const [prepEndDate, setPrepEndDate] = useState('');
  const [examDate, setExamDate] = useState('');
  const [dailyStudyHours, setDailyStudyHours] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted", { name, prepStartDate, prepEndDate, examDate, dailyStudyHours });
  };

  const handleClose = () => {
    setForm(!clicked)
    console.log("Form closed");
    // Add logic to close or hide the form
  };

  const inputStyle = {
    width: '100%',
    padding: '3px',
    marginTop: '4px',
    marginBottom: '12px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  };

  const labelStyle = {
    fontSize:'small',
    fontWeight: 'light',
    color: 'black',
  };

  const buttonStyle = {
    padding: '10px 15px',
    backgroundColor: '#4a90e2',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  };

  const closeButtonStyle = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: 'none',
    border: 'none',
    fontSize: '18px',
    cursor: 'pointer',
  };

  return (
    <div style={{ 
      maxWidth: '500px', 
      margin: '0 auto', 
      padding: '20px',  
      borderRadius: '8px',
      position: 'relative',
      border:'1px solid white',
      borderRadius:'0px'
    }}>
      <button onClick={handleClose} style={closeButtonStyle}>×</button>
      <form onSubmit={handleSubmit}>
        <div>
          <label style={labelStyle}>
            Name <span style={{ color: 'red' }}>*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>
            Preparation Start Date <span style={{ color: 'red' }}>*</span>
          </label>
          <input
            type="date"
            value={prepStartDate}
            onChange={(e) => setPrepStartDate(e.target.value)}
            required
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>
            Preparation End Date <span style={{ color: 'red' }}>*</span>
          </label>
          <input
            type="date"
            value={prepEndDate}
            onChange={(e) => setPrepEndDate(e.target.value)}
            required
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>Exam Date (Optional)</label>
          <input
            type="date"
            value={examDate}
            onChange={(e) => setExamDate(e.target.value)}
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>Daily Study Hours</label>
          <input
            type="number"
            value={dailyStudyHours}
            onChange={(e) => setDailyStudyHours(e.target.value)}
            min="0"
            step="0.5"
            style={inputStyle}
          />
        </div>
        <button type="submit" style={buttonStyle}>Submit</button>
      </form>
    </div>
  );
};

export default ExamPreparationForm;