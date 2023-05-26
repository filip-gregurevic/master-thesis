<template>
  <v-form @submit.prevent="updateProfile">
    <v-container>
      <v-row>
        <v-col v-if="profile">
          <h1 class="text-h1">My Profile</h1>
        </v-col>
      </v-row>
      <v-row justify="center" align-content="center">
        <v-col cols="12" md="6">
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
        <v-col cols="12" md="6">
          <v-select
            variant="outlined"
            :items="['user', 'admin']"
            v-model="state.role"
            label="Role"
            required
            :error-messages="v$.role.$errors.map((e) => e.$message as string)"
            @change="v$.role.$touch"
            @blur="v$.role.$touch"
          ></v-select>
        </v-col>
      </v-row>
      <v-row justify="center" align-content="center">
        <v-col cols="12" md="6">
          <v-text-field
            variant="outlined"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            v-model="state.password"
            label="New Password"
            autocomplete="new-password"
            :error-messages="v$.password.$errors.map((e) => e.$message as string)"
            @click:append="showPassword = !showPassword"
            @input="v$.password.$touch"
            @blur="v$.password.$touch"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            variant="outlined"
            :append-icon="showPasswordRepeated ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPasswordRepeated ? 'text' : 'password'"
            v-model="state.passwordRepeated"
            label="Repeat New Password"
            :error-messages="v$.passwordRepeated.$errors.map((e) => e.$message as string)"
            @click:append="showPasswordRepeated = !showPasswordRepeated"
            @input="v$.passwordRepeated.$touch"
            @blur="v$.passwordRepeated.$touch"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row justify="center" align-content="center">
        <v-col cols="12" md="8" lg="4">
          <v-btn block color="primary" type="submit" :disabled="v$.$invalid"
            >Save Changes</v-btn
          >
        </v-col>
      </v-row>
      <v-row justify="center" align-content="center">
        <v-col cols="12" md="8" lg="4">
          <v-btn block color="error" @click="deleteProfile">
            Delete my account</v-btn
          >
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive, ref } from 'vue';
import { useProfileStore } from '@/store/profile';
import { email, minLength, required, sameAs } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import { useAlertStore } from '@/store/alert';

const initialState = {
  email: '',
  role: 'user',
  password: '',
  passwordRepeated: '',
};

const state = reactive({
  ...initialState,
});

const rules = {
  email: { required, email },
  role: { required },
  password: { minLength: minLength(8) },
  passwordRepeated: {
    sameAs: sameAs(computed(() => state.password)),
  },
};

const v$ = useVuelidate(rules, state);

const showPassword = ref(false);
const showPasswordRepeated = ref(false);

onMounted(() => {
  const profileStore = useProfileStore();

  profileStore
    .loadProfile()
    .then(() => {
      state.email = profile.value.email;
      state.role = profile.value.role;
      state.password = '';
      state.passwordRepeated = '';
    })
    .catch(() => {
      const alertStore = useAlertStore();

      alertStore.initError(
        'Oops! Something went wrong while loading your profile. :(',
      );
    });
});

const profile = computed(() => {
  const profileStore = useProfileStore();

  return profileStore.getUser;
});

function deleteProfile() {
  const profileStore = useProfileStore();
  const alertStore = useAlertStore();

  return profileStore
    .deleteProfile()
    .then(() => {
      alertStore.initSuccess("Successfully deleted your account :'(");
    })
    .catch((error) => {
      alertStore.initError(error.response.data.message);
    });
}

function updateProfile() {
  const profileStore = useProfileStore();
  const alertStore = useAlertStore();

  console.log(state);

  return profileStore
    .updateProfile({
      email: state.email,
      role: state.role,
      password: state.password ? state.password : undefined,
    })
    .then(() => {
      alertStore.initSuccess('Successfully updates your profile!');
    })
    .catch((error) => {
      alertStore.initError(error.response.data.message);
    });
}
</script>
