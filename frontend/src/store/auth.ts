import { defineStore } from 'pinia';
import axios, { AxiosResponse } from 'axios';
import router from '@/router';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')!),
    access_token: localStorage.getItem('token') as string | null,
  }),
  getters: {
    getUser(state) {
      return state.user;
    },
  },
  actions: {
    async register(email: string, password: string) {
      return axios
        .post(import.meta.env.VITE_BACKEND_URL + '/users/register', {
          email,
          password,
        })
        .then(() => {
          router.push('/login');
          return Promise.resolve();
        })
        .catch((error) => {
          return Promise.reject(error);
        });
    },
    login(email: string, password: string) {
      return axios
        .post(import.meta.env.VITE_BACKEND_URL + '/auth/login', {
          email,
          password,
        })
        .then((res) => {
          this.user = res.data.user;
          localStorage.setItem('user', JSON.stringify(res.data.user));
          this.access_token = res.data.access_token;
          localStorage.setItem('token', res.data.access_token);
          return router.push('/search');
        })
        .catch((error) => {
          return Promise.reject(error);
        });
    },
    logout() {
      this.user = null;
      localStorage.removeItem('user');
      this.access_token = null;
      localStorage.removeItem('token');
      return router.push('/login');
    },
  },
});
