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
                color="primary"
                variant="text"
                @click="openEditModal(user)"
              >Edit</v-btn>
              <v-btn
                color="error"
                variant="text"
                @click="deleteUser(user.id)"
              >Delete</v-btn>
            </template>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
  <v-overlay
    :model-value="isEditModalOpen"
    class="align-center justify-center"
  >
    <v-card>
      <v-container>
        <v-row justify="center" align-content="center">
          <v-col cols="12" md="6" lg="4">
            <h1 class="text-h1">
              Edit User
            </h1>
          </v-col>
        </v-row>
        <v-row justify="center" align-content="center">
          <v-col cols="12" md="6" lg="4">
            <v-text-field
              variant="outlined"
              v-model="editEmail"
              label="E-Mail"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center" align-content="center">
          <v-col cols="12" md="6" lg="4">
            <v-select
              variant="outlined"
              :items="['user', 'admin']"
              :model-value="editRole"
              label="Role"
            ></v-select>
          </v-col>
        </v-row>
        <v-row justify="space-evenly" align-content="center">
          <v-col cols="auto">
            <v-btn
              color="grey"
              @click="isEditModalOpen = false"
            >
              Cancel
            </v-btn>
          </v-col>
          <v-col cols="auto">
            <v-btn
              color="primary"
              @click="editUser"
            >
              Save Changes
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-overlay>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import { useUsersStore } from '@/store/users';

const isEditModalOpen = ref(false);
const editId = ref(-1);
const editEmail = ref('');
const editRole = ref('');

const users = computed(() => {
  const usersStore = useUsersStore();

  return usersStore.users;
});

onMounted(() => {
  const usersStore = useUsersStore();

  usersStore.loadUsers();
});

function openEditModal(user) {
  editId.value = user.id;
  editEmail.value = user.email;
  editRole.value = user.role;

  isEditModalOpen.value = true;
}

function editUser() {
  const usersStore = useUsersStore();

  usersStore.updateUser(editId.value, { email: editEmail.value, role: editRole.value });
  isEditModalOpen.value = false;
}

function deleteUser(userId: number) {
  const usersStore = useUsersStore();

  usersStore.deleteUser(userId);
}

</script>
