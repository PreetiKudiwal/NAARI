import { createSlice } from '@reduxjs/toolkit'

export const UserSlice = createSlice({
  name: 'user',
  initialState: {
    data: null,
    token: null
  },
  reducers: {
    UserLogin(state, current) {
      console.log(current.payload.data);
      localStorage.setItem('userLogin', JSON.stringify(current.payload.data));
      state.data = current.payload.data;
      localStorage.setItem('userToken', current.payload.token);
      state.token = current.payload.token;
    },
    UserLogout(state) {
      state.data = null;
      state.token = null;
      localStorage.removeItem('userLogin');
      localStorage.removeItem('userToken');
    }
  },
})

// Action creators are generated for each case reducer function
export const { UserLogin, UserLogout } = UserSlice.actions

export default UserSlice.reducer