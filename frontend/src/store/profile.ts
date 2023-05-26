import { defineStore } from 'pinia';
import { useAuthStore } from '@/store/auth';
import axios from 'axios';

export const useProfileStore = defineStore('profile', {
  state: () => ({
    user: undefined as any,
  }),
  getters: {
    getUser(state) {
      return state.user;
    },
  },
  actions: {
    loadProfile() {
      const authStore = useAuthStore();

      return axios
        .get(import.meta.env.VITE_BACKEND_URL + '/users/' + authStore.user.id)
        .then((res) => {
          this.user = res.data;

          return Promise.resolve(res.data);
        })
        .catch((error) => {
          return Promise.reject(error);
        });
    },
    deleteProfile() {
      const authStore = useAuthStore();

      return axios
        .delete(
          import.meta.env.VITE_BACKEND_URL + '/users/' + authStore.user.id,
        )
        .then(async () => {
          await authStore.logout();

          return Promise.resolve();
        })
        .catch((error) => {
          return Promise.reject(error);
        });
    },
    updateProfile(user: any) {
      const authStore = useAuthStore();

      return axios
        .patch(
          import.meta.env.VITE_BACKEND_URL + '/users/' + authStore.user.id,
          user,
        )
        .then(async () => {
          await this.loadProfile();

          return Promise.resolve();
        })
        .catch((error) => {
          return Promise.reject(error);
        });
    },
  },
});
