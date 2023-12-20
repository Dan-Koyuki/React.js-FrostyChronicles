export const botSwitch = async (playerPokemon, botTeam) => {
  const State = {
    botSwitchIn: {},
    status: true,
    actionToken: 0
  }
  try {
    if (playerPokemon === null) {
      const index = Math.floor(Math.random() * 6) + 1;
      State.botSwitchIn = botTeam[index];
      State.actionToken = 1;
    } else {
      let FaintCounter = 0;
      let AdvantageCounter = 0;

      botTeam.forEach((pokemon) => {
        if (pokemon.rHP === 0){
          FaintCounter += 1;
        }
      })

      const unFaintedTeam = botTeam.filter(pokemon => pokemon.rHP !== 0);

      if (FaintCounter !== botTeam.length){
        unFaintedTeam?.forEach((pokemon) => {
          let advantage = 0;
          pokemon.types.forEach((bT) => {
            playerPokemon.types.forEach((pT) => {
              if (pT.effect.double.includes(bT.TypeID) || pT.effect.noDamage.includes(bT.TypeID) || pT.effect.half.includes(bT.TypeID)){
                advantage -= 1;
              } else {
                advantage += 1;
              }
            });
          });

          if (advantage >= AdvantageCounter){
            AdvantageCounter = advantage;
            State.botSwitchIn = pokemon;
            State.actionToken = 1;
          }
        })
      } else if (State.botSwitchIn === null) {
        const index = Math.floor(Math.random() * 6) + 1;
        State.botSwitchIn = unFaintedTeam[index];
        State.actionToken = 1;
      } else {
        // worse case, might be error, switchIn = null, actionToken = 0, status = false
        State.status = false;
      }
    }
  } catch (error) {
    console.log(error);
  }

  return State;

};

export const botSwitchAction = async (switchInPokemon, updatedPokemon) =>{
  try {
    if (updatedPokemon !== switchInPokemon || updatedPokemon === null){
      updatedPokemon = switchInPokemon

      return updatedPokemon;
    }
  } catch (error) {
    console.log(error);
  }
}

export const botDecision = async (botCurrentPokemon, playerCurrentPokemon, botTeam) => {
  const State = {
    actionToken: 0,
    SwitchInPokemon: {},
    SelectedMove: {}
  }
  try {
    let advantagePoint = 0;
    playerCurrentPokemon.types.forEach((type) => {
      botCurrentPokemon.types.forEach((botType) => {
        if (botType.effect.double.includes(type.TypeID) || botType.effect.neutral.includes(type.TypeID)){
          advantagePoint += 1;
        }
      })
    })
    if (advantagePoint > 0){
      const MoveState = await botMove(botCurrentPokemon, playerCurrentPokemon);
      State.actionToken = MoveState.actionToken;
      State.SelectedMove = MoveState.moveSelected;
    } else if (advantagePoint === 0){
      const SwitchState = await botSwitch(playerCurrentPokemon, botTeam);
      State.actionToken = SwitchState.actionToken;
      State.SwitchInPokemon = SwitchState.botSwitchIn;
    }
  } catch (error) {
    console.log(error);
  }

  return State;

}

const botMove = async (botCurrentPokemon, playerCurrentPokemon) => {
  const State = {
    moveSelected: null,
    status: true,
    actionToken: 1
  }

  try {
    let advantagePoint = 0;
    let maxAdvantagePoint = 0;
    botCurrentPokemon.moves.forEach((move) => {
      playerCurrentPokemon.types.forEach((movetype) => {
        if (movetype.effect.double.includes(move.type.TypeID)){
          advantagePoint += 1;
        }
        if (movetype.effect.half.includes(move.type.TypeID) || movetype.effect.noDamage.includes(move.type.TypeID)){
          advantagePoint -= 1;
        }
      })

      if (advantagePoint >= maxAdvantagePoint){
        maxAdvantagePoint = advantagePoint;
        State.moveSelected = move;
        State.actionToken = 0;
      }

    })

    if (State.moveSelected === null) {
      const index = Math.floor(Math.random() * 6) + 1;
      State.moveSelected = botCurrentPokemon.moves[index];
      State.actionToken = 0;
    }
  } catch (error) {
    console.log(error);
  }
  return State;
}

const botDamageCalculation = async (botMove, playerCurrentPokemon, botCurrentPokemon) => {
  const State = {
    playerPokemon: playerCurrentPokemon
  }

  try {
    let tBotDamageCount;
    if (botMove.category === 'Special'){
      tBotDamageCount = (((2 * botCurrentPokemon.level / 5) + 2) * botMove.power * botCurrentPokemon.tSPA / playerCurrentPokemon.tSPD) / 50 + 2;
    } else if (botMove.category === 'Physical'){
      tBotDamageCount = (((2 * botCurrentPokemon.level / 5) + 2) * botMove.power * botCurrentPokemon.tATK / playerCurrentPokemon.tDEF) / 50 + 2;
    }

    botCurrentPokemon.types.forEach((type) => {
      if (type.TypeID === botMove.type){
        tBotDamageCount *= 1.5;
      }
    })

    playerCurrentPokemon.types.forEach((bType) => {
      if (bType.effect.double.includes(botMove.type)){
        tBotDamageCount *= 2;
      } else if (bType.effect.noDamage.includes(botMove.type)){
        tBotDamageCount *= 0;
      } else if (bType.effect.half.includes(botMove.type)){
        tBotDamageCount *= 0.5;
      }
    })

    let accuracyHelper = Math.random();
    if(accuracyHelper <= botMove.accuracy){
      tBotDamageCount *= 1;
    } else {
      tBotDamageCount *= 0;
    }

    tBotDamageCount = Number.parseInt(tBotDamageCount, 10);
    if (playerCurrentPokemon.rHP <= tBotDamageCount){
      State.playerPokemon.rHP = 0;
    } else {
      State.playerPokemon.rHP = State.playerPokemon.rHP - tBotDamageCount
    }
  } catch (error) {
    console.log(error);
  }

  return State;

}

export const BotAction = async (botDecisionState, botCurrentPokemon, playerCurrentPokemon, botTeam) => {
  const State ={
    botWin: true,
    playerUpdate: playerCurrentPokemon,
    botUpdate: botCurrentPokemon
  }

  if (botCurrentPokemon.rHP !== 0){
    if (botDecisionState.actionToken === 1){ // Bot Switch
      State.botUpdate = await botSwitchAction(botDecisionState.SwitchInPokemon, botCurrentPokemon);
    } else if (botDecisionState.actionToken === 0){ // Giving Damage
      console.log("Player Pokemon (in bot method):", playerCurrentPokemon);
      const DamageResult = await botDamageCalculation(botDecisionState.SelectedMove, playerCurrentPokemon, botCurrentPokemon);
      State.playerUpdate = DamageResult.playerPokemon;
    }
  } else {
    let FaintCounter = 0
    botTeam.forEach((pokemon) => {
      if (pokemon.rHP === 0){
        FaintCounter += 1
      }
    })

    if (FaintCounter !== botTeam.length){
      const unFaintedTeam = botTeam.filter(pokemon => pokemon.rHP !== 0);
      const FaintedState = await botSwitch(playerCurrentPokemon, unFaintedTeam);
      await botSwitchAction(FaintedState.botSwitchIn, botCurrentPokemon);
    } else {
      State.botWin = false;
    }
  }
  return State;
}

