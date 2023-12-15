import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { configureStore } from '@reduxjs/toolkit';
import pokedexReducer, { movesFetchS, pokemonsFetch, staticTeamFetch, typesFetch } from './features/pokedexSlice';
import { Provider } from 'react-redux';
import authReducer, { loadUser } from './features/authSlice';
import teamReducer from './features/teamSlice';
import memberReducer, { getTotals } from './features/memberSlice';
import battleSlice from './features/battleSlice'

const store = configureStore({
  reducer:{
    pokemons: pokedexReducer,
    auth: authReducer,
    team: teamReducer,
    member: memberReducer,
    battle: battleSlice
  }
});

store.dispatch(pokemonsFetch());
store.dispatch(movesFetchS());
store.dispatch(typesFetch());
store.dispatch(staticTeamFetch());
store.dispatch(loadUser());
store.dispatch(getTotals());

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
