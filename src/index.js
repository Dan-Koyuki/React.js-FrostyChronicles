import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { configureStore } from '@reduxjs/toolkit';
import pokedexReducer, { pokemonsFetch } from './features/pokedexSlice';
import { Provider } from 'react-redux';
import authReducer, { loadUser } from './features/authSlice';
import teamReducer from './features/teamSlice';
import memberReducer from './features/memberSlice';

const store = configureStore({
  reducer:{
    pokemons: pokedexReducer,
    auth: authReducer,
    team: teamReducer,
    member: memberReducer
  }
});

store.dispatch(pokemonsFetch());
store.dispatch(loadUser());

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
