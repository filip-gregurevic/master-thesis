<template>
  <v-form @submit.prevent="login">
    <v-container>
      <v-row>
        <v-text-field
          v-model="email"
          label="E-Mail"
        ></v-text-field>
      </v-row>
      <v-row>
        <v-text-field
          type="password"
          v-model="password"
          label="Password"
        ></v-text-field>
      </v-row>
      <v-row>
        <v-btn
          type="submit"
        >Login</v-btn>
      </v-row>
    </v-container>
  </v-form>
</template>

<script lang="ts" setup>
import { useAuthStore } from '@/store/auth';

const email = '';
const password = '';

function login() {
  const authStore = useAuthStore();

  authStore.login(this.email, this.password);
}
</script>
