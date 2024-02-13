import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deposit, withdraw, payLoan, requestLoan } from './accountSlice'

function AccountOperations () {
  const [depositAmount, setDepositAmount] = useState('')
  const [withdrawalAmount, setWithdrawalAmount] = useState('')
  const [inputLoan, setInputLoan] = useState('')
  const [inputLoanPurpose, setinputLoanPurpose] = useState('')
  const [currency, setCurrency] = useState('USD')

  const dispatch = useDispatch()
  const { loan, loanPurpose } = useSelector(store => store.account)

  function handleDeposit () {
    if (!depositAmount || depositAmount <= 0) return
    dispatch(deposit(depositAmount))
    setDepositAmount('')
  }

  function handleWithdrawal () {
    if (!withdrawalAmount || withdrawalAmount <= 0) return
    dispatch(withdraw(withdrawalAmount))
    setWithdrawalAmount('')
  }

  function handleRequestLoan () {
    if (!inputLoan || inputLoan <= 0 || !inputLoanPurpose) return
    dispatch(requestLoan(inputLoan, inputLoanPurpose))
    setInputLoan('')
    setinputLoanPurpose('')
  }

  function handlePayLoan () {
    dispatch(payLoan())
  }

  return (
    <div>
      <h2>Your account operations</h2>
      <div className='inputs'>
        <div>
          <label>Deposit</label>
          <input
            type='number'
            value={depositAmount}
            onChange={(e) => setDepositAmount(+e.target.value)}
          />
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value='USD'>US Dollar</option>
            <option value='EUR'>Euro</option>
            <option value='GBP'>British Pound</option>
          </select>

          <button onClick={handleDeposit}>Deposit {depositAmount}</button>
        </div>

        <div>
          <label>Withdraw</label>
          <input
            type='number'
            value={withdrawalAmount}
            onChange={(e) => setWithdrawalAmount(+e.target.value)}
          />
          <button onClick={handleWithdrawal}>
            Withdraw {withdrawalAmount}
          </button>
        </div>

        <div>
          <label>Request loan</label>
          <input
            type='number'
            value={inputLoan}
            onChange={(e) => setInputLoan(+e.target.value)}
            placeholder='Loan amount'
          />
          <input
            value={inputLoanPurpose}
            onChange={(e) => setinputLoanPurpose(e.target.value)}
            placeholder='Loan purpose'
          />
          <button onClick={handleRequestLoan} disabled={loan > 0}>Request loan</button>
        </div>

        {loan > 0 &&
          <div>
            <button onClick={handlePayLoan}>Pay loan</button>
            <span> Pay back ${loan} ({loanPurpose})</span>
          </div>
        }
      </div>
    </div>
  )
}

export default AccountOperations
