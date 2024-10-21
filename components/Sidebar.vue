<template>
  <div class="flex h-screen">
    <!-- Sidebar -->
    <aside class="w-64 h-screen fixed bg-neutral-800 text-white">
      <div class="p-6">
        <h1 class="text-2xl font-semibold">My Sidebar</h1>
      </div>
      <nav class="mt-6">
        <ul>
          <li v-for="item in menuItems" :key="item.name" class="p-2 hover:bg-gray-700">
            <a :href="item.link" class="block">{{ item.name }}</a>
          </li>
        </ul>
      </nav>
    </aside>

    <!-- Main Content -->
    <div class="ml-64 flex-1">
      <slot />
    </div>
  </div>
</template>
<script setup lang="ts">
const menuItems = [
  { name: 'Home', link: '/' },
  { name: 'About', link: '/about' },
  { name: 'Services', link: '/services' },
  { name: 'Contact', link: '/contact' }
]
</script>