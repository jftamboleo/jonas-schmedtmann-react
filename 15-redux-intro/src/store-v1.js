import { createStore, combineReducers } from 'redux'

const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: ''
}

const initialStateCustomer = {
  fullName: '',
  nationalId: '',
  createdAt: ''
}

const accountReducer = (state = initialStateAccount, action) => {
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

const customerReducer = (state = initialStateCustomer, action) => {
  switch (action.type) {
    case 'customer/createCustomer': {
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalId: action.payload.nationalId,
        createdAt: action.payload.createdAt
      }
    }
    case 'customer/updateName': {
      return {
        ...state,
        fullName: action.payload
      }
    }
    default: {
      return state
    }
  }
}

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer
})

const store = createStore(rootReducer)

const deposit = (balance) => {
  return { type: 'account/deposit', payload: balance }
}

const withdraw = (balance) => {
  return { type: 'account/withdraw', payload: balance }
}

const requestLoan = (amount, purpose) => {
  return { type: 'account/requestLoan', payload: { amount, purpose } }
}

const payLoan = () => {
  return { type: 'account/payLoan' }
}

const createCustomer = (fullName, nationalId) => {
  return { type: 'customer/createCustomer', payload: { fullName, nationalId, createdAt: new Date().toISOString() } }
}

const updateName = (fullName) => {
  return { type: 'customer/updateName', payload: fullName }
}
