import { useReducer, createContext, useContext } from 'react'

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz"
}

const initialState = {
  user: null,
  isAuthenticated: false,
  error: ''
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'login': {
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        error: ''
      }
    }
    case 'logout': {
      return initialState
    }
    case 'error': {
      return {
        ...state,
        error: action.payload
      }
    }
    default: throw new Error('Unknown action')
  }
}

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [{ isAuthenticated, user, error }, dispatch] = useReducer(reducer, initialState)

  const login = ({ email, password }) => {
    if (!email || !password) {
      dispatch({ type: 'error', payload: 'Username or password not provided. Try again!' })
      return
    }
    if (email !== FAKE_USER.email || password !== FAKE_USER.password) {
      dispatch({ type: 'error', payload: 'Wrong username or password. Try again!' })
      return
    }
    dispatch({ type: 'login', payload: FAKE_USER })
  }
  const logout = () => {
    dispatch({ type: 'logout' })
  }
  return (
    <AuthContext.Provider
    value={{
      user,
      isAuthenticated,
      error,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) throw new Error('AuthContext was used outside AuthProvider')
  return context
}
