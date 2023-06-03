<template>
  <v-navigation-drawer :permanent="true">
    <v-list lines="three">
      <v-list-subheader class="text-h5">My Conversations</v-list-subheader>
      <v-list-item
        v-for="conversation in conversations"
        :key="conversation.id"
        :title="`${conversation.id}`"
        color="secondary"
        :active="currentConversation && conversation.id === currentConversation.id"
        @click.prevent="loadConversation(conversation.id)"
      >
        <template v-slot:append>
          <v-btn color="error" icon="mdi-close" variant="text" @click.prevent.stop="deleteConversation(conversation.id)"></v-btn>
          <v-btn color="error" icon="mdi-edit" variant="text" @click.prevent.stop="deleteSearch(search.id)"></v-btn>
        </template>
      </v-list-item>
    </v-list>
    <template v-slot:append>
      <v-btn
        class="mb-4"
        color="primary"
        prepend-icon="mdi-plus"
        :block="true"
        @click.stop.prevent="startNewConversation"
      >New Conversation</v-btn>
    </template>
  </v-navigation-drawer>
  <v-container class="mt-8">
    <v-row class="max-height">
      <v-col class="px-6">
        <template v-if="currentConversation">
          <v-row v-for="message in currentConversation.messages" justify="center" align="center" :key="message.id">
            <template v-if="message.type === 'user'">
              <v-col cols="2"></v-col>
              <v-col cols="10">
                <v-card color="primary" :text="message.content" subtitle="You">
                </v-card>
              </v-col>
            </template>
            <template v-else-if="message.type === 'assistant'">
              <v-col cols="10">
                <v-card color="secondary" :text="message.content" subtitle="ChatGPT">
                </v-card>
              </v-col>
              <v-col cols="2"></v-col>
            </template>
          </v-row>
          <div id="tricky"></div>
          <v-row v-if="isLoading" justify="center" align="center">
            <v-col cols="auto">
              <v-progress-circular color="primary" indeterminate></v-progress-circular>
            </v-col>
          </v-row>
        </template>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-form @submit.prevent="sendMessage">
          <v-row align-content="center" justify="center">
            <v-col cols="10" lg="8" md="8">
              <v-textarea
                v-model="message"
                placeholder="Write a full sentence"
                variant="outlined"
                auto-grow
              ></v-textarea>
            </v-col>
            <v-col cols="1">
              <v-btn :block="true" :disabled="!message || isLoading" color="primary" type="submit"
              >Go
              </v-btn
              >
            </v-col>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>


<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import { useChatGPTStore } from '@/store/chat-gpt';
import { useAlertStore } from "@/store/alert";

// load search history when component is loaded
onMounted(() => {
  const chatGPTStore = useChatGPTStore();

  chatGPTStore.loadConversations();
});

const conversations = computed(() => {
  const chatGPTStore = useChatGPTStore();

  return chatGPTStore.getConversations;
});

const currentConversation = computed(() => {
  const chatGPTStore = useChatGPTStore();

  return chatGPTStore.getCurrentConversation;
});

const isLoading = computed(() => {
  const chatGPTStore = useChatGPTStore();

  return chatGPTStore.getIsLoading;
});

const message = ref('');

function startNewConversation() {
  const chatGPTStore = useChatGPTStore();

  message.value = '';
  chatGPTStore.startNewConversation();
}

function sendMessage() {
  const chatGPTStore = useChatGPTStore()
  const alertStore = useAlertStore();

  chatGPTStore.sendMessage(message.value).then(() => {
    const lastMessageElement = document.getElementById('tricky');

    lastMessageElement.scrollIntoView();
  }).catch((error) => {
    alertStore.initError(error.response.data.message);
  });
}

function loadConversation(conversationId: number) {
  const chatGPTStore = useChatGPTStore();
  const alertStore = useAlertStore();

  chatGPTStore.loadConversationById(conversationId).then(() => {
    try {
      const lastMessageElement = document.getElementById('tricky');

      lastMessageElement.scrollIntoView();
    } catch (e) {
      console.log(e);
    }

  }).catch((error) => {
    alertStore.initError(error.response.data.message);
  });
}

function deleteConversation(conversationId: number) {
  const chatGPTStore = useChatGPTStore();
  const alertStore = useAlertStore();

  chatGPTStore
  .deleteConversationById(conversationId)
  .then(() => {
    alertStore.initSuccess('Successfully deleted conversation');
  })
  .catch((error) => {
    alertStore.initError(error.response.data.message);
  });
}
</script>

<style>
.max-height {
  max-height: 70vh;
  overflow-y: scroll;
}
</style>
