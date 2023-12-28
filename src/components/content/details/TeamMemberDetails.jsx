import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { oneMember } from '../../../features/memberSlice';

const TeamMemberDetails = ({pokemonID}) => {

  const dispatch = useDispatch();
  const { pokemon } = useSelector((state) => state.member);
  const { moves } = useSelector((state) => state.pokemons);

  // Stat useState...
  const [ivHP, setIVHP] = useState();
  const [ivATK, setIVATK] = useState();
  const [ivDEF, setIVDEF] = useState();
  const [ivSPA, setIVSPA] = useState();
  const [ivSPD, setIVSPD] = useState();
  const [ivSPE, setIVSPE] = useState();
  const [evHP, setEVHP] = useState();
  const [evATK, setEVATK] = useState();
  const [evDEF, setEVDEF] = useState();
  const [evSPA, setEVSPA] = useState();
  const [evSPD, setEVSPD] = useState();
  const [evSPE, setEVSPE] = useState();
  const [move1, setMove1] = useState();
  const [move2, setMove2] = useState();
  const [move3, setMove3] = useState();
  const [move4, setMove4] = useState();
  const [level, setLevel] = useState();

  useEffect(() => {
    dispatch(oneMember(pokemonID));
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
  }, [pokemonID])

  return (
    <Display>
      <Name>{pokemon.pokemonName}</Name>
      <StatRow>
        <h4>Level :</h4>
        <input
          type="number"
          value={level}
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
              value={ivHP}
              onChange={(e) => setIVHP(e.target.value)}
            />
          </StatRow>
          <StatRow>
            <h4>ATK :</h4>
            <input
              type="number"
              value={ivATK}
              onChange={(e) => setIVATK(e.target.value)}
            />
          </StatRow>
          <StatRow>
            <h4>DEF :</h4>
            <input
              type="number"
              value={ivDEF}
              onChange={(e) => setIVDEF(e.target.value)}
            />
          </StatRow>
          <StatRow>
            <h4>SPA :</h4>
            <input
              type="number"
              value={ivSPA}
              onChange={(e) => setIVSPA(e.target.value)}
            />
          </StatRow>
          <StatRow>
            <h4>SPD :</h4>
            <input
              type="number"
              value={ivSPD}
              onChange={(e) => setIVSPD(e.target.value)}
            />
          </StatRow>
          <StatRow>
            <h4>SPE :</h4>
            <input
              type="number"
              value={ivSPE}
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
              value={evHP}
              onChange={(e) => setEVHP(e.target.value)}
            />
          </StatRow>
          <StatRow>
            <h4>ATK :</h4>
            <input
              type="number"
              value={evATK}
              onChange={(e) => setEVATK(e.target.value)}
            />
          </StatRow>
          <StatRow>
            <h4>DEF :</h4>
            <input
              type="number"
              value={evDEF}
              onChange={(e) => setEVDEF(e.target.value)}
            />
          </StatRow>
          <StatRow>
            <h4>SPA :</h4>
            <input
              type="number"
              value={evSPA}
              onChange={(e) => setEVSPA(e.target.value)}
            />
          </StatRow>
          <StatRow>
            <h4>SPD :</h4>
            <input
              type="number"
              value={evSPD}
              onChange={(e) => setEVSPD(e.target.value)}
            />
          </StatRow>
          <StatRow>
            <h4>SPE :</h4>
            <input
              type="number"
              value={evSPE}
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
        <Btn>Delete</Btn>
        <Btn>Update</Btn>
      </ButtonContainer>
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