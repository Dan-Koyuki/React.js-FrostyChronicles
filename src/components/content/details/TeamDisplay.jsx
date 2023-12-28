import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { fetchMember } from '../../../features/memberSlice';
import TeamMemberDetails from './TeamMemberDetails';

const TeamDisplay = () => {

  const dispatch = useDispatch();
  const { teams } = useSelector((state) => state.team);
  const { members, membertotal } = useSelector((state) => state.member);
  const [isTeamSelected, setSelectedTeam] = useState(false);
  const [isMemberSelected, setSelectedMember] = useState(false);
  const [SelectedMemberID, setMemberID] = useState('');

  const handleSelectTeam = (pTeamID) => {
    setSelectedTeam(true);
    dispatch(fetchMember({teamID: pTeamID}));
    console.log("members", members);
  };

  const handleSelectPokemon = (pPokemonID) => {
    setMemberID(pPokemonID);
    setSelectedMember(true);
  }

  return (
    <>
    <Display>
      { teams?.map((team) => (
        <TeamName key={team._id} onClick={() => handleSelectTeam(team._id)}>{team.name}</TeamName>
      ))}
      <AddButton>Add</AddButton>
    </Display>
    {isTeamSelected ? 
      (
        <>
        <Display>
          {members?.map((pokemon) => (
            <TeamName key={pokemon._id} onClick={() => handleSelectPokemon(pokemon._id)}>{pokemon.pokemonName}</TeamName>
          ))}
          {membertotal === 6 ? null : (
            <AddButton>Add</AddButton>
          )}
        </Display>
        {isMemberSelected ?
          (
            <TeamMemberDetails pokemonID={SelectedMemberID}></TeamMemberDetails>
          ) : null
        }
        </>
      ) : null
    }
    </>
  );
}
 
export default TeamDisplay;

const Display = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  max-width: 350px;
  height: 100%;
  max-height: 535px;
  border-radius: 10px;
  background-color: rgba(110, 110, 100, 0.4);
  padding: 0.2rem;
  overflow-y: auto;
`

const TeamName = styled.p`
  padding: 1rem;
  background-color: rgba(241, 241, 241, 0.521);
  color: black;
  margin: 0.3rem 0.5rem;
  border-radius: 10px;
  cursor: pointer;
`

const AddButton = styled.button`
  padding: 1rem;
  background-color: rgba(126, 128, 238, 0.4);
  border: none;
  outline: none;
  border-radius: 10px;
  margin: 0.3rem 0.5rem;
  font-weight: 900;
  cursor: pointer;
`