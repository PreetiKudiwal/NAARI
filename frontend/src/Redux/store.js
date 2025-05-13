import { configureStore } from '@reduxjs/toolkit'
import AdminSlice from './Reducer/AdminSlice';
import CartSlice from './Reducer/CartSlice';
import UserSlice from './Reducer/UserSlice';

const store = configureStore({
  reducer: {
    admin: AdminSlice,
    cart: CartSlice,
    user: UserSlice
  },
})

export default store;