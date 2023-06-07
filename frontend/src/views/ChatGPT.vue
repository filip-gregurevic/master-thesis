<template>
  <v-navigation-drawer :permanent="isSidebarOpen">
    <template v-slot:prepend>
      <v-btn
        :block="true"
        class="mt-4"
        color="primary"
        prepend-icon="mdi-plus"
        @click.stop.prevent="startNewConversation"
        >New Conversation
      </v-btn>
    </template>
    <v-list lines="three">
      <v-list-subheader
        v-if="conversations && conversations.length > 0"
        class="text-h5"
        >My Conversations
      </v-list-subheader>
      <v-list-item
        v-for="conversation in conversations"
        :key="conversation.id"
        :active="
          currentConversation && conversation.id === currentConversation.id
        "
        color="secondary"
        @click.prevent="loadConversation(conversation.id)"
      >
        <template v-slot:title>
          <v-list-item-title v-if="conversation.id !== editConversationId"
            >{{ conversation.name }}
          </v-list-item-title>
          <v-text-field
            v-else-if="conversation.id === editConversationId"
            v-model="newConversationName"
            class="mt-6"
            placeholder="New Name"
            variant="outlined"
            @click.prevent.stop
            @update.prevent.stop
          ></v-text-field>
        </template>
        <template v-if="conversation.id !== editConversationId" v-slot:append>
          <v-tooltip location="bottom" text="Change Name">
            <template v-slot:activator="{ props }">
              <v-btn
                color="secondary"
                icon="mdi-square-edit-outline"
                v-bind="props"
                variant="text"
                @click.prevent.stop="openEditName(conversation.id)"
              >
              </v-btn>
            </template>
          </v-tooltip>
          <v-tooltip location="bottom" text="Delete Conversation">
            <template v-slot:activator="{ props }">
              <v-btn
                color="error"
                icon="mdi-close"
                v-bind="props"
                variant="text"
                @click.prevent.stop="deleteConversation(conversation.id)"
              >
              </v-btn>
            </template>
          </v-tooltip>
        </template>
        <template
          v-else-if="conversation.id === editConversationId"
          v-slot:append
        >
          <v-tooltip location="bottom" text="Save">
            <template v-slot:activator="{ props }">
              <v-btn
                :disabled="!newConversationName"
                color="primary"
                icon="mdi-check"
                v-bind="props"
                variant="text"
                @click.prevent.stop="saveName"
              ></v-btn>
            </template>
          </v-tooltip>
          <v-tooltip location="bottom" text="Cancel">
            <template v-slot:activator="{ props }">
              <v-btn
                color="error"
                icon="mdi-close"
                v-bind="props"
                variant="text"
                @click.prevent.stop="cancelEditName"
              ></v-btn>
            </template>
          </v-tooltip>
        </template>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
  <v-container class="mt-8">
    <v-row class="max-height">
      <v-col class="px-6">
        <v-sheet class="pa-8">
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
                  <v-card
                    :text="message.content"
                    color="primary"
                    subtitle="You"
                  >
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
        </v-sheet>
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
                  <v-btn
                    :block="true"
                    :disabled="!message || isLoading"
                    color="primary"
                    type="submit"
                  >
                    Go
                  </v-btn>
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
  const alertStore = useAlertStore();

  chatGPTStore
    .changeConversationName(editConversationId.value, newConversationName.value)
    .then(() => {
      alertStore.initSuccess('Successfully changed name of the conversation');
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
