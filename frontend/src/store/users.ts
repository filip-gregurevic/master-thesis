import { defineStore } from 'pinia';
import axios from 'axios';

export const useUsersStore = defineStore('users', {
  state: () => ({
    users: [],
  }),
  getters: {
    getUsers(state) {
      return state.users;
    },
  },
  actions: {
    async loadUsers() {
      try {
        const res = await axios.get('http://localhost:3333/users');
        this.users = res.data;
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
    async createUser() {},
    async updateUser() {},
    async deleteUser() {},
  },
});
