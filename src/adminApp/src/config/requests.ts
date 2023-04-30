import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

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

export const getPostsPage = (options: PostPageOptions): Promise<Page<Post>> => {
  const instance: AxiosInstance = axios.create(
    withToken({
      params: options,
    })
  )

  return instance.get('/api/posts').then((response) => response.data)
}

const API = {
  login,
  getPostsPage,
}

export default API
