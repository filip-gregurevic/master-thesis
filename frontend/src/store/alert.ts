import { defineStore } from 'pinia';

export const useAlertStore = defineStore('alert', {
  state: () => ({
    successMessage: undefined,
    errorMessage: undefined,
  }),
  actions: {},
});
