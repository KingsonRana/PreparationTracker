
import React from 'react';

const inputStyle = {
  width: '100%',
  padding: '8px',
  marginTop: '4px',
  marginBottom: '16px',
  border: '1px solid #ccc',
  borderRadius: '4px',
};

const labelStyle = {
  fontWeight: 'bold',
};

const buttonStyle = {
  backgroundColor: '#4CAF50',
  border: 'none',
  color: 'white',
  padding: '10px 20px',
  textAlign: 'center',
  textDecoration: 'none',
  display: 'inline-block',
  fontSize: '16px',
  margin: '4px 2px',
  cursor: 'pointer',
  borderRadius: '4px',
};

export default function ProblemDetails() {
  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>Problem Details</h1>
      <form>
        <div>
          <label htmlFor="id" style={labelStyle}>ID</label>
          <input id="id" type="text" placeholder="Enter problem ID" style={inputStyle} />
        </div>
        
        <div>
          <label htmlFor="name" style={labelStyle}>Name</label>
          <input id="name" type="text" placeholder="Enter problem name" style={inputStyle} />
        </div>
        
        <div>
          <label htmlFor="level" style={labelStyle}>Level</label>
          <select id="level" style={inputStyle}>
            <option value="">Select difficulty level</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="link" style={labelStyle}>Link</label>
          <input id="link" type="url" placeholder="Enter problem link" style={inputStyle} />
        </div>
        
        <div style={{ marginBottom: '16px' }}>
          <input id="requirerework" type="checkbox" style={{ marginRight: '8px' }} />
          <label htmlFor="requirerework" style={labelStyle}>Requires Rework</label>
        </div>
        
        <div>
          <label htmlFor="createdon" style={labelStyle}>Created On</label>
          <input id="createdon" type="date" style={inputStyle} />
        </div>
        
        <div>
          <label htmlFor="updatedon" style={labelStyle}>Updated On</label>
          <input id="updatedon" type="date" style={inputStyle} />
        </div>
        
        <div>
          <label htmlFor="approach" style={labelStyle}>Approach</label>
          <textarea 
            id="approach" 
            placeholder="Enter your approach here" 
            style={{...inputStyle, height: '120px'}}
          ></textarea>
        </div>
        
        <button type="submit" style={buttonStyle}>Save</button>
      </form>
    </div>
  );
}