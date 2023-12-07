import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleAdventure = () => {
    navigate('/adventure');
  }
  
  const auth = useSelector((state) => state.auth);
  console.log(auth);

  const teams = [{
    _id: 1
  },{
    _id: 2
  }]
  return (
    <div className='homepage-container'>
      <>
      <h2>Battle Frontier</h2>
      <div className='battle-setting-container'>
        <div className='team-selection'>
          <div className='team'>
            <span>Team: </span>
            <select>
              <option value={'team'}>Team</option>
            </select>
          </div>
          {teams && 
            teams?.map((member) => (
              <div key={member._id} className='members'>
                {/* Team details here */}
              </div>
            ))}
        </div>
        <div className='opponent-selection'>
          <div className="opponent">
            <p>Choose Opponent</p>
            <label>Team:</label>
            <select>
              <option>TeamA</option>
            </select>
            <label>Difficulty:</label>
            <select>
              <option value="easy">Easy</option>
            </select>
            <button className='battleBtn'>Battle!</button>
            <button className='adventureBtn' onClick={handleAdventure}>Adventure</button>
          </div>
        </div>
      </div>
      </>
    </div>
  )
}

export default Home;