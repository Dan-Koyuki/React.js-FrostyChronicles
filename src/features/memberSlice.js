import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { uri } from './api';

const initialState = {
  _id:'',
  teamID: '',
  pokemonName: '',
  ability: '',
  item: '',
  ivHP: 0,
  ivATK: 0,
  ivDEF: 0,
  ivSPA: 0,
  ivSPD: 0,
  ivSPE: 0,
  evHP: 0,
  evATK: 0,
  evDEF: 0,
  evSPA: 0,
  evSPD: 0,
  evSPE: 0,
  moves1: '',
  moves2: '',
  moves3: '',
  moves4: '',
  creationStatus: '',
  creationError: '',
  members:  localStorage.getItem("members") ?  JSON.parse(localStorage.getItem("members")) : [],
  fetchingStatus: '',
  fetchingError:'',
  membertotal: ''
};

export const updateMember = createAsyncThunk(
  'utils/updateMember',
  async (values) => {
    try {
      const member = await axios.post(`${uri}/api/updateMember`,{
        teamID: values.teamID,
        pokemonName: values.pokemonName,
        ability: values.ability || 'null',
        item: values.item || 'null',
        ivHP: values.ivHP || 0,
        ivATK: values.ivATK || 0,
        ivDEF: values.ivDEF || 0,
        ivSPA: values.ivSPA || 0,
        ivSPD: values.ivSPD || 0,
        ivSPE: values.ivSPE || 0,
        evHP: values.evHP || 0,
        evATK: values.evATK || 0,
        evDEF: values.evDEF || 0,
        evSPA: values.evSPA || 0,
        evSPD: values.evSPD || 0,
        evSPE: values.evSPE || 0,
        moves1: values.moves1 || 'null', // Set moves1 to empty string if it's falsy
        moves2: values.moves2 || 'null',
        moves3: values.moves3 || 'null',
        moves4: values.moves4 || 'null'
      });

      return member.data;
    } catch (error) {
      console.log(error.response.data);
    }
  }
);

export const addMember =createAsyncThunk(
  'utils/addMember',
  async(values) => {
    try {
      const member = await axios.post(`${uri}/api/addMember`, {
        teamID : values.teamID,
        pokemonName : values.pokemonName
      });

      return member.data;
    } catch (error) {
      console.log(error.response.data);
    }
  }
)

export const fetchMember = createAsyncThunk(
  'utils/fetchMember',
  async(values, {rejectWithValue}) => {
    try {
      const members = await axios.post(`${uri}/api/fetchmember`, {
        teamID : values.teamID,
      });
      return members.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

const memberSlice = createSlice({
  name: 'utils',
  initialState,
  reducers: {
    getTotals(state, action){
      state.membertotal = state.members?.length || 0;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(updateMember.pending, (state, action) => {
      return {...state, creationStatus: "pending"};
    });
    builder.addCase(updateMember.fulfilled, (state, action) => {
      if (action.payload) {
        const updatedMember = action.payload;
    
        // Find the index of the updated member in the members array
        const memberIndex = state.members.findIndex(
          member => member._id === updatedMember._id
        );
    
        if (memberIndex !== -1) {
          // Create a new array with the updated member
          const updatedMembers = [...state.members];
          updatedMembers[memberIndex] = updatedMember;
    
          return {
            ...state,
            members: updatedMembers
          };
        }
      }
    
      return state;
    });    
    builder.addCase(updateMember.rejected, (state, action) => {
      return { ...state, creationStatus: "rejected", creationError: action.payload };
    });
    builder.addCase(fetchMember.pending, (state, action) => {
      return {...state, fetchingStatus: "pending"};
    });
    builder.addCase(fetchMember.fulfilled, (state, action) => {
      console.log(action.payload);
      const membersFromLocalStorage = localStorage.getItem('members');
      const pokemon = membersFromLocalStorage ? JSON.parse(membersFromLocalStorage) : [];
      pokemon.push(action.payload);
      localStorage.setItem('team', JSON.stringify(pokemon));
      if (action.payload){
        localStorage.setItem('members', JSON.stringify(action.payload));
        return {
          ...state,
          fetchingStatus: 'success',
          members: action.payload
        }
      } else return state;
    });
    builder.addCase(fetchMember.rejected, (state, action) => {
      return { ...state, fetchingStatus: "rejected", fetchingError: action.payload };
    });
  }
});

export const { getTotals } = memberSlice.actions;

export default memberSlice.reducer;