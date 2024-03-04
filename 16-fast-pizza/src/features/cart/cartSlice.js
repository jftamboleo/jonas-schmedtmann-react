import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cart: [
    {
      id: 12,
      name: 'Mediterranean',
      quantity: 2,
      unitPrice: 16,
      totalPrice: 32
    }
  ]
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      // payload = new item
      state.cart.push({
        ...action.payload
      })
    },
    deleteItem: (state, action) => {
      // payload = id
      state.cart.filter(item => {
        return action.payload !== item.id
      })
    },
    increaseItemQuantity: (state, action) => {
      // payload = id
      const item = state.cart.find(item => {
        return item.id === action.payload
      })
      if (item === undefined) return

      item.quantity++
      item.totalPrice = item.quantity * item.unitPrice

      // state.cart[index].quantity += 1
      // state.cart[index].totalPrice += state.cart[index].quantity * state.cart[index].unitPrice
    },
    decreaseItemQuantity: (state, action) => {
      // payload = id
      const item = state.cart.find(item => {
        return item.id === action.payload
      })
      if (item === undefined) return

      item.quantity--
      item.totalPrice = item.quantity * item.unitPrice
    },
    clearCart: (state, action) => {
      state.cart = initialState
    }
  }
})

export default cartSlice.reducer
export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart
} = cartSlice.actions
