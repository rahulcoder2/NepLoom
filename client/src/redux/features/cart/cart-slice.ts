import { createSlice } from "@reduxjs/toolkit";


interface CartSliceTypes{
  userCart: UserCart | null;
  isAddOrUpdateToCartInProgress: boolean;
  isRemoveFromCartInProgress: boolean;
}

const initialState: CartSliceTypes = {
  userCart: null,
  isAddOrUpdateToCartInProgress: false,
  isRemoveFromCartInProgress: false,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setUserCart: (state, action) => {
      state.userCart = action.payload;
    },
    setAddOrUpdateToCartInProgress: (state, action) => {
      state.isAddOrUpdateToCartInProgress = action.payload;
    },
    setRemoveFromCartInProgress: (state, action) => {
      state.isRemoveFromCartInProgress = action.payload;
    },
    clearUserCart: () => {
      return  initialState;
    }
  },
});

export const { setUserCart, clearUserCart, setAddOrUpdateToCartInProgress, setRemoveFromCartInProgress } = cartSlice.actions;

export default cartSlice.reducer;
