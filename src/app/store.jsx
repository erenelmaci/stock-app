import { configureStore } from "@reduxjs/toolkit"
import authReducer from "../features/authSlice"
import stockReducer from "../features/stockSlice"
import storage from "redux-persist/lib/storage" 

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist"

const persistConfig = {
  key: "root",
  storage,
}

const persistedReducer = persistReducer(persistConfig, authReducer)

const store = configureStore({
  reducer: {
    auth: persistedReducer,
    stock: stockReducer,
  },

  middleware: (getDefaultMiddleware) => //! redux-persist kullanırken serileştirmede sıkıntı yaşanıyor persist kullanırken middleware kullanıması gerekiyor yoksa hata veriyor !!! 
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV !== "production",
})

export const persistor = persistStore(store)
export default store
