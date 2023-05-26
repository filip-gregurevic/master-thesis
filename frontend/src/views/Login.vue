<template>
  <v-form @submit.prevent="login">
    <v-container>
      <v-row justify="center" align-content="center">
        <v-col cols="auto">
          <v-img
            max-height="32px"
            max-width="32px"
            src="@/assets/logo-cropped.svg"
          ></v-img>
        </v-col>
      </v-row>
      <v-row justify="center" align-content="center">
        <v-col cols="12" md="8" lg="4">
          <h1 class="text-h1">WELCOME BACK!</h1>
        </v-col>
      </v-row>
      <v-row justify="center" align-content="center">
        <v-col cols="12" md="8" lg="4">
          <v-text-field
            variant="outlined"
            v-model="state.email"
            :error="loginError"
            label="E-Mail"
            required
            :error-messages="v$.email.$errors.map((e) => e.$message as string)"
            @input="v$.email.$touch"
            @blur="v$.email.$touch"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row justify="center" align-content="center">
        <v-col cols="12" md="8" lg="4">
          <v-text-field
            variant="outlined"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            :error="loginError"
            v-model="state.password"
            label="Password"
            required
            @click:append="showPassword = !showPassword"
            :error-messages="v$.password.$errors.map((e) => e.$message as string)"
            @input="v$.password.$touch"
            @blur="v$.password.$touch"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row v-if="loginError" justify="center" align-content="center">
        <v-col cols="12" md="8" lg="4">
          <p class="text-body-1 text-red">Email or Password are incorrect.</p>
        </v-col>
      </v-row>
      <v-row justify="center" align-content="center">
        <v-col cols="12" md="8" lg="4">
          <v-btn block color="primary" type="submit" :disabled="v$.$invalid"
            >Login</v-btn
          >
        </v-col>
      </v-row>
      <v-row justify="center" align-content="center">
        <v-col cols="12" md="8" lg="4">
          <p class="text-body-1">
            You don't have an account?
            <router-link to="/register">Register here</router-link>
          </p>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { useAuthStore } from '@/store/auth';
import { useAlertStore } from '@/store/alert';
import { email, minLength, required } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';

const initialState = {
  email: '',
  password: '',
};

const state = reactive({
  ...initialState,
});

const rules = {
  email: { required, email },
  password: { required, minLength: minLength(8) },
};

const v$ = useVuelidate(rules, state);

const showPassword = ref(false);
const loginError = ref(false);

function login() {
  const authStore = useAuthStore();
  const alertStore = useAlertStore();

  authStore
    .login(state.email, state.password)
    .then(() => {
      alertStore.initSuccess('Successfully logged in!');
    })
    .catch((error) => {
      console.log(error);

      if (
        error &&
        error.request &&
        (error.request.status === 403 || error.request.status === 404)
      ) {
        loginError.value = true;
      }
    });
}
</script>
