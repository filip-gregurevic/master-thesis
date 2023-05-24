import { defineStore } from 'pinia';
import axios from 'axios';
import { useAuthStore } from '@/store/auth';

export const useSearchStore = defineStore('search', {
  state: () => ({
    searches: [],
    results: [],
  }),
  getters: {
    getSearches(state) {
      return state.searches;
    },
  },
  actions: {
    async loadSearches() {
      const authStore = useAuthStore();

      try {
        const res = await axios.get(
          import.meta.env.VITE_BACKEND_URL +
            '/users/' +
            authStore.user.id +
            '/searches',
        );
        console.log('searches: ', res.data);
        this.searches = res.data;
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
    async search(searchTerm: string) {
      const authStore = useAuthStore();

      try {
        const res = await axios.post(
          import.meta.env.VITE_BACKEND_URL +
            '/users/' +
            authStore.user.id +
            '/searches',
          { searchTerm },
        );
        console.log('search results: ', res.data);
        this.results = res.data;
        await this.loadSearches();
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
    async deleteSearchById(searchId: number) {
      try {
        await axios.delete(
          import.meta.env.VITE_BACKEND_URL + '/searches/' + searchId,
        );
        await this.loadSearches();
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
  },
});
