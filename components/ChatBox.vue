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
        <button @click="fetchData">➤</button>
      </div>
    </div>
    <div v-if="dataV" class="mt-4 border p-4 rounded-lg">
      <p>{{ dataV }}</p>
    </div>
    <div v-if="responseV" class="mt-4 border p-4 rounded-lg">
      <p>{{ responseV }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const message = ref('')
const responseV = ref()
const dataV = ref()

const fetchData = async () => {
  try {
    // Fetching the data directly from Flask API
    const res = await fetch(`http://127.0.0.1:5000/ask?prompt="${message.value}"`)
    const data = await res.json()

    if (res.ok) {
      dataV.value = data.value
      responseV.value = null
    } else {
      responseV.value = data.error
    }
  } catch (err) {
    responseV.value = 'An error occurred while fetching the data.'
  }
}
</script>
