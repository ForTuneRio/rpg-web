<template>
  <div class="flex flex-col h-full items-center">
    <div class="flex-1 w-1/2 p-4 overflow-y-auto bg-white">
      <Message
        v-for="(msg, index) in chatMessages"
        :key="index"
        :content="msg.content"
        :role="msg.role"
      />
    </div>
    <div class="m-4 bg-white shadow-lg w-1/2 rounded-lg">
      <form @submit.prevent="fetchData" class="flex">
        <input
          v-model="message"
          type="text"
          placeholder="Type a message..."
          class="flex-1 border rounded-l-lg p-2 focus:outline-none"
        />
        <button
          type="submit"
          class="bg-neutral-400 text-white px-4 py-2 rounded-r-lg hover:bg-neutral-500"
        >
          Send
        </button>
      </form>
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
  { content: 'Please explane who is your character', role: 'chat' }
])
const fetchData = async () => {
  if (message.value.trim() === '') return

  try {
    const messagesToSend = chatMessages.value.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'assistant',
      content: msg.content
    }))

    messagesToSend.push({ role: 'user', content: message.value })

    const res = await fetch(`http://127.0.0.1:5000/ask`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: messagesToSend })
    })

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
