import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth/authSlice";
import { postsReducer } from "./posts/postSlice";
import {
  persistStore,
  persistReducer ,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";


import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage, 
  whitelist: ['auth'], 
};


const persistedReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
    reducer: {
        auth: persistedReducer,
        posts: postsReducer,

    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }),
});

export const persistor = persistStore(store);     

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;