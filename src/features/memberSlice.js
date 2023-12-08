import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

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
  members: [],
  fetchingStatus: '',
  fetchingError:''
};

export const addMember = createAsyncThunk(
  'utils/addMember',
  async (values) => {
    try {
      const member = await axios.post('https://frosty-backend-dan-koyukis-projects.vercel.app/api/addmember',{
        teamID : values.teamID,
        pokemonName : values.pokemonName,
        ability : values.ability,
        item : values.item,
        ivHP : values.ivHP,
        ivATK : values.ivATK,
        ivDEF : values.ivDEF,
        ivSPA : values.ivSPA,
        ivSPD : values.ivSPD,
        ivSPE : values.ivSPE,
        evHP : values.evHP,
        evATK : values.evATK,
        evDEF : values.evDEF,
        evSPA : values.evSPA,
        evSPD : values.evSPD,
        evSPE : values.evSPE,
        moves1 : values.moves1,
        moves2 : values.moves2,
        moves3 : values.moves3,
        moves4 : values.moves4
      });

      return member.data;
    } catch (error) {
      console.log(error.response.data);
    }
  }
);

export const fetchMember = createAsyncThunk(
  'utils/fetchMember',
  async(values, {rejectWithValue}) => {
    try {
      const members = await axios.post('https://frosty-backend-dan-koyukis-projects.vercel.app/api/fetchmember', {
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
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addMember.pending, (state, action) => {
      return {...state, creationStatus: "pending"};
    });
    builder.addCase(addMember.fulfilled, (state, action) => {
      if (action.payload){
        return {
          _id: action.payload._id,
          teamID : action.payload.teamID,
          pokemonName : action.payload.pokemonName,
          ability : action.payload.ability,
          item : action.payload.item,
          ivHP : action.payload.ivHP,
          ivATK : action.payload.ivATK,
          ivDEF : action.payload.ivDEF,
          ivSPA : action.payload.ivSPA,
          ivSPD : action.payload.ivSPD,
          ivSPE : action.payload.ivSPE,
          evHP : action.payload.evHP,
          evATK : action.payload.evATK,
          evDEF : action.payload.evDEF,
          evSPA : action.payload.evSPA,
          evSPD : action.payload.evSPD,
          evSPE : action.payload.evSPE,
          moves1 : action.payload.moves1,
          moves2 : action.payload.moves2,
          moves3 : action.payload.moves3,
          moves4 : action.payload.moves4
        }
      } else return state;
    });
    builder.addCase(addMember.rejected, (state, action) => {
      return { ...state, creationStatus: "rejected", creationError: action.payload };
    });
    builder.addCase(fetchMember.pending, (state, action) => {
      return {...state, fetchingStatus: "pending"};
    });
    builder.addCase(fetchMember.fulfilled, (state, action) => {
      console.log(action.payload);
      if (action.payload){
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

export default memberSlice.reducer;