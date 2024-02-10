import { useReducer, useEffect } from 'react'

const SECONDS_PER_Q = 30

export const useQuestions = () => {
  const initialState = {
    questions: [],
    status: 'loading',
    index: 0,
    answer: null,
    points: 0,
    highscore: 0,
    secondsRemaining: null
  }

  const reducer = (state, action) => {
    switch (action.type) {
      case 'dataReceived': {
        return {
          ...state,
          questions: action.payload,
          status: 'ready'
        }
      }
      case 'dataFailed': {
        return { ...state, status: 'error' }
      }
      case 'start': {
        return {
          ...state,
          status: 'active',
          secondsRemaining: state.questions.length * SECONDS_PER_Q
        }
      }
      case 'newAnswer': {
        const question = state.questions[state.index]
        return {
          ...state,
          answer: action.payload,
          points: question.correctOption === action.payload
            ? state.points + question.points
            : state.points
        }
      }
      case 'nextQuestion': {
        return {
          ...state,
          index: state.index + 1,
          answer: null
        }
      }
      case 'finishQuiz': {
        return {
          ...state,
          status: 'finished',
          answer: null,
          highscore: state.points > state.highscore
            ? state.points
            : state.highscore
        }
      }
      case 'restartQuiz': {
        return {
          ...initialState,
          highscore: state.highscore,
          questions: state.questions,
          status: 'ready'
        }
      }
      case 'tick': {
        if (state.secondsRemaining === 0) {
          return {
            ...state,
            status: 'finished',
            answer: null,
            secondsRemaining: 0,
            highscore: state.points > state.highscore
              ? state.points
              : state.highscore
          }
        }
        return {
          ...state,
          secondsRemaining: state.secondsRemaining - 1
        }
      }
      default: {
        throw new Error('Unknown action')
      }
    }
  }

  const [{
    questions,
    status,
    index,
    answer,
    points,
    highscore,
    secondsRemaining
  }, dispatch] = useReducer(reducer, initialState)
  const maxPoints = questions.reduce((prev, curr) => prev + curr.points, 0)
  const numQuestions = questions.length

  useEffect(() => {
    fetch('http://localhost:8000/questions')
      .then(res => res.json())
      .then(data => dataReceived(data))
      .catch(() => dataFailed())
  }, [])

  const dataReceived = (data) => {
    dispatch({ type: 'dataReceived', payload: data })
  }
  const dataFailed = () => {
    dispatch({ type: 'dataFailed' })
  }
  const startQuiz = () => {
    dispatch({ type: 'start' })
  }
  const newAnswer = (selectedAnswer) => {
    dispatch({ type: 'newAnswer', payload: selectedAnswer })
  }
  const nextQuestion = () => {
    dispatch({ type: 'nextQuestion' })
  }
  const finishQuiz = () => {
    dispatch({ type: 'finishQuiz' })
  }
  const restartQuiz = () => {
    dispatch({ type: 'restartQuiz' })
  }
  const tick = () => {
    dispatch({ type: 'tick' })
  }

  return {
    questions,
    status,
    index,
    answer,
    points,
    maxPoints,
    numQuestions,
    highscore,
    secondsRemaining,
    startQuiz,
    newAnswer,
    nextQuestion,
    finishQuiz,
    restartQuiz,
    tick
  }
}
