import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

type UserCredentials = {
  username: string
  password: string
}

const withToken = (config: AxiosRequestConfig): AxiosRequestConfig => {
  const token = localStorage.getItem('token')

  if (!token) {
    return config
  }

  return { ...config, headers: { ...config.headers, Authorization: token } }
}

export const login = (credentials: UserCredentials): Promise<string> =>
  axios
    .post<{ token: string }>('/api/auth/login', credentials)
    .then((response) => response.data.token)

const API = {
  login,
}

export default API
