import { useReducer } from 'react'

const useCounter = () => {
  const initialState = {
    count: 0,
    step: 1
  }

  const reducer = (state, action) => {
    switch (action.type) {
      case 'inc': {
        return {
          ...state,
          count: state.count + state.step
        }
      }
      case 'dec': {
        return {
          ...state,
          count: state.count - state.step
        }
      }
      case 'setCount': {
        return {
          ...state,
          count: action.payload
        }
      }
      case 'step': {
        return {
          ...state,
          step: action.payload
        }
      }
      case 'reset': {
        return initialState
      }
      default: {
        return state
      }
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  const dec = function () {
    dispatch({ type: 'dec' })
  }
  const inc = function () {
    dispatch({ type: 'inc' })
  }
  const defineCount = function (e) {
    dispatch({ type: 'setCount', payload: Number(e.target.value) })
  }
  const defineStep = function (e) {
    dispatch({ type: 'step', payload: Number(e.target.value) })
  }
  const reset = function () {
    dispatch({ type: 'reset' })
  }

  return { dec, inc, defineCount, defineStep, reset, counter: state }
}

function DateCounter () {
  const { counter, dec, inc, defineCount, defineStep, reset } = useCounter()

  // This mutates the date object.
  const date = new Date('june 21 2027')
  date.setDate(date.getDate() + counter.count)

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={counter.step}
          onChange={defineStep}
        />
        <span>{counter.step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={counter.count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  )
}
export default DateCounter
