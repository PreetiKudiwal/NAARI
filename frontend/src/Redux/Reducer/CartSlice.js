import { createSlice, current } from '@reduxjs/toolkit'

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    data: [],
    totalOriginelPrice: 0,
    totalFinelPrice: 0,
  },
  reducers: {
    addToCart(state, current) {
      console.log(current.payload, "addToCart payload");
      const product_id = state.data.find((item) => (item.product_id._id == current.payload._id && item.size == current.payload.size));
      if (product_id) {
        product_id.qty++;
      } else {
        state.data.push({ product_id: current.payload, qty: 1, size: current.payload.size });
      }

      state.totalOriginelPrice += current.payload.original_price;
      state.totalFinelPrice += current.payload.finel_price;

      localStorage.setItem("cartItem", JSON.stringify(state.data));
      localStorage.setItem("totalOriginelPrice", state.totalOriginelPrice);
      localStorage.setItem("totalFinelPrice", state.totalFinelPrice);
    },
    removeFromCart(state, current) {
      state.data = state.data.filter((item) => (item.product_id._id !== current.payload.product_id || item.size !== current.payload.size));

      state.totalOriginelPrice -= current.payload.original_price * current.payload.qty;
      state.totalFinelPrice -= current.payload.finel_price * current.payload.qty;

      localStorage.setItem("cartItem", JSON.stringify(state.data));
      localStorage.setItem("totalOriginelPrice", state.totalOriginelPrice);
      localStorage.setItem("totalFinelPrice", state.totalFinelPrice);

    },

    moveToCart(state, { payload }) {
      console.log(payload, "moveToCart payload");
      state.data = payload.data;
      state.totalOriginelPrice = state.data.reduce(
          (total, item) =>
            total + (Number(item.product_id.original_price)) * (Number(item.qty)),
          0
        );
        state.totalFinelPrice = state.data.reduce(
          (total, item) =>
            total + (Number(item.product_id.finel_price)) * (Number(item.qty)),
          0
        );

      localStorage.setItem("cartItem", JSON.stringify(state.data));
      localStorage.setItem("totalOriginelPrice", state.totalOriginelPrice);
      localStorage.setItem("totalFinelPrice", state.totalFinelPrice);

    },

    updateQty(state, current) {
      console.log(current.payload, "updateQty payload");
      console.log(state.totalFinelPrice, "totalFinelPrice before updateQty");
      console.log(state.totalOriginelPrice, "totalOriginelPrice before updateQty");
      // const product = state.data.find((item) => (item.product_id._id == current.payload._id && item.product_id.size == current.payload.size));
      const product = state.data.find((item) => item.product_id._id == current.payload.product_id && item.size == current.payload.size);
      if (product) {
        product.qty = current.payload.qty;

        state.totalOriginelPrice = state.data.reduce(
          (total, item) =>
            total + (Number(item.product_id.original_price)) * (Number(item.qty)),
          0
        );
        state.totalFinelPrice = state.data.reduce(
          (total, item) =>
            total + (Number(item.product_id.finel_price)) * (Number(item.qty)),
          0
        );

        
      localStorage.setItem("cartItem", JSON.stringify(state.data));
      localStorage.setItem("totalOriginelPrice", state.totalOriginelPrice);
      localStorage.setItem("totalFinelPrice", state.totalFinelPrice);
      }
    },

    updateSize(state, current) {
      const product = state.data.find((item) => item.product_id._id == current.payload.product_id && item.size == current.payload.oldSize);
      if(product){
        product.size = current.payload.newSize;
        localStorage.setItem("cartItem", JSON.stringify(state.data));
      }
    },

    emptyCart(state) {
      state.data = [];
      state.totalOriginelPrice = 0;
      state.totalFinelPrice = 0;

      localStorage.removeItem("cartItem");
      localStorage.removeItem("totalOriginelPrice");
      localStorage.removeItem("totalFinelPrice");
    },  

    lsGetData(state) {
      const oldCartData = JSON.parse(localStorage.getItem("cartItem")) ?? [];
      const totalOriginelPrice = JSON.parse(localStorage.getItem("totalOriginelPrice")) ?? 0;
      const totalFinelPrice = JSON.parse(localStorage.getItem("totalFinelPrice")) ?? 0;
      state.data = Array.isArray(oldCartData) ? oldCartData : [];
      state.totalOriginelPrice = isNaN(totalOriginelPrice) ? 0 : totalOriginelPrice;
    state.totalFinelPrice = isNaN(totalFinelPrice) ? 0 : totalFinelPrice;
    }
    

    

  },
})

// Action creators are generated for each case reducer function
export const { addToCart, removeFromCart, lsGetData, moveToCart, updateQty, updateSize, emptyCart } = CartSlice.actions

export default CartSlice.reducer