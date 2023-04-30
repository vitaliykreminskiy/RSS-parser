import React, {
  FC,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import API from '../../config/requests'

type Props = {
  children: any
}

type Credentials = {
  username: string
  password: string
}

type SessionContextType = {
  username: string
  token: string
  isLoggedIn: boolean

  logIn: (credentials: Credentials) => any
  logOut: () => any
}

const SessionContext = createContext<SessionContextType>({
  username: '',
  token: '',
  isLoggedIn: false,

  logIn: () => true,
  logOut: () => true,
})

export const useSession = () => useContext(SessionContext)

export const SessionProvider: FC<Props> = ({ children }) => {
  const [username, setUsername] = useState<string>('')
  const [token, setToken] = useState<string>('')

  useEffect(() => {
    setToken(localStorage.getItem('token') || '')
  }, [])

  const isLoggedIn: boolean = useMemo(
    (): boolean => Boolean(token && token.length > 0),
    [token]
  )

  const logIn = async (credentials: Credentials) => {
    try {
      const token: string = await API.login(credentials)

      if (!token) {
        throw new Error('Incorrect credentials')
      }

      window.localStorage.setItem('token', token)
      setToken(token)
      setUsername(credentials.username)
    } catch (error: any) {
      alert('Incorrect credentials')
    }
  }

  const logOut = () => true

  return (
    <SessionContext.Provider
      value={{
        isLoggedIn,
        username,
        token,
        logIn,
        logOut,
      }}
    >
      {children}
    </SessionContext.Provider>
  )
}
