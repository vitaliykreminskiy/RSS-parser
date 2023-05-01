import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { response } from "express";

const withToken = (config: AxiosRequestConfig): AxiosRequestConfig => {
  const token = localStorage.getItem("token");

  if (!token) {
    return config;
  }

  return { ...config, headers: { ...config.headers, Authorization: token } };
};

export const login = (credentials: UserCredentials): Promise<string> =>
  axios
    .post<{ token: string }>("/api/auth/login", credentials)
    .then((response) => response.data.token);

export const getPostsPage = (options: PostPageOptions): Promise<Page<Post>> => {
  const instance: AxiosInstance = axios.create(
    withToken({
      params: options,
    })
  );

  return instance.get("/api/posts").then((response) => response.data);
};

export const deletePost = (id: number): Promise<any> => {
  const instance: AxiosInstance = axios.create(withToken({}));

  return instance.delete(`/api/posts/${id}`).then((response) => response.data);
};

export const editPost = (id: number, update: Partial<Post>): Promise<any> => {
  const instance: AxiosInstance = axios.create(withToken({}));

  return instance
    .put(`/api/posts/${id}`, update)
    .then((response) => response.data);
};

export const createPost = (post: Partial<Post>): Promise<any> => {
  const instance: AxiosInstance = axios.create(withToken({}));

  return instance.post(`/api/posts`, post).then((response) => response.data);
};

const API = {
  login,
  getPostsPage,
  deletePost,
  editPost,
  createPost,
};

export default API;
