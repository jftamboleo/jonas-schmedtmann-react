import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: '',
  isLoading: false
}

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    deposit: (state, action) => {
      state.balance += action.payload
      state.isLoading = false
    },
    withdraw: (state, action) => {
      state.balance -= action.payload
    },
    requestLoan: {
      prepare: (amount, purpose) => {
        return {
          payload: { amount, purpose }
        }
      },
      reducer: (state, action) => {
        if (state.loan !== 0) return

        state.balance += action.payload.amount
        state.loan = action.payload.amount
        state.loanPurpose = action.payload.purpose
      }
    },
    payLoan: (state) => {
      if (state.loan === 0) return
      state.balance -= state.loan
      state.loan = 0
      state.loanPurpose = ''
    },
    convertingCurrency: (state) => {
      state.isLoading = true
    }
  }
})

export const deposit = (amount, currency) => {
  if (currency === 'USD') return { type: 'account/deposit', payload: amount }
  return async (dispatch, getState) => {
    dispatch({ type: 'account/convertingCurrency' })
    const response = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`)
    const data = await response.json()
    const convertedAmount = data.rates.USD
    dispatch({ type: 'account/deposit', payload: convertedAmount })
  }
}

export default accountSlice.reducer
export const {
  withdraw,
  requestLoan,
  payLoan,
  convertingCurrency
} = accountSlice.actions

/*
export const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'account/deposit': {
      return {
        ...state,
        balance: state.balance + action.payload,
        isLoading: false
      }
    }
    case 'account/withdraw': {
      return {
        ...state,
        balance: state.balance - action.payload
      }
    }
    case 'account/requestLoan': {
      if (state.loan !== 0) return state
      return {
        ...state,
        balance: state.balance + action.payload.amount,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose
      }
    }
    case 'account/payLoan': {
      if (state.loan === 0) return state
      return {
        ...state,
        balance: state.balance - state.loan,
        loan: 0,
        loanPurpose: ''
      }
    }
    case 'account/convertingCurrency': {
      return {
        ...state,
        isLoading: true
      }
    }
    default:
      return state
  }
}

export const deposit = (amount, currency) => {
  if (currency === 'USD') return { type: 'account/deposit', payload: amount }
  return async (dispatch, getState) => {
    dispatch({ type: 'account/convertingCurrency' })
    const response = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`)
    const data = await response.json()
    const convertedAmount = data.rates.USD
    dispatch({ type: 'account/deposit', payload: convertedAmount })
  }
}

export const withdraw = (amount) => {
  return { type: 'account/withdraw', payload: amount }
}

export const requestLoan = (amount, purpose) => {
  return { type: 'account/requestLoan', payload: { amount, purpose } }
}

export const payLoan = () => {
  return { type: 'account/payLoan' }
}

*/
