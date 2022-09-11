import { combineReducers, configureStore } from "@reduxjs/toolkit";
import mainReducer from "./mainReducer";

const rootReducer = combineReducers({
  main: mainReducer,
});

export const storage = configureStore({
  reducer: rootReducer,
});
