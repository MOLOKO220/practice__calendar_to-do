import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // проверить сохранены ли данные фильтра, и поулчем дата в формате yyyy-mm
  month:
    localStorage.getItem("dateFiltr") === null
      ? `${new Date().getFullYear()}-${
          new Date().getMonth() + 1 < 10 ? 0 : ""
        }${new Date().getMonth() + 1}`
      : localStorage.getItem("dateFiltr"),
};

const mainReducer = createSlice({
  name: "save date",
  initialState,
  reducers: {
    saveDate(state, action) {
      state.month = action.payload;
      localStorage.setItem("dateFiltr", action.payload);
    },
  },
});

export const { saveDate } = mainReducer.actions;

export default mainReducer.reducer;
