<template>
  <v-form @submit.prevent="register">
    <v-container>
      <v-row justify="center" align-content="center">
        <v-col cols="12" md="8" lg="4">
          <h1 class="text-h1">Register</h1>
        </v-col>
      </v-row>
      <v-row justify="center" align-content="center">
        <v-col cols="12" md="8" lg="4">
          <v-text-field
            variant="outlined"
            v-model="state.email"
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
            v-model="state.password"
            label="Password"
            required
            :error-messages="v$.password.$errors.map((e) => e.$message as string)"
            @click:append="showPassword = !showPassword"
            @input="v$.password.$touch"
            @blur="v$.password.$touch"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row justify="center" align-content="center">
        <v-col cols="12" md="8" lg="4">
          <v-text-field
            variant="outlined"
            :append-icon="showPasswordRepeated ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPasswordRepeated ? 'text' : 'password'"
            v-model="state.passwordRepeated"
            required
            label="Repeat Password"
            :error-messages="v$.passwordRepeated.$errors.map((e) => e.$message as string)"
            @click:append="showPasswordRepeated = !showPasswordRepeated"
            @input="v$.passwordRepeated.$touch"
            @blur="v$.passwordRepeated.$touch"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row v-if="registerError" justify="center" align-content="center">
        <v-col cols="12" md="8" lg="4">
          <p class="text-body-1 text-red">{{ registerError }}</p>
        </v-col>
      </v-row>
      <v-row justify="center" align-content="center">
        <v-col cols="12" md="8" lg="4">
          <v-btn block color="primary" type="submit" :disabled="v$.$invalid"
            >Register</v-btn
          >
        </v-col>
      </v-row>
      <v-row justify="center" align-content="center">
        <v-col cols="12" md="8" lg="4">
          <p class="text-body-1">
            Already have an account?
            <router-link to="/login">Go to login</router-link>
          </p>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from 'vue';
import { useAuthStore } from '@/store/auth';
import { email, minLength, required, sameAs } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';

const initialState = {
  email: '',
  password: '',
  passwordRepeated: '',
};

const state = reactive({
  ...initialState,
});

const rules = {
  email: { required, email },
  password: { required, minLength: minLength(8) },
  passwordRepeated: {
    required,
    sameAs: sameAs(computed(() => state.password)),
  },
};

const v$ = useVuelidate(rules, state);

const showPassword = ref(false);
const showPasswordRepeated = ref(false);
const registerError = ref('');

function register() {
  const authStore = useAuthStore();

  authStore.register(state.email, state.password).catch((error) => {
    registerError.value = error.response.data.message;
  });
}
</script>
