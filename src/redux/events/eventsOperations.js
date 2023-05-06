import { createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// axios.defaults.baseURL = `https://petly-site-back.up.railway.app`;

export const createNewEvent = createAsyncThunk(
  "events/createEvent",
  async (event, thunkAPI) => {
    try {
      console.log(event);
      return event;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// export const fetchNoticesByCategory = createAsyncThunk(
//   "notices/fetchByCategory",
//   async (category, thunkAPI) => {
//     const url = `/notices/category/${category}`;
//     try {
//       const result = await axios.get(url);
//       return result.data.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );
