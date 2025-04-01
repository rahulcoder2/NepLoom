import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist/es/constants";

import logger from "redux-logger";
import authReducer from "./features/auth/auth-slice";
import CartReducer from "./features/cart/cart-slice";

const rootReducer = combineReducers({
  // Add reducers here
  auth: authReducer,
  cart: CartReducer,
});

// Configure Redux Persist
const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create Redux Store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    const middlewareList = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    });

    if (process.env.NODE_ENV !== "production") {
      middlewareList.push(logger);
    }

    return middlewareList;
  },
});

export const persistor = persistStore(store);

// Types for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
