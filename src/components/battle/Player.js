class Player {
  constructor(config){
    this.vPlayerTeam = null;
    this.vPlayerReference = config.vPlayerTeam;
    this.vPlayerBattleTeam = [];
    this.pokedex = config.pokedex;
    this.moves = config.moves;
    this.types = config.types;
    this.teams = config.teams;
  }

  calculateTotalStat = (base, iv, ev, level) => {
    return Math.floor(((2 * base + iv + ev / 4) * level) / 100) + level + 5;
  };

  init(){
    this.teams.forEach((team) => {
      if (team.TeamID === this.vPlayerReference){
        this.vPlayerTeam = team;
      }
    })

    this.vPlayerTeam?.Member.forEach((pokemon) => {
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
            sprite: dex.back,
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

          this.vPlayerBattleTeam.push(copiedPokemon);

        }
      })
    });
  }

}

export default Player;