<template>
    <div class="flex gap-1 mb-2">
      <div class="flex-1 relative border-2 border-gray-300 p-3 rounded-lg flex">
        <input
          v-model="message"
          type="text"
          class="w-full outline-none"
          placeholder="Message ChatGPT..."
        />
        <div class="flex gap-2">
          <button @click="sendChats">➤</button>
        </div>
      </div>
    </div>
  </template>
<script setup lang="ts">
import { ref } from 'vue'

const message = ref('')
const sendChats = () => {
    return message
}
</script>