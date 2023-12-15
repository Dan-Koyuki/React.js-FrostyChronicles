class Bot {
  constructor(config){
    this.vBotTeam = null;
    this.vBotReference = config.vBotTeam;
    this.vBotCurrent = null;
    this.vBotCMoves = null;
    this.vBotCSwitch = null;
    this.vBotActionToken = 0;
    this.vBotWin = true;
    this.vBotIsFainted = 0;
    this.vBotBattleTeam = [];
    this.pokedex = config.pokedex;
    this.moves = config.moves;
    this.types = config.types;
    this.teams = config.teams;
  }

  calculateTotalStat = (base, iv, ev, level) => {
    return Math.floor(((2 * base + iv + ev / 4) * level) / 100) + level + 5;
  };

  // Initialize Battle Team Stat
  init(){
    this.teams.forEach((team) => {
      if (team.TeamID === this.vBotReference){
        this.vBotTeam = team;
      }
    })

    this.vBotTeam?.Member.forEach((pokemon) => {
      let copiedPokemon = {
        name:"",
        level: '',
        types: [],
        tHP: 0,
        tATK: 0,
        tDEF: 0,
        tSPA: 0,
        tSPD: 0,
        tSPE: 0,
        rHP: 0,
        moves: [],
        sprite: ''
      }
      this.pokedex?.forEach((dex) => {
        if (pokemon.name === dex.name){
          copiedPokemon = {
            ...copiedPokemon,
            name: pokemon.name,
            level: pokemon.level,
            tHP : this.calculateTotalStat(dex.hp, pokemon.ivHP, pokemon.evHP, pokemon.level) + 10,
            tATK : this.calculateTotalStat(dex.atk, pokemon.ivATK, pokemon.evATK, pokemon.level) + 5,
            tDEF : this.calculateTotalStat(dex.def, pokemon.ivDEF, pokemon.evDEF, pokemon.level) + 5,
            tSPA : this.calculateTotalStat(dex.spa, pokemon.ivSPA, pokemon.evSPA, pokemon.level) + 5,
            tSPD : this.calculateTotalStat(dex.spd, pokemon.ivSPD, pokemon.evSPD, pokemon.level) + 5,
            tSPE : this.calculateTotalStat(dex.speed, pokemon.ivSPE, pokemon.evSPE, pokemon.level) + 5,
            rHP : this.calculateTotalStat(dex.hp, pokemon.ivHP, pokemon.evHP, pokemon.level) + 10,
            sprite: dex.sprite
          }
          this.moves?.forEach((move) => {
            pokemon.moves.forEach((moveslot) => {
              if (moveslot === move.name){
                copiedPokemon.moves.push(move);
              }
            })
          });
          this.types?.forEach((type) => {
            dex.type.forEach((t) => {
              if(t === type.TypeID){
                copiedPokemon.types.push(type);
              }
            })
          });

          this.vBotBattleTeam.push(copiedPokemon);

        }
      })
    });

  }

  // Bot Damage Calculation Logic
  // @params: botMoves, playerPokemon
  sBotDamage(pBotMoves, pPlayerPokemon){
    let tPlayerDamageCount;
    if (pBotMoves.category === 'Special'){
      tPlayerDamageCount = (((2 * this.vBotCurrent.level / 5) + 2) * pBotMoves.power * this.vBotCurrent.tSPA / pPlayerPokemon.tSPD) / 50 + 2;
    } else if (pBotMoves.category === 'Physical'){
      tPlayerDamageCount = (((2 * this.vBotCurrent.level / 5) + 2) * pBotMoves.power * this.vBotCurrent.tATK / pPlayerPokemon.tDEF) / 50 + 2;
    }

    this.vBotCurrent.type.forEach((type) => {
      if (type.TypeID === pBotMoves.type){
        tPlayerDamageCount *= 1.5;
      }
    })

    pPlayerPokemon.type.forEach((pType) => {
      if (pType.effect.double.includes(pBotMoves.type)){
        tPlayerDamageCount *= 2;
      } else if (pType.effect.noDamage.includes(pBotMoves.type)){
        tPlayerDamageCount *= 0;
      } else if (pType.effect.half.includes(pBotMoves.type)){
        tPlayerDamageCount *= 0.5;
      }
    })

    let accuracyHelper = Math.random();
    if(accuracyHelper <= pBotMoves.accuracy){
      tPlayerDamageCount *= 1;
    } else {
      tPlayerDamageCount *= 0;
    }

    if (pPlayerPokemon.rHP <= tPlayerDamageCount){
      pPlayerPokemon.rHP = 0;
    } else {
      pPlayerPokemon.rHP = pPlayerPokemon.rHP - tPlayerDamageCount;
    }

  }

  // Bot Action
  // @params: playerPokemon
  async sBotAction(pPlayerPokemon){
    return new Promise((resolve, reject) => {
      try {
        if (this.vBotCurrent?.rHP !== 0){
          if (this.vBotActionToken === 1){
            this.sBotCPokemon(this.vBotCSwitch);
          } else if (this.vBotActionToken === 0){
            this.sBotDamage(this.sBotCMoves(pPlayerPokemon), pPlayerPokemon);
          }
        } else {
          this.vBotBattleTeam.forEach((pokemon) => {
            if (pokemon.rHP === 0) {
              this.vBotIsFainted +=1;
            }
          })
          if (this.vBotIsFainted !== this.vBotBattleTeam.length){
            this.vBotIsFainted = 0;
            this.sBotSwitchPokemon(pPlayerPokemon);
          } else {
            this.vBotWin = false;
          }
        }
        // Resolving at the end of each branch of execution
        resolve();
      } catch (error) {
        console.log(error);
        reject(error); // Rejecting with the caught error
      }
    });
  }

  // Check if Bot Win?
  // @return: BotWin = false if battle continue or Bot lose
  // @return: BotWin = true if Bot win
  sGetBotWin(){
    return this.vBotWin;
  }

  // get Bot's Current Active Pokemon in field
  // @return: BotCurrent
  sGetBotCurrent(){
    return this.vBotCurrent;
  }

  sGetBotBattleTeam(){
    return this.vBotBattleTeam;
  }

}

export default Bot;