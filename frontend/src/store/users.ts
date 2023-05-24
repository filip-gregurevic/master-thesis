import { defineStore } from 'pinia';
import axios from 'axios';

export const useUsersStore = defineStore('users', {
  state: () => ({
    users: [] as any[],
  }),
  getters: {
    getUsers(state) {
      return state.users;
    },
  },
  actions: {
    async loadUsers() {
      try {
        const res = await axios.get(
          import.meta.env.VITE_BACKEND_URL + '/users',
        );
        this.users = res.data;
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
    async updateUser(userId: number, user: any) {
      try {
        await axios.patch(
          import.meta.env.VITE_BACKEND_URL + '/users/' + userId,
          user,
        );
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
        await axios.delete(
          import.meta.env.VITE_BACKEND_URL + '/users/' + userId,
        );
        this.users = this.users.filter((user) => user.id !== userId);
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
  },
});
