<template>
    <div>
      <Message
        v-for="(chat, index) of CHATS"
        :key="index"
        :content="chat.content"
        :role="chat.role"
      />
    </div>
</template>
  
<script setup lang="ts">
import Message from './/Message.vue';

  const CHATS = [
    {content:'user message', role:'user'},
    {content:'chat message', role:'chat'}
  ]
</script>