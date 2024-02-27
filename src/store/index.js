import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";

import authApi from "./apis/authentication";
// import productApi from "./apis/product";
// import orderApi from "./apis/order";

import { authPersistReducer } from "./slices/authSlice";
// import { productPersistReducer } from "./slices/productSlice";
// import { orderPersistReducer } from "./slices/orderSlice";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    // [productApi.reducerPath]: productApi.reducer,
    // [orderApi.reducerPath]: orderApi.reducer,
    auth: authPersistReducer,
    // product: productPersistReducer,
    // order: orderPersistReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat([
      authApi.middleware,
      // productApi.middleware,
      // orderApi.middleware
    ]),
});

export const persistor = persistStore(store);
