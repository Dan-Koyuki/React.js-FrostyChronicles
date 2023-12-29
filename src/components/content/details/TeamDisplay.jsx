import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { addMember, fetchMember } from '../../../features/memberSlice';
import { createTeam, fetchTeam } from '../../../features/teamSlice';

import TeamMemberDetails from './TeamMemberDetails';

const TeamDisplay = () => {

  const dispatch = useDispatch();
  const { teams } = useSelector((state) => state.team);
  const { members, membertotal } = useSelector((state) => state.member);
  const auth = useSelector((state) => state.auth);
  const { pokemons } = useSelector((state) => state.pokemons);
  const [isTeamSelected, setSelectedTeam] = useState(false);
  const [selectedTeamID, setTeamID] = useState('');
  const [isMemberSelected, setSelectedMember] = useState(false);
  const [SelectedMemberID, setMemberID] = useState('');
  const [isAddTeam, setAddTeam] = useState(false);
  const [newTeamName, setNewTeam] = useState('');
  const [isAddPokemon, setAddPokemon] = useState(false);
  const [newPokemonName, setNewPokemon] = useState('');

  const handleSelectTeam = (pTeamID) => {
    setSelectedTeam(true);
    setTeamID(pTeamID);
    dispatch(fetchMember({teamID: pTeamID}));
    console.log("members", members);
    if (isAddPokemon){
      setAddPokemon(false);
    }
    if (isMemberSelected){
      setSelectedMember(false);
    }
  };

  const handleSelectPokemon = (pPokemonID) => {
    setMemberID(pPokemonID);
    setSelectedMember(true);
  }

  const handleDeletePokemon = () => {
    setSelectedMember(false);
    dispatch(fetchMember({teamID: selectedTeamID}));
  };

  const toggleAddTeam = () => {
    setAddTeam(true);
  }

  const toggleAddPokemon = () => {
    setAddPokemon(true);
  }

  const handleAddTeam = () => {
    // logic to handle additional team
    setAddTeam(false);
    const newTeam = {
      name: newTeamName,
      userID: auth._id
    }
    dispatch(createTeam(newTeam));

    //update after team created
    dispatch(fetchTeam({userID: auth._id}));
  };

  const handleAddPokemon = () => {
    // logic to handle additional pokemon
    setAddPokemon(false);
    const newPokemon = {
      teamID: selectedTeamID,
      pokemonName: newPokemonName
    }
    dispatch(addMember(newPokemon));

    // update after pokemon created
    dispatch(fetchMember({teamID: selectedTeamID}));
  }

  return (
    <>
    <Display>
      { teams?.map((team) => (
        <TeamName key={team._id} onClick={() => handleSelectTeam(team._id)}>{team.name}</TeamName>
      ))}
      {!isAddTeam ? ( // Use !isAddTeam instead of isAddTeam to initially display the "Add Team" button
        <AddButton onClick={toggleAddTeam}>Add Team</AddButton>
      ) : (
        <>
          <InputForm
            type='text'
            required
            placeholder='Team Name'
            onChange={(e) => setNewTeam(e.target.value)}
          />
          <AddButton onClick={handleAddTeam}>Create</AddButton>
        </>
      )}
    </Display>
    {isTeamSelected ? 
      (
        <>
        <Display>
          {members?.map((pokemon) => (
            <TeamName key={pokemon._id} onClick={() => handleSelectPokemon(pokemon._id)}>{pokemon.pokemonName}</TeamName>
          ))}
          {membertotal === 6 ? null : (
            <>
              {!isAddPokemon ? (
                <AddButton onClick={toggleAddPokemon}>Add Pokemon</AddButton>
              ) : (
                <>
                  <SelectForm id="pokemonSelect" onChange={(e) => setNewPokemon(e.target.value)}>
                    {pokemons?.map((pokemon) => (
                      <option key={pokemon.dexID} value={pokemon.name}>
                        {pokemon.name}
                      </option>
                    ))}
                  </SelectForm>
                  <AddButton onClick={handleAddPokemon}>Add Pokemon</AddButton>
                </>
              )}
            </>
          )}
        </Display>
        {isMemberSelected ?
          (
            <TeamMemberDetails pokemonID={SelectedMemberID} onDelete={handleDeletePokemon}></TeamMemberDetails>
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

const InputForm = styled.input`
  padding: 1rem;
  border: none;
  outline: none;
  border-radius: 10px;
  margin: 0.3rem 0.5rem;
  font-weight: 900;
  cursor: pointer;
`

const SelectForm = styled.select`
  padding: 1rem;
  border: none;
  outline: none;
  border-radius: 10px;
  margin: 0.3rem 0.5rem;
  font-weight: 900;
  cursor: pointer;
`