<template>
  <v-form @submit.prevent="register(email, password)">
    <v-container>
      <v-row justify="center" align-content="center">
        <v-col cols="12" md="6" lg="4">
          <h1 class="text-h1">
            Register
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
          <v-text-field
            variant="outlined"
            :append-icon="showPasswordRepeated ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPasswordRepeated ? 'text' : 'password'"
            v-model="passwordRepeated"
            label="Repeat Password"
            @click:append="showPasswordRepeated = !showPasswordRepeated"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row justify="center" align-content="center">
        <v-col cols="12" md="6" lg="4">
          <v-btn
            block
            color="primary"
            type="submit"
          >Register</v-btn>
        </v-col>
      </v-row>
      <v-row justify="center" align-content="center">
        <v-col cols="12" md="6" lg="4">
          <p class="text-body-1">Already have an account? <router-link to="/login">Go to login</router-link></p>
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
const passwordRepeated = ref('');
const showPassword = ref(false);
const showPasswordRepeated = ref(false);

function register() {
  const authStore = useAuthStore();

  authStore.register(email.value, password.value);
}
</script>
