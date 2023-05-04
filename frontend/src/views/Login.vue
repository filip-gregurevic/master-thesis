<template>
  <v-form @submit.prevent="login">
    <v-container>
      <v-row justify="center" align-content="center">
        <v-col cols="12" md="6" lg="4">
          <h1 class="text-h1">
            WELCOME BACK!
          </h1>
        </v-col>
      </v-row>
      <v-row justify="center" align-content="center">
        <v-col cols="12" md="6" lg="4">
          <v-text-field
            variant="outlined"
            v-model="email"
            label="E-Mail"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row justify="center" align-content="center">
        <v-col cols="12" md="6" lg="4">
          <v-text-field
            variant="outlined"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            v-model="password"
            label="Password"
            @click:append="showPassword = !showPassword"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row justify="center" align-content="center">
        <v-col cols="12" md="6" lg="4">
          <v-btn
            block
            color="primary"
            type="submit"
          >Login</v-btn>
        </v-col>
      </v-row>
      <v-row justify="center" align-content="center">
        <v-col cols="12" md="6" lg="4">
          <p class="text-body-1">You don't have an account? <router-link to="/register">Register here</router-link></p>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useAuthStore } from '@/store/auth';

const email = ref('');
const password = ref('');
const showPassword = ref(false);

function login() {
  const authStore = useAuthStore();

  authStore.login(email.value, password.value);
}
</script>
