import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./AuthSlice";
import mailSlice from "./mail-slice";

const store = configureStore({
  reducer: {
    auth: AuthSlice,
    mail: mailSlice,
  },
});
export default store;
