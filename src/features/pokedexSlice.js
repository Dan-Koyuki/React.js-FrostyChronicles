import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { uri, uri2 } from './api';

const initialState = {
  pokemons: [],
  pokemonStatus: null,
  type: [],
  typeStatus: null,
  moves: [],
  moveState: null,
  staticTeam: [],
  staticTeamStatus: null
};

export const pokemonsFetch = createAsyncThunk(
  'pokemons/pokemonsFetch',
  async () => {
    const response = await axios.get(`${uri}/pokemons`);
    
    return response?.data;
  }
);

export const movesFetchS = createAsyncThunk(
  'pokemons/movesFetchS',
  async () => {
    const response = await axios.get (`${uri2}/moves`);
    
    return response?.data;
  }
);

export const typesFetch = createAsyncThunk(
  'pokemons/typesFetch',
  async () => {
    const response = await axios.get (`${uri2}/types`);
    
    return response?.data;
  }
);

export const staticTeamFetch = createAsyncThunk(
  'pokemons/staticTeamFetch',
  async () => {
    const response = await axios.get (`${uri2}/static-team`);
    
    return response?.data;
  }
)

const pokemonsSlice = createSlice({
  name: 'pokemons',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
  // Pokemon Fetch
    builder.addCase(pokemonsFetch.pending, (state,action) => {
      state.pokemonStatus = 'pending';
    });
    builder.addCase(pokemonsFetch.fulfilled, (state,action) => {
      state.pokemonStatus = 'success';
      state.pokemons = action.payload;
    });
    builder.addCase(pokemonsFetch.rejected, (state,action) => {
      state.pokemonStatus = 'rejected';
    });
  // Moves Fetch
    builder.addCase(movesFetchS.pending, (state, action) => {
      state.moveState = 'pending';
    });
    builder.addCase(movesFetchS.fulfilled, (state, action) => {
      state.moveState = 'success';
      state.moves = action.payload;
    });
    builder.addCase(movesFetchS.rejected, (state, action) => {
      state.moveState = 'rejected';
    });
  // Types Fetch
    builder.addCase(typesFetch.pending, (state, action) => {
      state.typeStatus = 'pending';
    });
    builder.addCase(typesFetch.fulfilled, (state, action) => {
      state.typeStatus = 'success';
      state.type = action.payload;
    });
    builder.addCase(typesFetch.rejected, (state, action) => {
      state.typeStatus = 'rejected';
    });
  // Static Team Fetch
    builder.addCase(staticTeamFetch.pending, (state, action) => {
      state.staticTeamStatus = 'pending';
    });
    builder.addCase(staticTeamFetch.fulfilled, (state, action) => {
      state.staticTeamStatus = 'success';
      state.staticTeam = action.payload;
    });
    builder.addCase(staticTeamFetch.rejected, (state, action) => {
      state.staticTeamStatus = 'rejected';
    });
  }
});

export default pokemonsSlice.reducer;