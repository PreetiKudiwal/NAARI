import { createSlice } from '@reduxjs/toolkit'

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    data: [],
    totalOriginelPrice: 0,
    totalFinelPrice: 0
  },
  reducers: {
    addToCart(state, current) {

      const product = state.data.find((product) => product.product_id == current.payload.product_id);
      if (product) {
        product.qty++;
      } else {
        state.data.push({ product_id: current.payload.product_id, qty: 1 });
      }

      state.totalOriginelPrice += current.payload.original_price;
      state.totalFinelPrice += current.payload.finel_price

      localStorage.setItem("cartItem", JSON.stringify(state.data));
      localStorage.setItem("totalOriginelPrice", state.totalOriginelPrice);
      localStorage.setItem("totalFinelPrice", state.totalFinelPrice);
    },
    removeFromCart(state, current) {
      state.data = state.data.filter((item) => item.product_id !== current.payload.product_id);

      localStorage.setItem("cartItem", JSON.stringify(state.data));

    },

    moveToCart(state, {payload}) {
      state.data = payload.data;
      state.totalOriginelPrice = Number(payload.totalOriginelPrice);
      state.totalFinelPrice = Number(payload.totalFinelPrice);

      localStorage.setItem("cartItem", JSON.stringify(state.data));
      localStorage.setItem("totalOriginelPrice", state.totalOriginelPrice);
      localStorage.setItem("totalFinelPrice", state.totalFinelPrice);

    },

    lsGetData(state) {
      const oldCartData = JSON.parse(localStorage.getItem("cartItem")) ?? [];
      const totalOriginelPrice = localStorage.getItem("totalOriginelPrice");
      const totalFinelPrice = localStorage.getItem("totalFinelPrice");
      state.data = oldCartData;
      state.totalOriginelPrice = Number(totalOriginelPrice);
      state.totalFinelPrice = Number(totalFinelPrice);
    }
  },
})

// Action creators are generated for each case reducer function
export const { addToCart, removeFromCart, lsGetData, moveToCart, emptyCart } = CartSlice.actions

export default CartSlice.reducer