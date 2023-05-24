<template>
  <v-snackbar
    v-model="snackbar"
  >
    {{ text }}

    <template v-slot:actions>
      <v-btn
        color="pink"
        variant="text"
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script lang="ts" setup>
import { useAlertStore } from "@/store/alert";

</script>
