import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./AuthSlice";
import mailSlice from "./mail-slice";
import uiSlice from "./ui-slice";

const store = configureStore({
  reducer: {
    auth: AuthSlice,
    mail: mailSlice,
    ui:uiSlice,
  },
});
export default store;
