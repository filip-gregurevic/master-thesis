<template>
  <v-navigation-drawer v-model="isSidebarOpen" :temporary="true">
    <template v-slot:prepend>
      <v-btn
        :block="true"
        class="mb-4"
        color="primary"
        prepend-icon="mdi-plus"
        @click.stop.prevent="startNewConversation"
        >New Conversation
      </v-btn>
    </template>
    <v-list lines="three">
      <v-list-subheader class="text-h5">My Conversations</v-list-subheader>
      <v-list-item
        v-for="conversation in conversations"
        :key="conversation.id"
        :active="
          currentConversation && conversation.id === currentConversation.id
        "
        :title="
          conversation.id === editConversationId ? `${conversation.name}` : ''
        "
        color="secondary"
        @click.prevent="loadConversation(conversation.id)"
      >
        <v-text-field
          v-model="newConversationName"
          placeholder="New Name"
        ></v-text-field>
        <template v-if="conversation.id === editConversationId" v-slot:append>
          <v-btn
            color="secondary"
            icon="mdi-square-edit-outline"
            variant="text"
            @click.prevent.stop="openEditName(conversation.id)"
          >
            <v-tooltip activator="parent" location="bottom"
              >Change Name
            </v-tooltip>
          </v-btn>
          <v-btn
            color="error"
            icon="mdi-close"
            variant="text"
            @click.prevent.stop="deleteConversation(conversation.id)"
          >
            <v-tooltip activator="parent" location="bottom"
              >Delete Conversation
            </v-tooltip>
          </v-btn>
        </template>
        <template
          v-else-if="conversation.id !== editConversationId"
          v-slot:append
        >
          <v-btn
            color="primary"
            icon="mdi-check"
            variant="text"
            @click.prevent.stop="saveName"
          >
            <v-tooltip activator="parent" location="bottom">Save</v-tooltip>
          </v-btn>
          <v-btn
            color="error"
            icon="mdi-close"
            variant="text"
            @click.prevent.stop="cancelEditName"
          >
            <v-tooltip activator="parent" location="bottom">Cancel</v-tooltip>
          </v-btn>
        </template>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
  <v-container class="mt-8">
    <v-row class="max-height">
      <v-col class="px-6">
        <template v-if="currentConversation">
          <v-row
            v-for="message in currentConversation.messages"
            :key="message.id"
            align="center"
            justify="center"
          >
            <template v-if="message.type === 'user'">
              <v-col cols="2"></v-col>
              <v-col cols="10">
                <v-card :text="message.content" color="primary" subtitle="You">
                </v-card>
              </v-col>
            </template>
            <template v-else-if="message.type === 'assistant'">
              <v-col cols="10">
                <v-card
                  :text="message.content"
                  color="secondary"
                  subtitle="ChatGPT"
                >
                </v-card>
              </v-col>
              <v-col cols="2"></v-col>
            </template>
          </v-row>
          <div id="tricky"></div>
          <v-row v-if="isLoading" align="center" justify="center">
            <v-col cols="auto">
              <v-progress-circular
                color="primary"
                indeterminate
              ></v-progress-circular>
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
                auto-grow
                placeholder="Write a full sentence"
                variant="outlined"
              >
                <template v-slot:append-inner>
                  <v-col cols="1">
                    <v-btn
                      :block="true"
                      :disabled="!message || isLoading"
                      color="primary"
                      type="submit"
                    >
                      Go
                    </v-btn>
                  </v-col>
                </template>
              </v-textarea>
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
import { useAlertStore } from '@/store/alert';

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

const isSidebarOpen = computed(() => {
  const chatGPTStore = useChatGPTStore();

  return chatGPTStore.getIsSidebarOpen;
});

const message = ref('');
const editConversationId = ref(-1);
const newConversationName = ref('');

function openEditName(conversationId: number) {
  editConversationId.value = conversationId;
}

function cancelEditName() {
  editConversationId.value = -1;
  newConversationName.value = '';
}

function saveName() {
  const chatGPTStore = useChatGPTStore();
  const alerStore = useAlertStore();

  chatGPTStore
    .changeConversationName(editConversationId.value, newConversationName.value)
    .then(() => {
      alerStore.initSuccess('Successfully changed name of the conversation');
    })
    .catch((error) => {
      alertStore.initError(error.response.data.message);
    })
    .finally(() => {
      editConversationId.value = -1;
      newConversationName.value = '';
    });
}

function startNewConversation() {
  const chatGPTStore = useChatGPTStore();

  message.value = '';
  chatGPTStore.startNewConversation();
}

function sendMessage() {
  const chatGPTStore = useChatGPTStore();
  const alertStore = useAlertStore();

  chatGPTStore
    .sendMessage(message.value)
    .then(() => {
      const lastMessageElement = document.getElementById('tricky');

      lastMessageElement!.scrollIntoView();
    })
    .catch((error) => {
      alertStore.initError(error.response.data.message);
    });
}

function loadConversation(conversationId: number) {
  const chatGPTStore = useChatGPTStore();
  const alertStore = useAlertStore();

  chatGPTStore
    .loadConversationById(conversationId)
    .then(() => {
      try {
        const lastMessageElement = document.getElementById('tricky');

        lastMessageElement!.scrollIntoView();
      } catch (e) {
        console.log(e);
      }
    })
    .catch((error) => {
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
