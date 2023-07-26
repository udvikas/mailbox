import { createSlice } from "@reduxjs/toolkit";

const mailSlice = createSlice({
  name: "mail",
  initialState: {
    receivedMail: [],
    sentMail: [],
    viewMail: null,
    changed: false,
    newMailCount: 0,
  },
  reducers: {
    updateReceivedMail(state, action) {
      state.receivedMail = action.payload.mail;
    },
    updateSentMail(state, action) {
      state.sentMail = action.payload.mail;
    },
    deleteReceivedMail(state, action) {
      const id = action.payload.id;
      state.receivedMail = state.receivedMail.filter((mail) => mail.id !== id);
      state.changed = !state.changed;
    },
    deleteSentMail(state, action) {
      const id = action.payload.id;
      state.sentMail = state.sentMail.filter((mail) => mail.id !== id);
      state.changed = !state.changed;
    },
    viewMailHandle(state, action) {
      // const newid = action.payload.id;
      // const index = state.receivedMail.findIndex((mail) => mail.id === newid);
      // state.receivedMail[index].isRead = true;
      // state.viewMail = !state.viewMail;

      const mailId = action.payload?.id; // Use optional chaining to handle undefined case
      if (mailId) {
        const index = state.receivedMail.findIndex(
          (mail) => mail.id === mailId
        );
        if (index !== -1) {
          state.receivedMail[index].isRead = true;
          state.viewMail = state.receivedMail[index]; // Set the mail object to viewMail
        } else {
          state.viewMail = null; // Set to null if the mail with the provided ID is not found
        }
      } else {
        state.viewMail = null; // Set to null if no mail ID is provided (for Sent.js)
      }
    },
    mailHandler(state) {
      state.viewMail = !state.viewMail;
    },
    incrementNewMailCount(state) {
      state.newMailCount = state.receivedMail.filter(
        (mail) => !mail.isRead
      ).length;
    },
    resetNewMailCount(state) {
      state.newMailCount = 0;
    },
    decrementNewMailCount(state) {
      if (state.newMailCount > 0) {
        state.newMailCount--;
      }
    },
  },
});

export const mailActions = mailSlice.actions;

export default mailSlice.reducer;
