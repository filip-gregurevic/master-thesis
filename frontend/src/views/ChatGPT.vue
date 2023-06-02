<template></template>


<script lang="ts" setup>
import { computed, onMounted } from 'vue';
import { useChatGPTStore } from '@/store/chat-gpt';

// load search history when component is loaded
onMounted(() => {
  const chatGPTStore = useChatGPTStore();

  chatGPTStore.loadConversations();
});

const conversations = computed(() => {
  const chatGPTStore = useChatGPTStore();

  return chatGPTStore.getConversations;
});
</script>
