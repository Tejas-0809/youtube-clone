import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
  error: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.loading = false;
      state.error = true;
      state.currentUser = null;
      localStorage.removeItem("persist:root");
    },
    logout: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = false;
    },
    subscription: (state, action) => {
      // Handle both nested and direct user data structures
      const userData = state.currentUser?.user || state.currentUser;

      if (userData && Array.isArray(userData.subscribedUsers)) {
        const channelId = action.payload;
        const isSubscribed = userData.subscribedUsers.includes(channelId);

        if (isSubscribed) {
          // Unsubscribe - remove from array
          userData.subscribedUsers = userData.subscribedUsers.filter(
            (id) => id !== channelId
          );
        } else {
          // Subscribe - add to array
          userData.subscribedUsers.push(channelId);
        }

        // Update the state properly whether it's nested or not
        if (state.currentUser?.user) {
          state.currentUser.user = userData;
        } else {
          state.currentUser = userData;
        }
      }
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, subscription } =
  userSlice.actions;

export default userSlice.reducer;