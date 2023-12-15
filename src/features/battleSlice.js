import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  playerTeam: null,
  botTeam: null,
  status: ''
}

const battlerSlice = createSlice({
  name: 'battle',
  initialState,
  reducers: {
    setBattlers(state, action){
      const {player, bot} = action.payload;
      state.playerTeam = player;
      state.botTeam = bot;
      console.log(state.playerTeam, state.botTeam);
    },
  }
})

export const { setBattlers } = battlerSlice.actions;

export default battlerSlice.reducer;