const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: ''
}

export const accountReducer = (state = initialStateAccount, action) => {
  switch (action.type) {
    case 'account/deposit': {
      return {
        ...state,
        balance: state.balance + action.payload
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
    default:
      return state
  }
}

export const deposit = (balance) => {
  return { type: 'account/deposit', payload: balance }
}

export const withdraw = (balance) => {
  return { type: 'account/withdraw', payload: balance }
}

export const requestLoan = (amount, purpose) => {
  return { type: 'account/requestLoan', payload: { amount, purpose } }
}

export const payLoan = () => {
  return { type: 'account/payLoan' }
}
