import { createSlice } from "@reduxjs/toolkit";

const reducer = createSlice({
  name: "reducer",
  initialState: {
    token: null,
    initialGoogleToken: null,
    bingoCaller: false,
    hostData: {},
    playerData: [],
    gameId: "",
    profileData: {},
    socketConnect: null,
    deviceId: null,
  },
  reducers: {
    saveToken: (state, action) => {
      state.token = action.payload;
    },
    saveGoogleToken: (state, action) => {
      state.initialGoogleToken = action.payload;
    },
    isBingoCaller: (state, action) => {
      state.bingoCaller = action.payload;
    },
    bingoHostData: (state, action) => {
      state.hostData = action.payload;
    },
    bingoPlayerData: (state, action) => {
      state.playerData = action.payload;
    },
    playerGameId: (state, action) => {
      state.gameId = action.payload;
    },
    userProfile: (state, action) => {
      state.profileData = action.payload;
    },
    setSocketConnect: (state, action) => {
      state.socketConnect = action.payload;
    },
    getDeviceId: (state, action) => {
      state.deviceId = action.payload;
    },
  },
});
export const {
  saveToken,
  saveGoogleToken,
  isBingoCaller,
  bingoHostData,
  bingoPlayerData,
  playerGameId,
  userProfile,
  setSocketConnect,
  getDeviceId,
} = reducer.actions;
export default reducer.reducer;
