import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
  }),

  actions: {
    async loadUser() {
      const res = await axios.get('https://localhost:3000/user');

      this.user = res;
    },
    async register(email, password) {
      const res = await fetch('https://localhost:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const user = await res.json();
      this.user = user;
    },
    async login(email, password) {
      const res = await fetch('https://localhost:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const user = await res.json();
      this.user = user;
    },
  },
});
