<template>
  <div class="flex flex-col h-full items-center">
    <!-- Chat messages display area -->
    <div class="flex-1 w-1/2 p-4 overflow-y-auto bg-white">
      <Message
        v-for="(msg, index) in chatMessages"
        :key="index"
        :content="msg.content"
        :role="msg.role"
      />
    </div>

    <!-- Input area -->
    <div class="p-4 bg-white shadow-lg w-1/2">
      <form @submit.prevent="fetchData" class="flex">
        <input
          v-model="message"
          type="text"
          placeholder="Type a message..."
          class="flex-1 border rounded-l-lg p-2 focus:outline-none"
        />
        <button
          type="submit"
          class="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600"
        >
          Send
        </button>
      </form>

      <!-- Error or response display -->
      <div v-if="response" class="text-red-500 mt-2 text-center">{{ response }}</div>
    </div>
  </div>
</template>

<script setup>
import Message from '~/components/Message.vue'
import { ref } from 'vue'

const message = ref('')
const response = ref(null)
const chatMessages = ref([
  { content: 'Hello! How can I assist you today?', role: 'chat' },
  { content: 'awda', role: 'user' },
])

const fetchData = async () => {
  if (message.value.trim() === '') return // Prevent empty messages

  try {
    const res = await fetch(`http://127.0.0.1:5000/ask?prompt=${encodeURIComponent(message.value)}`)
    const data = await res.json()

    if (res.ok) {
      chatMessages.value.push({ content: message.value, role: 'user' })
      chatMessages.value.push({ content: data.value, role: 'chat' })
      message.value = ''
      response.value = null
    } else {
      response.value = data.error
    }
  } catch (err) {
    response.value = 'An error occurred while fetching the data.'
  }
}
</script>
