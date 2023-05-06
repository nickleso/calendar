import { createSlice } from "@reduxjs/toolkit";
import { createNewEvent } from "./eventsOperations";

const eventsInitialState = {
  newEvent: null,
  // noticesList: [],
  // ownList: [],
  // favoriteList: [],
  // isLoading: false,
  // searchBtnIsActive: true,
  // error: null,
  // searchError: null,
};

const eventsSlice = createSlice({
  name: "events",
  initialState: eventsInitialState,

  extraReducers: (builder) => {
    builder.addCase(createNewEvent.fulfilled, (state, action) => {
      state.newEvent = action.payload;
    });
  },
});

export const eventsReducer = eventsSlice.reducer;
