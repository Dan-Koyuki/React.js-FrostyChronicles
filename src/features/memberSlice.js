import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { uri } from './api';

const initialState = {
  members: [],
  fetchingStatus: '',
  fetchingError:'',
  membertotal: '',
  pokemon: {},
  status: '',
};

export const fetchMember = createAsyncThunk(
  'utils/fetchMember',
  async(values, {rejectWithValue}) => {
    try {
      const members = await axios.get(`${uri}/api/members/find`, {
        params: {
          teamID: values.teamID,
        },
      });
      return members.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const oneMember = createAsyncThunk(
  'utils/oneMember',
  async(pokemonID) => {
    try {
      const member = await axios.get(`${uri}/api/members/find/${pokemonID}`);
      return member.data;
    } catch (error) {
      console.log(error.response.data);
    }
  }
)

const memberSlice = createSlice({
  name: 'utils',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMember.pending, (state, action) => {
      state.fetchingStatus = 'pending';
    });
    builder.addCase(fetchMember.fulfilled, (state, action) => {
      state.members = action.payload;
      state.fetchingStatus = 'success';
      state.membertotal = action.payload.length;
    });
    builder.addCase(fetchMember.rejected, (state, action) => {
      state.fetchingStatus = 'rejected';
      state.fetchingError = action.payload;
    });
    builder.addCase(oneMember.pending, (state, action) => {
      state.status = 'pending';
    });
    builder.addCase(oneMember.fulfilled, (state, action) => {
      state.pokemon = action.payload;
      state.status = 'success';
    });
    builder.addCase(oneMember.rejected, (state, action) => {
      state.status = 'rejected';
    });
  }
});

export default memberSlice.reducer;