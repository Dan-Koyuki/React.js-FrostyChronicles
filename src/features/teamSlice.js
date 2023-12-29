import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { uri } from "./api";

const initialState = {
  _id: "",
  name: "",
  userID: "",
  creationStatus: "",
  creationError: "",
  teams: [],
  fetchingStatus: "",
  fetchingError: "",
};

export const createTeam = createAsyncThunk(
  "utils/createTeam",
  async (values, { rejectWithValue }) => {
    try {
      console.log("req:", values);
      const team = await axios.post(`${uri}/api/teams/create`, values);

      return team.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchTeam = createAsyncThunk(
  "utils/fetchTeam",
  async (values, { rejectWithValue }) => {
    try {
      const team = await axios.get(`${uri}/api/teams/get`, {
        params: {
          userID: values.userID,
        },
      });
      return team.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

const teamSlice = createSlice({
  name: "utils",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createTeam.pending, (state, action) => {
      state.creationStatus = 'pending';
    });
    builder.addCase(createTeam.fulfilled, (state, action) => {
      state.teams.push(action.payload);
      state.creationStatus = 'success';
    });
    builder.addCase(createTeam.rejected, (state, action) => {
      state.creationStatus= "rejected";
      state.creationError= action.payload;
    });
    builder.addCase(fetchTeam.pending, (state, action) => {
      state.fetchingStatus = 'pending';
    });
    builder.addCase(fetchTeam.fulfilled, (state, action) => {
      state.teams = action.payload;
      state.fetchingStatus = 'success';
    });
    builder.addCase(fetchTeam.rejected, (state, action) => {
      state.fetchingStatus = 'rejected';
      state.fetchingError = action.payload;
    });
  },
});

export default teamSlice.reducer;
