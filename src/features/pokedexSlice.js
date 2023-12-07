import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
  pokemons: [],
  status: null
};

export const pokemonsFetch = createAsyncThunk(
  'pokemons/pokemonsFetch',
  async () => {
    const response = await axios.get('http://localhost:5000/pokemons');
    console.log(response);
    return response?.data
  }
)

const pokemonsSlice = createSlice({
  name: 'pokemons',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(pokemonsFetch.pending, (state,action) => {
      state.status = 'pending';
    });
    builder.addCase(pokemonsFetch.fulfilled, (state,action) => {
      state.status = 'success';
      state.pokemons = action.payload;
    });
    builder.addCase(pokemonsFetch.rejected, (state,action) => {
      state.status = 'rejected';
    });
  }
});

export default pokemonsSlice.reducer;