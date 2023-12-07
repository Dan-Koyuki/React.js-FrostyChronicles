import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Pokedex = () => {
  const { pokemons } = useSelector((state) => state.pokemons);
  const navigate = useNavigate();
  const [selectedPokemon, setSelectedPokemon] = useState();
  console.log(selectedPokemon);

  const handleBack = () => {
    navigate('/home');
  }

  const capitalizeFirstLetter = (string) => {
    const words = string.split(' ');
    const capitalizedWords = words.map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    });
    return capitalizedWords.join(' ');
  };

  return (
    <div className='pokedex-container'>
      <div className='titles'>
        <button onClick={handleBack}>Back</button>
        <h2>Pokedex</h2>
      </div>
      <div className='pokedex'>
        <div className='names'>
          {pokemons &&
            pokemons?.map((pokemon) => (
              <div key={pokemon.dexID} className='pokemon' onClick={() => setSelectedPokemon(pokemon)}>
                <span>{pokemon.dexID}</span>
                <span>{pokemon.name}</span>
              </div>
          ))}
        </div>
        {/* add codition of selected pokemon */}
        <div className='details'>
          {selectedPokemon ? (
            <>
            <div className='info'>
              <div className='info-stats'>
                <h2>{selectedPokemon.name}</h2>
                <p>{selectedPokemon.type.map((type) => capitalizeFirstLetter(type)).join(" ")}</p>
                <h3>Abilities:</h3>
                <p>{selectedPokemon.abilities.map((abillity) => capitalizeFirstLetter(abillity)).join(", ")}</p>
                <h3>Base Stat:</h3>
                <p>Hp : {selectedPokemon.hp}</p>
                <p>Atk : {selectedPokemon.atk}</p>
                <p>Def : {selectedPokemon.def}</p>
                <p>SpA : {selectedPokemon.spa}</p>
                <p>SpD : {selectedPokemon.spd}</p>
                <p>Speed : {selectedPokemon.speed}</p>
                <p>Egg Group: {selectedPokemon.egg_groups.map((egg) => capitalizeFirstLetter(egg)).join("/")}</p>
              </div>
              <img src={selectedPokemon.sprite} alt={selectedPokemon.name}/>
              <div className='learnset'>
                <h2>Learn Set</h2>
                {selectedPokemon.learnset?.map((moves) => (
                  <p key={moves}>{capitalizeFirstLetter(moves)}</p>
                ))}
              </div>
            </div>
            <div className='desc'>
              {selectedPokemon.desc}
            </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default Pokedex;