import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { deleteMember, memberUpdate, oneMember } from '../../../features/memberSlice';

const TeamMemberDetails = ({pokemonID, onDelete}) => {

  const dispatch = useDispatch();
  const { pokemon, onestatus } = useSelector((state) => state.member);
  const { moves } = useSelector((state) => state.pokemons);

  // Stat useState...
  const [ivHP, setIVHP] = useState(0);
  const [ivATK, setIVATK] = useState(0);
  const [ivDEF, setIVDEF] = useState(0);
  const [ivSPA, setIVSPA] = useState(0);
  const [ivSPD, setIVSPD] = useState(0);
  const [ivSPE, setIVSPE] = useState(0);
  const [evHP, setEVHP] = useState(0);
  const [evATK, setEVATK] = useState(0);
  const [evDEF, setEVDEF] = useState(0);
  const [evSPA, setEVSPA] = useState(0);
  const [evSPD, setEVSPD] = useState(0);
  const [evSPE, setEVSPE] = useState(0);
  const [move1, setMove1] = useState("");
  const [move2, setMove2] = useState("");
  const [move3, setMove3] = useState("");
  const [move4, setMove4] = useState("");
  const [level, setLevel] = useState(0);

  useEffect(() => {
    dispatch(oneMember(pokemonID));
  }, [pokemonID])

  useEffect(() => {
    if (pokemon) {
      setIVHP(pokemon.ivHP);
      setIVATK(pokemon.ivATK);
      setIVDEF(pokemon.ivDEF);
      setIVSPA(pokemon.ivSPA);
      setIVSPD(pokemon.ivSPD);
      setIVSPE(pokemon.ivSPE);
      setEVHP(pokemon.evHP);
      setEVATK(pokemon.evATK);
      setEVDEF(pokemon.evDEF);
      setEVSPA(pokemon.evSPA);
      setEVSPD(pokemon.evSPD);
      setEVSPE(pokemon.evSPE);
      if (pokemon.moves && pokemon.moves.length > 0) {
        setMove1(pokemon.moves[0]);
        setMove2(pokemon.moves[1]);
        setMove3(pokemon.moves[2]);
        setMove4(pokemon.moves[3]);
      }
      setLevel(pokemon.level);
    }
  }, [pokemon]);

  const handleUpdate = (e) => {
    e.preventDefault();

    const movesArray = [move1, move2, move3, move4];

    dispatch(memberUpdate({
      updatePokemon: {
        ...pokemon,
        level: parseInt(level, 10),
        ivHP: parseInt(ivHP, 10),
        ivATK: parseInt(ivATK, 10),
        ivDEF: parseInt(ivDEF, 10),
        ivSPA: parseInt(ivSPA, 10),
        ivSPD: parseInt(ivSPD, 10),
        ivSPE: parseInt(ivSPE, 10),
        evHP: parseInt(evHP, 10),
        evATK: parseInt(evATK, 10),
        evDEF: parseInt(evDEF, 10),
        evSPA: parseInt(evSPA, 10),
        evSPD: parseInt(evSPD, 10),
        evSPE: parseInt(evSPE, 10),
        moves: movesArray
      }
    }));

    dispatch(oneMember(pokemonID));

  }

  const handleDelete = (e) => {
    e.preventDefault();

    dispatch(deleteMember(pokemonID));
    onDelete();
  }

  return (
    <Display>
      {onestatus === 'pending' ? <h3>Loading...</h3> : (
        <>
        <Name>{pokemon.pokemonName}</Name>
        <StatRow>
          <h4>Level :</h4>
          <input
            type="number"
            value={level ?? 0}
            onChange={(e) => setLevel(e.target.value)}
          />
        </StatRow>
        <StatContainer>
          <IvEvForm>
            <h3>IV</h3>
            <StatRow>
              <h4>HP :</h4>
              <input
                type="number"
                value={ivHP ?? 0}
                onChange={(e) => setIVHP(e.target.value)}
              />
            </StatRow>
            <StatRow>
              <h4>ATK :</h4>
              <input
                type="number"
                value={ivATK ?? 0}
                onChange={(e) => setIVATK(e.target.value)}
              />
            </StatRow>
            <StatRow>
              <h4>DEF :</h4>
              <input
                type="number"
                value={ivDEF ?? 0}
                onChange={(e) => setIVDEF(e.target.value)}
              />
            </StatRow>
            <StatRow>
              <h4>SPA :</h4>
              <input
                type="number"
                value={ivSPA ?? 0}
                onChange={(e) => setIVSPA(e.target.value)}
              />
            </StatRow>
            <StatRow>
              <h4>SPD :</h4>
              <input
                type="number"
                value={ivSPD ?? 0}
                onChange={(e) => setIVSPD(e.target.value)}
              />
            </StatRow>
            <StatRow>
              <h4>SPE :</h4>
              <input
                type="number"
                value={ivSPE ?? 0}
                onChange={(e) => setIVSPE(e.target.value)}
              />
            </StatRow>
          </IvEvForm>
          <IvEvForm>
            <h3>EV</h3>
            <StatRow>
              <h4>HP :</h4>
              <input
                type="number"
                value={evHP ?? 0}
                onChange={(e) => setEVHP(e.target.value)}
              />
            </StatRow>
            <StatRow>
              <h4>ATK :</h4>
              <input
                type="number"
                value={evATK ?? 0}
                onChange={(e) => setEVATK(e.target.value)}
              />
            </StatRow>
            <StatRow>
              <h4>DEF :</h4>
              <input
                type="number"
                value={evDEF ?? 0}
                onChange={(e) => setEVDEF(e.target.value)}
              />
            </StatRow>
            <StatRow>
              <h4>SPA :</h4>
              <input
                type="number"
                value={evSPA ?? 0}
                onChange={(e) => setEVSPA(e.target.value)}
              />
            </StatRow>
            <StatRow>
              <h4>SPD :</h4>
              <input
                type="number"
                value={evSPD ?? 0}
                onChange={(e) => setEVSPD(e.target.value)}
              />
            </StatRow>
            <StatRow>
              <h4>SPE :</h4>
              <input
                type="number"
                value={evSPE ?? 0}
                onChange={(e) => setEVSPE(e.target.value)}
              />
            </StatRow>
          </IvEvForm>
          <MoveForm>
            <h3>Moves</h3>
            <select value={move1} onChange={(e) => setMove1(e.target.value)}>
              <option disabled>Select Move</option>
              {moves?.map((move) => (
                <option key={move.name} value={move.name}>
                  {move.name}
                </option>
              ))}
            </select>
            <select value={move2} onChange={(e) => setMove2(e.target.value)}>
              <option disabled>Select Move</option>
              {moves?.map((move) => (
                <option key={move.name} value={move.name}>
                  {move.name}
                </option>
              ))}
            </select>
            <select value={move3} onChange={(e) => setMove3(e.target.value)}>
              <option disabled>Select Move</option>
              {moves?.map((move) => (
                <option key={move.name} value={move.name}>
                  {move.name}
                </option>
              ))}
            </select>
            <select value={move4} onChange={(e) => setMove4(e.target.value)}>
              <option disabled>Select Move</option>
              {moves?.map((move) => (
                <option key={move.name} value={move.name}>
                  {move.name}
                </option>
              ))}
            </select>
          </MoveForm>
        </StatContainer>
        <ButtonContainer>
          <Btn onClick={handleDelete}>Delete</Btn>
          <Btn onClick={handleUpdate}>Update</Btn>
        </ButtonContainer>
        </>
      )}
    </Display>
  );
}
 
export default TeamMemberDetails;

const Display = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 600px;
  margin: 0;
  padding: 0.3rem;
  border-radius: 10px;
  background-color: rgba(110, 110, 100, 0.4);
`

const Name = styled.h2`
  color: white;
`

const StatContainer = styled.div`
  width: 100%;
  max-width: 600px;
  height: 100%;
  max-height: 400px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0.3rem;
`

const IvEvForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  h3{
    color: white;
  }
`

const StatRow = styled.div`
  display: flex;
  flex-direction: row;
  margin: 1rem 0;
  h4{
    color: white;
  }
  input{
    margin-left: 0.5rem;
    width: 50px;
    padding: 0.1rem;
    text-align: center;
  }
`

const MoveForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  h3{
    color: white;
  }
  select{
    width: 150px;
    margin: 1rem 0;
  }
`

const ButtonContainer = styled.div`
  width: 100%;
  max-width: 600px;
  height: 100%;
  max-height: 70px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`

const Btn = styled.button`
  width: 100px;
  height: 40px;
  border: none;
  outline: none;
  background-color: rgba(99, 179, 245, 0.8);
  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;
`