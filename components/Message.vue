<template>
  <div
    class="flex gap-1 mb-4"
    :class="{
      'justify-end': isUser,  // Align user messages to the right
      'justify-start': !isUser // Align chat messages to the left
    }"
  >
    <!-- Bot message: show icon and title -->
    <div
      v-if="!isUser"
      class="flex items-center gap-2"
    >
      <img
        src="../assets/chatgpt.svg"
        alt="chatgpt"
        class="w-4 h-4 mt-1"
      />
      <div class="text-sm font-bold">ChatRPG</div>
    </div>

    <!-- Message content -->
    <div
      :class="{
        'bg-blue-500 text-white': isUser, // User message style
        'bg-gray-100 text-black': !isUser // Bot message style
      }"
      class="p-2 rounded-lg max-w-xs"
    >
      {{ content }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  content: string
  role: string
}>()

const isUser = computed(() => {
  return props.role === 'user'
})
</script>
