import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Player from './Player';
import Bot from './Bot';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import PlayerDetail from './StageComponent/PlayerDetail';
import BotDetail from './StageComponent/BotDetail';
import { DamageCalculation, playerFight, playerSwitch } from './Utility/PlayerMethod';
import { BotAction, botDecision, botDecision, botSwitch, botSwitchAction } from './Utility/BotMethod';
import pokemon from '../../../../backend/models/Pokemon';

const Stage = () => {

  const navigate = useNavigate();

  const { pokemons, type, moves, staticTeam } = useSelector((state) => state.pokemons);
  const { botTeam, playerTeam } = useSelector((state) => state.battle);

  // Field State
  const [turnCount, setTurnCount] = useState(0);
  const [actionComplete, setActionComplate] = useState(false);
  const [startAction, setStartAction] = useState(false);
  const [endGame, setEndGame] = useState(false);
  const [playerWin, setPlayerWin] = useState(true);
  const [botWin, setBotWin] = useState(true);

  // Player and Bot State
  const [playerBattleTeam, setPlayerBattleTeam] = useState([]);
  const [botBattleTeam, setbotBattleTeam] = useState([]);
  const [playerCurrent, setPlayerCurrent] = useState(null);
  const [botCurrent, setBotCurrent] = useState(null);
  const [playerFaintSwitch, setFaintSwitch] = useState(false);
  const [playerSwitchIn, setPlayerSwitchIn] = useState(null);

  const opponent = new Bot({
    vBotTeam: botTeam,
    pokedex: pokemons,
    moves: moves,
    types: type,
    teams: staticTeam
  });

  const player = new Player({
    vPlayerTeam: playerTeam,
    pokedex: pokemons,
    moves: moves,
    types: type,
    teams: staticTeam
  });

  useEffect(() => { // ensure only executed once
    if (player.vPlayerBattleTeam.length === 0) {
      console.log("Executed");
      opponent.init();
      player.init();
      setPlayerBattleTeam(player.vPlayerBattleTeam);
      setbotBattleTeam(opponent.vBotBattleTeam);
    }
  }, [])
  
  useEffect(() => {
    if (actionComplete){
      checkEndGame();
      console.log("Player Pokemon:",playerCurrent);
      console.log("Bot pokemon: ", botCurrent);
      setStartAction(false);
      setActionComplate(false);
    }
  }, [actionComplete]);

  const checkEndGame = () => {
    if (!playerWin){
      setEndGame(true);
    } else if (!botWin){
      setEndGame(true);
    } else {
      updateTurn();
    }
  }

  const updateTurn = () => {
    if (endGame){
      navigate('/home');
    } else {
      setTurnCount(turnCount + 1);
    }
  }

  const handleSwitchPokemon = async (pokemonIndex) => {
    try {
      try {
        const newBotState = await botSwitch(playerCurrent, botBattleTeam);
        if (newBotState.status){
          const newBotPokemon = await botSwitchAction(newBotState.botSwitchIn, botCurrent);
          setBotCurrent(newBotPokemon);
        }
        const switchInPokemon = playerBattleTeam[pokemonIndex];
        const newPlayerPokemon = await playerSwitch(switchInPokemon, playerCurrent);
        setPlayerCurrent(newPlayerPokemon);
        setActionComplate(true);
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handlePlayerAction = async (selectedMove) => {
    const playerAction = await playerFight(playerCurrent, playerBattleTeam);
    if (playerAction.nextState === "Damage"){
      const playerResult = await DamageCalculation(selectedMove, botCurrent, playerCurrent);
      setBotCurrent(playerResult.botUpdate);
    } else if (playerAction.nextState === "Switch"){
      setFaintSwitch(true);
    } else if (playerAction.nextState === "Lose"){
      setPlayerWin(false);
    }
  }

  const handleMoveSelect = async (moveIndex) => {
    try {
      setStartAction(true);
      const selectedMove = playerCurrent.moves[moveIndex];
      console.log("selectedMove is ", selectedMove);
      const botDecisionState = await botDecision(botCurrent, playerCurrent, botBattleTeam);
      if (botDecisionState.actionToken === 0){
        console.log("BoT Didnt Switch");
        if (playerCurrent.tSPE > botCurrent.tSPE){
          console.log("Player Faster");
          // PLAYER ACTION
          await handlePlayerAction(selectedMove);
  
          // BOT ACTION
          const botResult = await BotAction(botDecisionState, botCurrent, playerCurrent, botBattleTeam);
          setPlayerCurrent(botResult.playerUpdate);
          if (!botResult.botWin){ // this when bot lose
            setBotWin(botResult.botWin)
          }
        } else if (playerCurrent.tSPE < botCurrent.tSPE){
          console.log("Bot Faster");
          // BOT ACTION
          const botResult = await BotAction(botDecisionState, botCurrent, playerCurrent, botBattleTeam);
          setPlayerCurrent(botResult.playerUpdate);
  
          // PLAYER ACTION
          await handlePlayerAction(selectedMove);
        } else {
          const chance = Math.random() < 0.5;
          if (chance) {
            // PLAYER ACTION
            await handlePlayerAction(selectedMove);
  
            // BOT ACTION
            const botResult = await BotAction(botDecisionState, botCurrent, playerCurrent, botBattleTeam);
            setPlayerCurrent(botResult.playerUpdate);
            if (!botResult.botWin){ // this when bot lose
              setBotWin(botResult.botWin)
            }
          } else {
            // BOT ACTION
            const botResult = await BotAction(botDecisionState, botCurrent, playerCurrent, botBattleTeam);
            setPlayerCurrent(botResult.playerUpdate);
  
            // PLAYER ACTION
            await handlePlayerAction(selectedMove);
          }
        }
      } else if (botDecisionState.actionToken === 1){ // Switching will always go first
        console.log("Bot Switch here");
        // BOT ACTION
        const temp = await BotAction(botDecisionState, botCurrent, playerCurrent, botBattleTeam);
        setBotCurrent(temp.botUpdate);
        console.log("Why bot here: ", temp);
  
        // PLAYER ACTION
        await handlePlayerAction(selectedMove);
      }
      setActionComplate(true);
    } catch (error) {
      console.log(error);
    }
  }

  const handleSwitching = async (pokemonIndex) => {
    try {
      setStartAction(true);
      const SwitchIn = playerBattleTeam[pokemonIndex];
      setPlayerSwitchIn(SwitchIn);
      const botDecisionState = await botDecision(botCurrent, playerCurrent, botBattleTeam);
      if (botDecisionState.actionToken === 0){
        setPlayerCurrent(playerSwitchIn);

        const temp = await BotAction(botDecisionState, botCurrent, playerCurrent, botBattleTeam);
        setPlayerCurrent(temp.playerUpdate);
      } else if (botDecisionState.actionToken === 1){
        if (playerCurrent.tSPE > botCurrent.tSPE){
          console.log("Player Faster");
          // PLAYER ACTION
          setPlayerCurrent(playerSwitchIn);
  
          // BOT ACTION
          const temp = await BotAction(botDecisionState, botCurrent, playerCurrent, botBattleTeam);
          setBotCurrent(temp.botUpdate);
        } else if (playerCurrent.tSPE < botCurrent.tSPE){
          console.log("Bot Faster");
          // BOT ACTION
          const temp = await BotAction(botDecisionState, botCurrent, playerCurrent, botBattleTeam);
          setBotCurrent(temp.botUpdate);
  
          // PLAYER ACTION
          setPlayerCurrent(playerSwitchIn);
        } else {
          const chance = Math.random() < 0.5;
          if (chance) {
            // PLAYER ACTION
            setPlayerCurrent(playerSwitchIn);
    
            // BOT ACTION
            const temp = await BotAction(botDecisionState, botCurrent, playerCurrent, botBattleTeam);
            setBotCurrent(temp.botUpdate);
          } else {
            // BOT ACTION
            const temp = await BotAction(botDecisionState, botCurrent, playerCurrent, botBattleTeam);
            setBotCurrent(temp.botUpdate);
    
            // PLAYER ACTION
            setPlayerCurrent(playerSwitchIn);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleFaintSwitching = async (pokemonIndex) => {
    try {
      setStartAction(true);
      const SwitchIn = playerBattleTeam[pokemonIndex];
      setPlayerSwitchIn(SwitchIn);
      setPlayerCurrent(playerSwitchIn);
    } catch (error) {
      console.log(error);
    }
  }

  const handleBack = () => {
    navigate('/home');
  }

  return (
    <GContainer>
      <Turn>{turnCount}</Turn>
      <BackBtn onClick={handleBack}>Back</BackBtn>
      <BattleStyled>
        { turnCount === 0 ? 
          (
            <SwitchPokemon>
              {
                playerBattleTeam?.map((playerPokemon, index) => (
                  <PokemonButton key={index} onClick={() => handleSwitchPokemon(index)}>{playerPokemon.name}</PokemonButton>
                ))
              }
            </SwitchPokemon>
          ) : (
            <>
            <PlayerDetail playerCurrent={playerCurrent}/>
            <BotDetail botCurrent={botCurrent} />
            </>
          )
        }
      </BattleStyled>
      { turnCount !== 0 && !startAction ? (
          <Choice>
            <MoveButtonContainer>
            {playerCurrent.moves?.map((move, index) => (
              <MoveButton key={index} onClick={() => handleMoveSelect(index)}>{move.name}</MoveButton>
            ))}
            </MoveButtonContainer>
            <PokemonButtonContainer>
            {playerBattleTeam?.map((pokemon,index) => (
              <PokemonSwitch key={index} onClick={() => handleSwitching(index)}>{pokemon.name}</PokemonSwitch>
            ))}
            </PokemonButtonContainer>
          </Choice>
        ) : playerFaintSwitch ? (
          <Choice>
            <PokemonButtonContainer>
            {playerBattleTeam?.map((pokemon,index) => (
              <PokemonSwitch key={index} onClick={() => handleFaintSwitching(index)}>{pokemon.name}</PokemonSwitch>
            ))}
            </PokemonButtonContainer>
          </Choice>
        ) : null
      }
    </GContainer>
    
  );
}
 
export default Stage;

const GContainer = styled.div`
  display: flex;
  flex-direction: row;
`

const BackBtn = styled.button`
  position: fixed;
  height: 50px;
  width: 65px;
  border: none;
  outline: none;
  background: rgb(33, 56, 158);
  color: white;
  border-radius: 10px;
  font-weight: 600;
  font-size: 20px;
  z-index: 1;
  cursor: pointer;
  margin-left: 1.5rem;
`

const BattleStyled = styled.div`
  display: flex;
  max-width: 1100px;
  width: 100%;
  height: 600px;
  background-image: url(https://www.deviantart.com/phoenixoflight92/art/OR-AS-Battle-Background-1-489798806);
  margin: 0 auto;
  z-index: 0;
  border-radius: 10px;
  color: white;
`

const SwitchPokemon = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  width: 500px;
  height: 600px;
`

const PokemonButton = styled.button`
  height: 70px;
  width: 300px;
  font-size: 28px;
  font-weight: 600;
  margin: 0.5;
  border-radius: 10px;
  cursor: pointer;
`

const Choice = styled.div`
  display: flex;
  width: 100%;
  max-width: 700px;
  height: 300px;
  z-index: 100;
  position: fixed;
  align-items: center;
  justify-content: center;
  margin: 19rem 30rem;
  flex-direction: column;
`

const MoveButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 1.5;
  justify-content: center;
  align-items: center;
`

const PokemonButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 0.5rem;
  justify-content: center;
  align-items: center;
`

const MoveButton = styled.button`
  height: 40px;
  width: 150px;
  border: none;
  outline: none;
  background-color: rgba(123, 121, 145, 0.8);
  border-radius: 10px;
  margin: 0.5rem;
  padding: 0.5rem;
  font-size: medium;
  font-weight: 600;
  color: white;
  cursor: pointer;
`

const PokemonSwitch = styled.button`
  height: 40px;
  width: 150px;
  border: none;
  outline: none;
  background-color: rgba(121, 145, 141, 0.8);
  border-radius: 10px;
  margin: 0.5rem;
  padding: 0.5rem;
  font-size: medium;
  font-weight: 600;
  color: white;
  cursor: pointer;
`

const Turn = styled.h2`
  font-weight: 600;
  font-size: 28px;
  color: white;
  position: fixed;
  z-index: 150;
  width: 50px;
  height: 50px;
  text-align: center;
  margin-left: 48%;
`
