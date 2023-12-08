import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
  _id: '',
  name: '',
  userID: '',
  creationStatus: '',
  creationError: '',
  teams: [],
  fetchingStatus: '',
  fetchingError:''
};

export const createTeam = createAsyncThunk(
  'utils/createTeam',
  async (values, {rejectWithValue}) => {
    try {
      const team = await axios.post('https://frosty-backend.vercel.app/api/createteam', {
        name: values.name,
        userID: values.userID
      });

      return team.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchTeam = createAsyncThunk(
  'utils/fetchTeam',
  async(values, {rejectWithValue}) => {
    try {
      const team = await axios.post('https://frosty-backend.vercel.app/api/fetchteam', {
        userID: values.userID
      });
      return team.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

const teamSlice = createSlice({
  name: 'utils',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createTeam.pending, (state, action) => {
      return {...state, creationStatus: "pending"};
    });
    builder.addCase(createTeam.fulfilled, (state, action) => {
      if (action.payload){
        return {
          _id: action.payload._id,
          name: action.payload.name,
          userID: action.payload.userID
        }
      } else return state;
    });
    builder.addCase(createTeam.rejected, (state, action) => {
      return { ...state, creationStatus: "rejected", creationError: action.payload };
    });
    builder.addCase(fetchTeam.pending, (state, action) => {
      return {...state, fetchingStatus: "pending"};
    });
    builder.addCase(fetchTeam.fulfilled, (state, action) => {
      console.log(action.payload);
      if (action.payload){
        return {
          ...state,
          fetchingStatus: 'success',
          teams: action.payload
        }
      } else return state;
    });
    builder.addCase(fetchTeam.rejected, (state, action) => {
      return { ...state, fetchingStatus: "rejected", fetchingError: action.payload };
    });
  }
});

export default teamSlice.reducer;
