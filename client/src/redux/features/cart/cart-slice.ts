import { createSlice } from "@reduxjs/toolkit";

export interface CartItem {
    id: string;
    quantity: number;
    totalPrice: number;
    price: number;
    name: string;
}

const initialState: CartItem[] = [{
    id: '1',
    quantity: 1,
    totalPrice: 100,
    price: 100,
    name: 'Item 1'
}]

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers:{
        addToCart: (state, action) => {
            const { id, price, name } = action.payload;
            const existingItem = state.find(item => item.id === id);
            if(existingItem){
                existingItem.quantity++;
                existingItem.totalPrice = existingItem.quantity * existingItem.price;
            }else{
                state.push({
                    id,
                    quantity: 1,
                    totalPrice: price,
                    price,
                    name
                })
            }
        },
        removeFromCart: (state, action) => {
            const id = action.payload;
            const existingItem = state.find(item => item.id === id);
            if(existingItem){
                if(existingItem.quantity === 1){
                    return state.filter(item => item.id !== id);
                }
                existingItem.quantity--;
                existingItem.totalPrice = existingItem.quantity * existingItem.price;
            }
        }
    }
})


export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;