export const playerSwitch = (switchInPokemon, updatedPokemon) => {
  try {
    if (updatedPokemon !== switchInPokemon || updatedPokemon === null){
      updatedPokemon = switchInPokemon

      return updatedPokemon;
    }
  } catch (error) {
    console.log(error);
  }
}

export const playerFight = async (playerCurrentPokemon, playerTeam) => {
  const State = {
    nextState: ''
  }
  try {
    if (playerCurrentPokemon.rHP !== 0){
      State.nextState = 'Damage';
    } else {
      let FaintCounter = 0
      
      playerTeam.forEach(pokemon => {
        if (pokemon.rHP === 0){
          FaintCounter += 1;
        }
      });

      if (FaintCounter === playerTeam.length){
        State.nextState = 'Lose';
      } else {
        FaintCounter = 0;
        State.nextState = 'Switch'
      }
    }

    return State;

  } catch (error) {
    console.log(error);
  }
}

export const DamageCalculation = async (playerMove, botCurrentPokemon, playerCurrentPokemon) => {
  const State = {
    botUpdate: {}
  }
  try {
    let tBotDamageCount;
    if (playerMove.category === 'Special'){
      tBotDamageCount = (((2 * playerCurrentPokemon.level / 5) + 2) * playerMove.power * playerCurrentPokemon.tSPA / botCurrentPokemon.tSPD) / 50 + 2;
    } else if (playerMove.category === 'Physical'){
      tBotDamageCount = (((2 * playerCurrentPokemon.level / 5) + 2) * playerMove.power * playerCurrentPokemon.tATK / botCurrentPokemon.tDEF) / 50 + 2;
    }

    playerCurrentPokemon.types.forEach((type) => {
      if (type.TypeID === playerMove.type){
        tBotDamageCount *= 1.5;
      }
    })

    botCurrentPokemon.types.forEach((bType) => {
      if (bType.effect.double.includes(playerMove.type)){
        tBotDamageCount *= 2;
      } else if (bType.effect.noDamage.includes(playerMove.type)){
        tBotDamageCount *= 0;
      } else if (bType.effect.half.includes(playerMove.type)){
        tBotDamageCount *= 0.5;
      }
    })

    let accuracyHelper = Math.random();
    if(accuracyHelper <= playerMove.accuracy){
      tBotDamageCount *= 1;
    } else {
      tBotDamageCount *= 0;
    }

    if (botCurrentPokemon.rHP <= tBotDamageCount){
      const botPokemon = {
        ...botCurrentPokemon,
        rHP: 0
      }
      State.botUpdate = botPokemon;
    } else {
      const remaningHP = botCurrentPokemon.rHP
      const botPokemon = {
        ...botCurrentPokemon,
        rHP: remaningHP - tBotDamageCount
      }
      State.botUpdate = botPokemon;
    }

    return State;
  } catch (error) {
    console.log(error);
  }
}