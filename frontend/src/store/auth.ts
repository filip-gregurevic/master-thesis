import { defineStore } from 'pinia';
import axios, { AxiosResponse } from 'axios';
import router from '@/router';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')),
    access_token: localStorage.getItem('token') as string | null,
  }),

  actions: {
    async loadUser() {
      const res = await axios.get<AxiosResponse<any>>(
        'http://localhost:3333/user',
      );

      this.user = res;
    },
    async register(email, password) {
      await axios.post('http://localhost:3333/users/register', {
        email,
        password,
      });
      router.push('/login');
    },
    async login(email, password) {
      const res = await axios.post('http://localhost:3333/auth/login', {
        email,
        password,
      });
      this.user = res.data.user;
      localStorage.setItem('user', JSON.stringify(res.data.user));
      this.access_token = res.data.access_token;
      localStorage.setItem('token', res.data.access_token);
      router.push('/search');
    },
    logout() {
      this.user = null;
      localStorage.removeItem('user');
      this.access_token = null;
      localStorage.removeItem('token');
      router.push('/login');
    },
  },
});
