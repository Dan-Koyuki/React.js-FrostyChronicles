import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createTeam, fetchTeam } from "../../features/teamSlice";
import {
  addMember,
  fetchMember,
  updateMember,
} from "../../features/memberSlice";

const Team = () => {
  // Initialization
  const navigate = useNavigate(); // navigate between View
  const dispatch = useDispatch(); // call reducer method
  const auth = useSelector((state) => state.auth); // get condition of Auth
  const { pokemons, moves } = useSelector((state) => state.pokemons); // get Data of Pokemon
  const { teams } = useSelector((state) => state.team); // get Teams Collection
  const { members } = useSelector((state) => state.member); // get Members Collection
  const userId = {
    userID: auth._id.toString(), // User ID
  };

  useEffect(() => {
    localStorage.removeItem("members");
  }, []);

  /*
    Team Section
    Temp Model Team
    Toggle to display Form to add new Team
    Get Team Collection from Database
    Temp Selected Team
  */
  const [team, setTeam] = useState({
    name: "",
    userID: userId.userID,
  });

  const [newTeam, setNewTeam] = useState();

  useEffect(() => {
    dispatch(fetchTeam(userId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [selectedTeam, setSelectedTeam] = useState({
    teamID: "",
  });
  /*
    Team's Member Section
    Temp Model Member
    Toggle to display Form to add new pokemon to team
    Get Member Collection of selected Team
  */
  const [member, setMember] = useState({
    teamID: "",
    pokemonName: "",
    ability: "",
    item: "",
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
    moves1: "",
    moves2: "",
    moves3: "",
    moves4: "",
  });

  const [newMember, setNewMember] = useState("");

  useEffect(() => {
    if (selectedTeam.teamID !== "") {
      dispatch(fetchMember(selectedTeam));
    }
  }, [dispatch, selectedTeam]);

  const handleBack = () => {
    // Back Button
    navigate("/home");
  };

  const showCreateForm = () => {
    // Toggle to show Team Creation Form
    setNewTeam(true);
  };

  const showMemberRec = () => {
    // Toggle to show Member Addition Form
    setNewMember(true);
  };

  const handleTeamCreation = (e) => {
    // Create the Team
    e.preventDefault();
    dispatch(createTeam(team));
    setNewTeam(false);
    dispatch(fetchTeam(team));
  };

  const handleMemberAddition = (e) => {
    // Add te pokemon to team
    e.preventDefault();
    dispatch(addMember(member));
    setNewMember(false);
  };

  const handleUpdateMember = (pokemon) => {
    const updatedMember = {
      ...member,
      teamID: selectedTeam.teamID,
      pokemonName: pokemon.pokemonName,
    };
    dispatch(updateMember(updatedMember));
  };

  const handleSelect = (selected) => {
    // Clear Storage and set new one based on selected Team
    localStorage.removeItem("members");
    setSelectedTeam({ ...selectedTeam, teamID: selected });
  };

  return (
    <div className="team-container">
      <div className="titles">
        <button onClick={handleBack}>Back</button>
        <h2>Team</h2>
        <p className="warning">*please update one pokemon at once and re-enter all of the value and refresh after update</p>
      </div>
      <div className="team">
        <div className="names">
          {teams &&
            teams?.map((tim) => (
              <div
                key={tim._id}
                onClick={() => handleSelect(tim._id)}
                className="teamnames"
              >
                {tim.name}
              </div>
            ))}
          {newTeam ? (
            <form onSubmit={handleTeamCreation} className="AddTeam">
              <input
                type="text"
                placeholder="Team name"
                onChange={(e) => setTeam({ ...team, name: e.target.value })}
              />
              <button>create</button>
            </form>
          ) : (
            <div className="AddTeam">
              <button onClick={showCreateForm}>Add Team</button>
            </div>
          )}
        </div>
        <div className="details">
          {selectedTeam ? (
            <>
              {members &&
                members?.map((pokemon) => (
                  <div key={pokemon._id} className="pokemonCard">
                    <p>{pokemon.pokemonName}</p>
                    <div className="ability">
                      <span>Ability :</span>
                      <select
                        onChange={(e) =>
                          setMember({ ...member, ability: e.target.value })
                        }
                      >
                        {pokemon.ability ? (
                          <option value={pokemon.ability}>
                            {pokemon.ability}
                          </option>
                        ) : (
                          <option value="">Ability</option>
                        )}
                        {pokemons &&
                          pokemons.map((dex) => {
                            if (pokemon.pokemonName === dex.name) {
                              return dex.abilities.map((ability, index) => (
                                <option key={index} value={ability}>
                                  {ability}
                                </option>
                              ));
                            }
                            return null;
                          })}
                      </select>
                    </div>
                    <div className="item">
                      <span>Items :</span>
                      <input
                        type="text"
                        defaultValue={pokemon.item || ''}
                        onChange={(e) => setMember({ ...member, item: e.target.value })}
                      />
                      {/* this should be change to select with item dataset as option */}
                    </div>
                    <div className="PokemonStat">
                      <div className="Iv">
                        <p>IV</p>
                        <div className="stat">
                          <span>HP :</span>
                          <input
                            type="number"
                            defaultValue={pokemon.ivHP || 0}
                            onChange={(e) =>
                              setMember({ ...member, ivHP: e.target.value })
                            }
                          />
                        </div>
                        <div className="stat">
                          <span>ATK :</span>
                          <input
                            type="number"
                            defaultValue={pokemon.ivATK || 0}
                            onChange={(e) =>
                              setMember({ ...member, ivATK: e.target.value })
                            }
                          />
                        </div>
                        <div className="stat">
                          <span>DEF :</span>
                          <input
                            type="number"
                            defaultValue={pokemon.ivDEF || 0}
                            onChange={(e) =>
                              setMember({ ...member, ivDEF: e.target.value })
                            }
                          />
                        </div>
                        <div className="stat">
                          <span>SPA :</span>
                          <input
                            type="number"
                            defaultValue={pokemon.ivSPA || 0}
                            onChange={(e) =>
                              setMember({ ...member, ivSPA: e.target.value })
                            }
                          />
                        </div>
                        <div className="stat">
                          <span>SPD :</span>
                          <input
                            type="number"
                            defaultValue={pokemon.ivSPD || 0}
                            onChange={(e) =>
                              setMember({ ...member, ivSPD: e.target.value })
                            }
                          />
                        </div>
                        <div className="stat">
                          <span>SPE :</span>
                          <input
                            type="number"
                            defaultValue={pokemon.ivSPE || 0}
                            onChange={(e) =>
                              setMember({ ...member, ivSPE: e.target.value })
                            }
                          />
                        </div>
                      </div>
                      <div className="Ev">
                        <p>EV</p>
                        <div className="stat">
                          <span>HP :</span>
                          <input
                            type="number"
                            defaultValue={pokemon.evHP || 0}
                            onChange={(e) =>
                              setMember({ ...member, evHP: e.target.value })
                            }
                          />
                        </div>
                        <div className="stat">
                          <span>ATK :</span>
                          <input
                            type="number"
                            defaultValue={pokemon.evATK || 0}
                            onChange={(e) =>
                              setMember({ ...member, evATK: e.target.value })
                            }
                          />
                        </div>
                        <div className="stat">
                          <span>DEF :</span>
                          <input
                            type="number"
                            defaultValue={pokemon.evDEF || 0}
                            onChange={(e) =>
                              setMember({ ...member, evDEF: e.target.value })
                            }
                          />
                        </div>
                        <div className="stat">
                          <span>SPA :</span>
                          <input
                            type="number"
                            defaultValue={pokemon.evSPA || 0}
                            onChange={(e) =>
                              setMember({ ...member, evSPA: e.target.value })
                            }
                          />
                        </div>
                        <div className="stat">
                          <span>SPD :</span>
                          <input
                            type="number"
                            defaultValue={pokemon.evSPD || 0}
                            onChange={(e) =>
                              setMember({ ...member, evSPD: e.target.value })
                            }
                          />
                        </div>
                        <div className="stat">
                          <span>SPE :</span>
                          <input
                            type="number"
                            defaultValue={pokemon.evSPE || 0}
                            onChange={(e) =>
                              setMember({ ...member, evSPE: e.target.value })
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div className="PokemonMoves">
                      <select>
                        <option value="">Moves1</option>
                        {moves && moves?.map((move) => (
                          <option key={move.movesID} value={move.name}>{move.name}</option>
                        ))}
                      </select>
                      <select>
                        <option value="">Moves2</option>
                        {moves && moves?.map((move) => (
                          <option key={move.movesID} value={move.name}>{move.name}</option>
                        ))}
                      </select>
                      <select>
                        <option value="">Moves3</option>
                        {moves && moves?.map((move) => (
                          <option key={move.movesID} value={move.name}>{move.name}</option>
                        ))}
                      </select>
                      <select>
                        <option value="">Moves4</option>
                        {moves && moves?.map((move) => (
                          <option key={move.movesID} value={move.name}>{move.name}</option>
                        ))}
                      </select>
                    </div>
                    <button onClick={() => handleUpdateMember(pokemon)}>Update</button>
                  </div>
                ))}

              {newMember && members.length < 6 ? (
                <form onSubmit={handleMemberAddition}>
                  <select
                    onChange={(e) =>
                      setMember({
                        ...member,
                        teamID: selectedTeam.teamID,
                        pokemonName: e.target.value,
                      })
                    }
                  >
                    <option value="">Select a Pokémon</option>
                    {pokemons &&
                      pokemons.map((pokemon) => (
                        <option key={pokemon.dexID} value={pokemon.name}>
                          {pokemon.name}
                        </option>
                      ))}
                  </select>
                  <button type="submit">Add Member</button>
                </form>
              ) : !newMember && members.length >= 6 ? null : (
                <button className="addCard" onClick={showMemberRec}>
                  +
                </button>
              )}
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Team;
