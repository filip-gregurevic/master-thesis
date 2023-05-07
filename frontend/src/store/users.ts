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
    async updateUser(userId: number, user) {
      try {
        await axios.patch('http://localhost:3333/users/' + userId, user);
        this.users = this.users.map((usr) =>
          usr.id === userId ? { ...usr, ...user } : usr,
        );
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
    async deleteUser(userId: number) {
      try {
        await axios.delete('http://localhost:3333/users/' + userId);
        this.users = this.users.filter((user) => user.id !== userId);
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
  },
});
