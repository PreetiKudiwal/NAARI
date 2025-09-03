import { createSlice } from "@reduxjs/toolkit";

export const WishlistSlice = createSlice({
    name: 'wishlist',
    initialState: {
        data: []
    },
    reducers: {
        addToWishlist(state, current) {

        },

        removeFormWishlist(state) {

        }
    }
})


export const { addToWishlist, removeFormWishlist } = WishlistSlice.actions;
export default WishlistSlice.reducer