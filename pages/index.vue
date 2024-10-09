<script setup>
import Message from '~/components/Message.vue'
import { ref } from 'vue'

const message = ref('')
const response = ref(null)
const chatMessages = ref([])

const fetchData = async () => {
  try {
    const res = await fetch(`http://127.0.0.1:5000/ask?prompt=${message.value}`)
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
<template>
  <div class="h-screen w-full max-w-4xl mx-auto flex flex-col justify-between">
    <div class="flex-1 p-2 overflow-auto">
      <!-- Loop through chatMessages to display the conversation -->
      <Message
        v-for="(chat, index) in chatMessages"
        :key="index"
        :content="chat.content"
        :role="chat.role"
      />
      <!-- Display error response if any -->
      <div v-if="response" class="mt-4 border p-4 rounded-lg">
        <p>{{ response }}</p>
      </div>
    </div>
    <!-- Input and Send Button -->
    <div class="flex gap-1 mb-2">
      <div class="flex-1 relative border-2 border-gray-300 p-3 rounded-lg flex">
        <input
          v-model="message"
          type="text"
          class="w-full outline-none"
          placeholder="Message ChatGPT..."
        />
        <div class="flex gap-2">
          <button @click="fetchData">➤</button>
        </div>
      </div>
    </div>
  </div>
</template>