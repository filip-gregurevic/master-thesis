<template>
  <v-container>
    <v-row>
      <v-col>
        <h1 class="text-h1">USERS</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-list>
          <v-list-item
            v-for="user in users"
            :key="user.id"
            :title="user.email"
            :subtitle="user.role"
          >
            <template v-slot:append>
              <v-btn
                color="secondary"
                variant="text"
                @click="openEditModal(user)"
                >Edit</v-btn
              >
              <v-btn color="error" variant="text" @click="deleteUser(user.id)"
                >Delete</v-btn
              >
            </template>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
  <v-overlay
    :model-value="isEditModalOpen"
    class="align-center justify-center"
    width="auto"
    @after-leave="resetForm"
  >
    <v-card class="pa-4" min-width="50vw">
      <v-container>
        <v-row justify="center" align-content="center">
          <v-col cols="12">
            <h1 class="text-h1">Edit User</h1>
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
              label="Password"
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
              label="Repeat Password"
              :error-messages="v$.passwordRepeated.$errors.map((e) => e.$message as string)"
              @click:append="showPasswordRepeated = !showPasswordRepeated"
              @input="v$.passwordRepeated.$touch"
              @blur="v$.passwordRepeated.$touch"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row justify="space-evenly" align-content="center">
          <v-col cols="auto">
            <v-btn color="grey" @click="isEditModalOpen = false">
              Cancel
            </v-btn>
          </v-col>
          <v-col cols="auto">
            <v-btn color="primary" @click="editUser" :disabled="v$.$invalid"
              >Save Changes</v-btn
            >
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-overlay>
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive, ref } from 'vue';
import { useUsersStore } from '@/store/users';
import { email, minLength, required, sameAs } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';

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

const isEditModalOpen = ref(false);
const editId = ref(-1);
const showPassword = ref(false);
const showPasswordRepeated = ref(false);

const users = computed(() => {
  const usersStore = useUsersStore();

  return usersStore.users;
});

onMounted(() => {
  const usersStore = useUsersStore();

  usersStore.loadUsers();
});

function openEditModal(user: any) {
  editId.value = user.id;
  state.email = user.email;
  state.role = user.role;

  isEditModalOpen.value = true;
}

function editUser() {
  const usersStore = useUsersStore();

  usersStore.updateUser(editId.value, {
    email: state.email,
    role: state.role,
    password: state.password ? state.password : undefined,
  });
  isEditModalOpen.value = false;
}

function resetForm(): void {
  v$.value.$reset();
  editId.value = -1;

  state.email = initialState.email;
  state.password = initialState.password;
  state.passwordRepeated = initialState.passwordRepeated;
  state.role = initialState.role;
}

function deleteUser(userId: number) {
  const usersStore = useUsersStore();

  usersStore.deleteUser(userId);
}
</script>
