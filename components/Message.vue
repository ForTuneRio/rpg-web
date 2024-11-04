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
        <!-- Message content -->
        <div
          class="bg-gray-100 text-black p-2 rounded-lg max-w-xl break-words"
        >
          {{ content }}
        </div>
      </div>
    </template>

    <!-- User Messages -->
    <template v-else>
      <div class="flex items-start gap-2">
        <!-- Message content -->
        <div
          class="bg-blue-500 text-white p-2 rounded-lg max-w-xl break-words"
        >
          {{ content }}
        </div>
      </div>
    </template>
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
