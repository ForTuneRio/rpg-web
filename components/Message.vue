<template>
  <div
    class="flex mb-4"
    :class="{
      'justify-end': isUser,
      'justify-start': !isUser
    }"
  >
    <!-- Assistant Messages -->
    <template v-if="!isUser">
      <div class="flex items-start gap-2">
        <!-- Icon and title -->
        <div class="flex flex-col items-center pt-2">
          <img
            src="../assets/chatgpt.svg"
            alt="chatgpt"
            class="w-6 h-6"
          />
          <div class="text-sm font-bold">ChatRPG</div>
        </div>
        <!-- Message content with typing effect -->
        <div
          class="bg-gray-100 text-black p-2 rounded-lg max-w-xl break-words"
        >
          {{ displayedText }}
        </div>
      </div>
    </template>

    <!-- User Messages -->
    <template v-else>
      <div class="flex items-start gap-2">
        <!-- Message content displayed immediately -->
        <div
          class="bg-blue-500 text-white p-2 rounded-lg max-w-xl break-words"
        >
          {{ displayedText }}
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'

const props = defineProps<{
  content: string
  role: string
}>()

const isUser = computed(() => props.role === 'user')

// Ref to hold the displayed text
const displayedText = ref('')

// Typing speed in milliseconds per character
const typingSpeed = 20 // Adjust as needed

onMounted(() => {
  // Apply typing effect only for assistant messages
  if (!isUser.value) {
    let index = 0
    const fullText = props.content
    const type = () => {
      if (index <= fullText.length) {
        displayedText.value = fullText.slice(0, index)
        index++
        setTimeout(type, typingSpeed)
      }
    }
    type()
  } else {
    // For user messages, display content immediately
    displayedText.value = props.content
  }
})
</script>
