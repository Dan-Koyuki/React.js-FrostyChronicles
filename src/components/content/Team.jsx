import React from 'react';
import { useNavigate } from 'react-router-dom';

const Team = () => {

  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/home');
  }

  return (
    <div className='team-container'>
      <div className='titles'>
        <button onClick={handleBack}>Back</button>
        <h2>Team</h2>
      </div>
      <div className='team'>
        <div className='names'></div>
        <div className='details'></div>
      </div>
    </div>
  )
}

export default Team;