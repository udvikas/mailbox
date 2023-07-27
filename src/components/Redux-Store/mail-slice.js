import { createSlice } from "@reduxjs/toolkit";

const mailSlice = createSlice({
  name: "mail",
  initialState: {
    receivedMail: [],
    sentMail: [],
    viewReceivedMail: null, // Separate state for received mail
    viewSentMail: null, // Separate state for sent mail
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

      const mailId = action.payload?.id;
      if (mailId) {
        const receivedIndex = state.receivedMail.findIndex(
          (mail) => mail.id === mailId
        );
        const sentIndex = state.sentMail.findIndex(
          (mail) => mail.id === mailId
        );

        if (receivedIndex !== -1) {
          state.receivedMail[receivedIndex].isRead = true;
          state.viewReceivedMail = state.receivedMail[receivedIndex];
        } else if (sentIndex !== -1) {
          state.sentMail[sentIndex].isRead = true;
          state.viewSentMail = state.sentMail[sentIndex];
        } else {
          state.viewReceivedMail = null;
          state.viewSentMail = null;
        }
      } else {
        state.viewReceivedMail = null;
        state.viewSentMail = null;
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
