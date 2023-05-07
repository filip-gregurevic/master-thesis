import { defineStore } from 'pinia';
import axios from 'axios';

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
    async loadSearches(userId: number) {
      try {
        const res = await axios.get(
          'http://localhost:3333/users/' + userId + '/searches',
        );
        this.searches = res.data;
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
  },
});
