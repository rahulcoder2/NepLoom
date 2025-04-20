import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";

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
      serializableCheck: false,
    });

    if (process.env.NODE_ENV !== "production") {
      middlewareList.push(logger);
    }

    return middlewareList;
  },
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
