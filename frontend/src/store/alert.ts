import { defineStore } from 'pinia';
import { state } from 'vue-tsc/out/shared';

export const useAlertStore = defineStore('alert', {
  state: () => ({
    successMessage: undefined as string | undefined,
    errorMessage: undefined as string | undefined,
  }),
  getters: {
    getSuccessMessage(state) {
      return state.successMessage;
    },
    getErrorMessage(state) {
      return state.errorMessage;
    },
  },
  actions: {
    initError(error: string): void {
      this.successMessage = undefined;
      this.errorMessage = error;
      setTimeout(() => {
        this.errorMessage = undefined;
      }, 3000);
    },
    initSuccess(success: string): void {
      this.errorMessage = undefined;
      this.successMessage = success;
      setTimeout(() => {
        this.successMessage = undefined;
      }, 3000);
    },
    setError(error: string | undefined): void {
      this.errorMessage = error;
    },
    setSuccess(success: string | undefined): void {
      this.successMessage = success;
    },
  },
});
