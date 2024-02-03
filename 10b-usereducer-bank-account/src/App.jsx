import "./styles.css";
import "./App.css"
import { useBank } from './useBank.js'

export default function App() {
  const {
    balance,
    loan,
    isActive,
    openAccount,
    deposit,
    withdraw,
    requestLoan,
    payLoan,
    closeAccount
  } = useBank()
  return (
    <div className="App">
      <h1>useReducer Bank Account</h1>
      <p>Balance: {balance}</p>
      <p>Loan: {loan}</p>

      <p>
        <button onClick={openAccount} disabled={isActive}>
          Open account
        </button>
      </p>
      <p>
        <button onClick={deposit} disabled={!isActive}>
          Deposit 150
        </button>
      </p>
      <p>
        <button onClick={withdraw} disabled={!isActive}>
          Withdraw 50
        </button>
      </p>
      <p>
        <button onClick={requestLoan} disabled={!isActive}>
          Request a loan of 5000
        </button>
      </p>
      <p>
        <button onClick={payLoan} disabled={!isActive}>
          Pay loan
        </button>
      </p>
      <p>
        <button onClick={closeAccount} disabled={!isActive}>
          Close account
        </button>
      </p>
    </div>
  );
}
