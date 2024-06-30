import {createContext, useContext, useEffect, useMemo, useReducer, useState} from "react";
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

const initialState = {
  isLoggedIn: false,
  isLoading: false,
  user: null
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        user: action.payload
      }
    case 'LOGOUT':
      return initialState
    case 'LOADING':
      return {
        ...state,
        isLoading: action.payload,
      }
    default:
      return state
  }
}
//context custom hook for passing values
export const useAuth = () => {
  return useContext(AuthContext);
}

// eslint-disable-next-line react/prop-types
export function AuthProvider({children}){

  const [token, setToken] = useState(() => {
    return localStorage.getItem('token')
  })

  const [state, dispatch] = useReducer(reducer, initialState)


  

  useEffect(() => {
    if (!saveToken) return
    getMe()
  }, []) 


  const signedUserRole = useMemo(() => state?.user?.role, [state.user]);

  const isAuthenticated = useMemo(() => state?.isLoggedIn, [state.isLoggedIn]);

  const saveToken = useMemo(() => localStorage.getItem('token'), [])

  console.log(signedUserRole, isAuthenticated)

  const getMe = async (paramToken) => {
    dispatch({type: 'LOADING', payload: true})
   const token = paramToken || localStorage.getItem('token')
    try {
      const response = await fetch('https://dummyjson.com/auth/me', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` },
      })
      const data = await response.json()
      dispatch({type: 'LOGIN', payload: data })
      localStorage.setItem('role', data?.role)
      console.log(data)
    } catch (e) {
      console.log(e.message) 
      logout();
      dispatch({type: 'LOADING', payload: false})
    }
  }


  const login = async (username, password) => {
    dispatch({type: 'LOADING', payload: true})
    try {
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({

          username: username,
          password: password,
          expiresInMins: 30, // optional, defaults to 60
        })
      })
      const data = await response.json()
      dispatch({type: 'LOGIN', payload: data})
      console.log(data)
      setToken(data?.token)
      localStorage.setItem('token', data?.token)
      getMe();
    }
    catch (e) {
      dispatch({type: 'LOGOUT'})
      dispatch({type: 'LOADING', payload: false})
    }
  }

  const logout = () => {
    dispatch({type: 'LOGOUT'})
    localStorage.removeItem('token')
    localStorage.removeItem('role')
  }

  const contextValue = {
    token,
    logout,
    state,
    login,
    getMe,
    isAuthenticated,
    signedUserRole
  }

 

  return (
      <AuthContext.Provider value={contextValue}>
        {children}
      </AuthContext.Provider>
  )
}
