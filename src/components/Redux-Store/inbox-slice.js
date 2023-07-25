import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  inboxItems: [],
};

const inboxSlice = createSlice({
  name: "inbox",
  initialState,
  reducers: {
    addItems(state,action) {
      state.inboxItems = [...state.inboxItems, ...action.payload.inboxItems];
    }
  
  },
});
export const inboxActions = inboxSlice.actions;

export const inboxItemFill = (email) => {
  return async (dispatch) => {
    try {
      const userEmail = email.replace("@","").replace(".","");
      const resInbox = await fetch(
        `https://ecommerce-auth-a598c-default-rtdb.firebaseio.com/${userEmail}/recievedEmails.json`
      );
      const data = await resInbox.json();

      if (resInbox.ok && data !== null) {
        dispatch(inboxActions.addItems(Object.values(data)));
      } else if(!resInbox.ok) {
          throw Error('Failed to fetch inbox.')
      }
    } catch (error) {
      alert(error);
    }
    // dispatch(inboxActions.addItems(Object.entries(data)));
  };
};

export default inboxSlice.reducer;
