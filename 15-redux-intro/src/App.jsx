import { useSelector } from 'react-redux'
import CreateCustomer from './features/customer/CreateCustomer'
import Customer from './features/customer/Customer'
import AccountOperations from './features/account/AccountOperations'
import BalanceDisplay from './features/account/BalanceDisplay'

function App () {
  const customerName = useSelector(store => store.customer.fullName)
  return (
    <div>
      <h1>🏦 The React-Redux Bank ⚛️</h1>
      {!customerName
        ? <CreateCustomer />
        : <>
            <Customer />
          <AccountOperations />
          <BalanceDisplay />
          </>}
    </div>
  )
}

export default App
