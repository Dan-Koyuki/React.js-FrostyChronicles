import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setBattlers } from '../features/battleSlice';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { staticTeam } = useSelector((state) => state.pokemons);

  const [botSelected, setBotSelected] = useState();
  const [userSelected, setUserSelected] = useState('');

  const handleAdventure = () => {
    navigate('/adventure');
  }

  const handleBattle = () => {
    console.log("user: ", userSelected);
    console.log("bot: ", botSelected);
    dispatch(setBattlers({bot: botSelected, player: userSelected}));
    navigate('/battle');
  }
  
  // const { teams } = useSelector((state) => state.team); // get Teams Collection

  return (
    <div className='homepage-container'>
      <>
      <h2>Battle Frontier</h2>
      <div className='battle-setting-container'>
        <div className='team-selection'>
          <div className='team'>
            <span>Team: </span>
            <select onChange={(e) => setUserSelected(e.target.value)}>
              <option value=''>Select Team</option>
              {staticTeam && staticTeam?.map((team) => (
                <option key={team.TeamID} value={team.TeamID}>{team.TeamID}</option>
              ))}
            </select>
            <p>Currently, team created from Team menu cant be used</p>
          </div>
          <h1>Was reserved to display selected team</h1>
          {}
        </div>
        <div className='opponent-selection'>
          <div className="opponent">
            <p>Choose Opponent</p>
            <label>Team:</label>
            <select onChange={(e) => setBotSelected(e.target.value)}>
              <option value=''>Select Team</option>
              {staticTeam && staticTeam?.map((team) => (
                <option key={team.TeamID} value={team.TeamID}>{team.TeamID}</option>
              ))}
            </select>
            <label>Difficulty:</label>
            <select>
              <option value="easy">Easy</option>
            </select>
            <button className='battleBtn' onClick={() => handleBattle()}>Battle!</button>
            <button className='adventureBtn' onClick={handleAdventure}>Adventure</button>
          </div>
        </div>
      </div>
      </>
    </div>
  )
}

export default Home;