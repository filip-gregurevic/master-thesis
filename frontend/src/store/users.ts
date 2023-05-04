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
        const data = await axios.get(
          'https://jsonplaceholder.typicode.com/users',
        );
        this.users = data.data;
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
