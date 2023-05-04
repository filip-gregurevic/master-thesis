<template>
  {{ users }}
</template>

<script lang="ts" setup>
import { computed, onMounted } from 'vue';
import { useUsersStore } from '@/store/users';

const users = computed(() => {
  const usersStore = useUsersStore();

  return usersStore.users;
});

onMounted(() => {
  const usersStore = useUsersStore();

  usersStore.loadUsers();
});

</script>
