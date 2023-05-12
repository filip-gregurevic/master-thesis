import { defineStore } from 'pinia';
import axios from 'axios';
import { useAuthStore } from '@/store/auth';

export const useSearchStore = defineStore('search', {
  state: () => ({
    searches: [],
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
          'http://localhost:3333/users/' + authStore.user.id + '/searches',
        );
        console.log(res.data);
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
          'http://localhost:3333/users/' + authStore.user.id + '/searches',
          { searchTerm },
        );
        console.log(res);
        await this.loadSearches();
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
    async deleteSearchById(searchId: number) {
      try {
        await axios.delete('http://localhost:3333/searches/' + searchId);
        await this.loadSearches();
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
  },
});
