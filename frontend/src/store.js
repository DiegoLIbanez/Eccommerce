import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './slices/apiSlices';
import cartSliceReducer from './slices/cartSlices';
import authReducer from './slices/authSlice'; // add this line

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart: cartSliceReducer,
    auth: authReducer, // add this line
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;