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
  updateStatus: '',
  onestatus: ''
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
);

export const memberUpdate = createAsyncThunk(
  'utils/memberUpdate',
  async (values) => {
    try {
      console.log("values: ", values);
      console.log("updatedPokemon", values.updatePokemon._id);
      const response = await axios.put(
        `${uri}/api/members/${values.updatePokemon._id}`,
        values
      )

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteMember = createAsyncThunk(
  'utils/deleteMember',
  async (id) => {
    try {
      const response = await axios.delete(`${uri}/api/members/find/${id}`);

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
)

export const addMember = createAsyncThunk(
  'utils/addMember',
  async(value) => {
    try {
      console.log("req: ", value);
      const newPokemon = await axios.post(`${uri}/api/members/add`, value);

      return newPokemon.data;
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
      state.onestatus = 'pending';
    });
    builder.addCase(oneMember.fulfilled, (state, action) => {
      state.pokemon = action.payload;
      state.onestatus = 'success';
    });
    builder.addCase(oneMember.rejected, (state, action) => {
      state.onestatus = 'rejected';
    });
    builder.addCase(memberUpdate.pending, (state, action) => {
      state.updateStatus = 'pending';
    });
    builder.addCase(memberUpdate.fulfilled, (state, action) => {
      const updatedMember = state.members.map((member) =>
        member._id === action.payload._id ? action.payload : member
      );
      state.members = updatedMember;
      state.updateStatus = 'succes';
      console.log("updatedMembers: ", updatedMember);
    });
    builder.addCase(memberUpdate.rejected, (state, action) => {
      state.updateStatus = 'rejected';
    });
    builder.addCase(deleteMember.pending, (state, action) => {
      state.updateStatus = 'pending';
    });
    builder.addCase(deleteMember.fulfilled, (state, action) => {
      const newList = state.members.filter((member) => member._id !== action.payload._id);
      state.members = newList;
      state.updateStatus = 'succes';
    });
    builder.addCase(deleteMember.rejected, (state, action) => {
      state.updateStatus = 'rejected';
    });
    builder.addCase(addMember.pending, (state, action) => {
      state.status = 'pending';
    });
    builder.addCase(addMember.fulfilled, (state, action) => {
      state.members.push(action.payload);
      state.membertotal = state.membertotal + 1;
      state.status = 'success';
    });
    builder.addCase(addMember.rejected, (state, action) => {
      state.status = 'rejected';
    });
  }
});

export default memberSlice.reducer;