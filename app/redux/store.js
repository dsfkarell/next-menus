import { configureStore } from '@reduxjs/toolkit';
import { cartReducer } from './cart.slice';
import { snackReducer } from './snack.slice';

const reducer = {
  cart: cartReducer,
  snack: snackReducer,
};

const store = configureStore({
  reducer,
});

export default store;