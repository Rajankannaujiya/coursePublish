import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  show: false,
};

const popupSlice = createSlice({
  name: "popup",
  initialState,
  reducers: {
    showPopup: (state) => {
      state.show = true;
    },
    hidePopup: (state) => {
      state.show = false;
    },
    togglePopup: (state) => {
      state.show = !state.show;
    },
  },
});

export const { showPopup, hidePopup, togglePopup } = popupSlice.actions;
export default popupSlice.reducer;
