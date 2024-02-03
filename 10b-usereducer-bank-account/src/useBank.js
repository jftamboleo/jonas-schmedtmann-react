import { useReducer } from 'react'

const LOAN_QTY = 5000

const ACTION_TYPES = {
  openAccount: 'openAccount',
  deposit: 'deposit',
  withdraw: 'withdraw',
  requestLoan: 'requestLoan',
  payLoan: 'payLoan',
  closeAccount: 'closeAccount'
}

export const useBank = () => {
  const initialState = {
    balance: 0,
    loan: 0,
    isActive: false
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case ACTION_TYPES.openAccount: {
        return {
          ...state,
          isActive: true,
          balance: 500
        }
      }
      case ACTION_TYPES.deposit: {
        return {
          ...state,
          balance: state.balance + 150
        }
      }
      case ACTION_TYPES.withdraw: {
        return {
          ...state,
          balance: state.balance - 50
        }
      }
      case ACTION_TYPES.requestLoan: {
        if (state.loan !== 0) return state
        return {
          ...state,
          balance: state.balance + LOAN_QTY,
          loan: state.loan + LOAN_QTY
        }
      }
      case ACTION_TYPES.payLoan: {
        if (state.loan === 0) return state
        return {
          ...state,
          balance: state.balance - LOAN_QTY,
          loan: state.loan - LOAN_QTY
        }
      }
      case ACTION_TYPES.closeAccount: {
        if (state.balance !== 0 || state.loan !== 0) return state
        return { ...initialState }
      }
      default: {
        throw new Error('Unknown action') 
      }
    }
  }

  const [{
    balance,
    loan,
    isActive
  }, dispatch] = useReducer(reducer, initialState)

  const openAccount = () => {
    dispatch({ type: ACTION_TYPES.openAccount })
  }
  const deposit = () => {
    dispatch({ type: ACTION_TYPES.deposit })
  }
  const withdraw = () => {
    dispatch({ type: ACTION_TYPES.withdraw })
  }
  const requestLoan = () => {
    dispatch({ type: ACTION_TYPES.requestLoan })
  }
  const payLoan = () => {
    dispatch({ type: ACTION_TYPES.payLoan })
  }
  const closeAccount = () => {
    dispatch({ type: ACTION_TYPES.closeAccount })
  }

  return {
    balance,
    loan,
    isActive,
    openAccount,
    deposit,
    withdraw,
    requestLoan,
    payLoan,
    closeAccount
  }
}