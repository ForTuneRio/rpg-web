<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const isClient = ref(false)
const mouseX = ref(0)
const mouseY = ref(0)

const updateMousePosition = (event) => {
  mouseX.value = event.clientX
  mouseY.value = event.clientY
}

onMounted(() => {
  isClient.value = true // Mark that we're on the client
  window.addEventListener('mousemove', updateMousePosition)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', updateMousePosition)
})

const backgroundImageStyle = computed(() => {
  if (!isClient.value) return {} // Return an empty style object during SSR

  const xPercent = ((mouseX.value / window.innerWidth) - 0.5) * 20 // Reduce range to limit movement
  const yPercent = ((mouseY.value / window.innerHeight) - 0.5) * 20 // Reduce range to limit movement

  return {
    backgroundImage: `url('/images/space.jpg')`,
    backgroundPosition: 'center',
    backgroundSize: 'cover', // Ensure the image covers the entire container
    transform: `translate(${xPercent}px, ${yPercent}px)`, // Move image slightly with the mouse
  }
})

const gradientOverlayStyle = computed(() => ({
  background: 'radial-gradient(circle, transparent, rgba(0, 0, 0, 1))'
}))
</script>
<template>
<div class="relative flex items-center justify-center h-screen overflow-hidden bg-gray-800">
    <!-- Fixed background with radial gradient overlay -->
    <div
      v-if="isClient"
      class="absolute inset-0 w-full h-full transition-transform duration-100 ease-out"
      :style="backgroundImageStyle"
    >
      <div class="absolute inset-0 bg-transparent" :style="gradientOverlayStyle"></div>
    </div>

    <div class="relative z-10 flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50 text-white">
      <div class="text-center">
        <div class="text-2xl mb-4">Chat Box</div>
        <!-- Placeholder for chat messages -->
        <div class="p-4 bg-gray-800 rounded-lg h-64 w-3/4 overflow-y-auto">
          <!-- Chat messages go here -->
        </div>
        <!-- Input box for sending messages -->
        <input
          type="text"
          placeholder="Type your message..."
          class="mt-4 w-3/4 p-2 rounded-lg bg-gray-700 text-white"
        />
      </div>
    </div>
  </div>
</template>
