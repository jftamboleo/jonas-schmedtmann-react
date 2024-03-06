import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cart: []
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
      state.cart = state.cart.filter(item => {
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

      if (item.quantity === 0) {
        cartSlice.caseReducers.deleteItem(state, action)
      }
    },
    clearCart: (state) => {
      state.cart = initialState.cart
    }
  }
})

export const getTotalOrderQuantity = (state) => {
  if (state.cart.length === 0) return
  if (state.cart.cart.length === 0) return
  return state.cart.cart.reduce((prev, curr) => {
    return curr.quantity + prev
  }, 0)
}

export const getTotalOrderPrice = (state) => {
  if (state.cart.length === 0) return
  return state.cart.cart.reduce((prev, curr) => {
    return curr.totalPrice + prev
  }, 0)
}

export const getItemQuantity = id => state => {
  const item = state.cart.cart.find(item => item.id === id)
  if (!item) return 0
  return item.quantity
}

export const getCart = (state) => state.cart.cart

export default cartSlice.reducer
export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart
} = cartSlice.actions
