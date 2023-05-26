<template>
  <v-snackbar
    v-if="error"
    v-model="isError"
    bottom
    outlined
    color="error"
    timeout="-1"
  >
    <v-icon>mdi-alert-circle-outline</v-icon>
    <span>{{ error }}</span>
    <template v-slot:actions>
      <v-btn variant="text" @click="closeErrorAlert"> OK </v-btn>
    </template>
  </v-snackbar>
  <v-snackbar
    v-else-if="success"
    v-model="isSuccess"
    bottom
    outlined
    color="success"
    timeout="-1"
  >
    <v-icon>mdi-check-outlined</v-icon>
    <span>{{ success }}</span>
    <template v-slot:actions>
      <v-btn variant="text" @click="closeSuccessAlert"> OK </v-btn>
    </template>
  </v-snackbar>
</template>

<script lang="ts" setup>
import { useAlertStore } from '@/store/alert';
import { computed } from 'vue';

const success = computed(() => {
  const alertStore = useAlertStore();

  return alertStore.getSuccessMessage;
});

const error = computed(() => {
  const alertStore = useAlertStore();

  return alertStore.getErrorMessage;
});

const isSuccess = computed(() => {
  const alertStore = useAlertStore();

  return !!alertStore.getSuccessMessage;
});

const isError = computed(() => {
  const alertStore = useAlertStore();

  return !!alertStore.getErrorMessage;
});

function closeErrorAlert(): void {
  const alertStore = useAlertStore();

  alertStore.setError(undefined);
}

function closeSuccessAlert(): void {
  const alertStore = useAlertStore();

  alertStore.setSuccess(undefined);
}
</script>
