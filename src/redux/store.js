import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
// import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from "redux-persist";
import reducer from "./reducer";
import AsyncStorage from "@react-native-async-storage/async-storage";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
