import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createTeam, fetchTeam } from '../../features/teamSlice';
import { addMember } from '../../features/memberSlice';

const Team = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const userId = auth._id.toString();

  // Team
  const [newTeam, setNewTeam] = useState(''); //this is toggle to display form to add new Team
  const [team, setTeam] = useState({
    name: '',
    userID: userId
  });
  const { teams } = useSelector((state) => state.team);
  useEffect(() => {
    // Fetch teams based on the userID when the component mounts
    dispatch(fetchTeam(team));
  }, [dispatch, team]);
  const [selectedTeam, setSelectedTeam] = useState();

  // Team's Member
  const [newMember, setNewMember] = useState(''); //this is toggle to display form to add new member to a team
  // eslint-disable-next-line no-unused-vars
  const [member, setMember] = useState({
    teamID: '',
    pokemonName: '',
    ability: '',
    item: '',
    ivHP: 0,
    ivATK: 0,
    ivDEF: 0,
    ivSPA: 0,
    ivSPD: 0,
    ivSPE: 0,
    evHP: 0,
    evATK: 0,
    evDEF: 0,
    evSPA: 0,
    evSPD: 0,
    evSPE: 0,
    moves1: '',
    moves2: '',
    moves3: '',
    moves4: '',
  })
  const { members } = useSelector((state) => state.member);
  useEffect(() => {
    // Fetch teams based on the userID when the component mounts
    dispatch(fetchTeam(members));
  }, [dispatch, members]);

  const handleBack = () => {
    navigate('/home');
  }
  const showCreateForm = () => {
    setNewTeam(true);
  }
  // eslint-disable-next-line no-unused-vars
  const showMemberRec = () => {
    setNewMember(true);
  }
  const handleTeamCreation = (e) => {
    e.preventDefault();
    dispatch(createTeam(team));
    setNewTeam(false);
  }
  // eslint-disable-next-line no-unused-vars
  const handleMemberAddition = (e) => {
    e.preventDefault();
    dispatch(addMember(member));
    setNewMember(false);
  }

  return (
    <div className='team-container'>
      <div className='titles'>
        <button onClick={handleBack}>Back</button>
        <h2>Team</h2>
      </div>
      <div className='team'>
        <div className='names'>
          {teams &&
            teams?.map((tim) => (
              <div key={tim._id} onClick={() => setSelectedTeam(tim)}>
                {tim.name}
              </div>
            ))}
          <button onClick={showCreateForm}>Add Team</button>
          {newTeam ? <form onSubmit={handleTeamCreation}>
            <input type='text' placeholder='Team name' onChange={(e) => setTeam({...team, name: e.target.value})}/>
            <button>create</button>
          </form> : null}
        </div>
        <div className='details'>
          {selectedTeam ? (
          <>
            {members &&
              members?.map((pokemon) => (
                <div key={pokemon._id}>
                  {pokemon.pokemonName}
                </div>
              ))}
            {newMember && selectedTeam.length < 6 ? 
              <form></form> : 
              newMember && selectedTeam.length >= 6 ? null : <button>Add</button>}
          </> ) : null
          }
        </div>
      </div>
    </div>
  )
}

export default Team;