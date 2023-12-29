import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setBattlers } from '../features/battleSlice';
import styled from 'styled-components';
import { fetchTeam } from '../features/teamSlice';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { staticTeam } = useSelector((state) => state.pokemons);
  const { teams } = useSelector((state) => state.team);

  const [botSelected, setBotSelected] = useState('');
  const [userSelected, setUserSelected] = useState('');
  const [prevTeam, setPrevTeam] = useState();

  useEffect(() => {
    if (userSelected !== null){
      staticTeam.forEach((team) => {
        if (team.TeamID === userSelected){
          setPrevTeam(team);
        }
      })
    }
  }, [userSelected]);

  useEffect(() => {
    dispatch(fetchTeam({userID: auth._id}));
  }, [])

  useEffect(() => {
    console.log(teams); // Log the teams here to see the updated state
  }, [teams]);

  const handleAdventure = () => {
    navigate('/adventure');
  }

  const handleBattle = () => {
    console.log("user: ", userSelected);
    console.log("bot: ", botSelected);
    if (userSelected !== '' && botSelected !== ''){
      dispatch(setBattlers({bot: botSelected, player: userSelected}));
      navigate('/battle');
    }
  }

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
              {teams?.map((team) => (
                <option key={team._id} value={team._id}>{team.name}</option>
              ))}
            </select>
            <p>Currently, team created from Team menu cant be used. Please dont select it.</p>
          </div>
          <TeamPreview>
            {prevTeam?.Member.map((pokemon, index) => (
              <MemberPreview key={index}>
                <h2>{pokemon.name}</h2>
                <img src={pokemon.sprite} alt="image-pokemon" />
                {pokemon.moves?.map((move) => (
                  <p>{move}</p>
                ))}
              </MemberPreview>
            ))}
          </TeamPreview>
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

const TeamPreview = styled.div`
  height: 440px;
  width: 850px;
  display: flex;
  flex-wrap: wrap;
  overflow-y: auto;
  justify-content: space-between;
  padding: 0 1rem;
`

const MemberPreview = styled.div`
  width: 245px;
  height: 415px;
  margin: 1rem 0;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 0.5rem;
  background-color: rgba(116, 114, 114, 0.7);
  border-radius: 10px;

  img{
    width: 100%;
    max-width: 200px;
    height: 100%;
    max-height: 200px;
  }
  p{
    color: white;
    margin-top: 5px;
  }
`
