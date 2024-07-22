// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    '@pinia/nuxt',
    'nuxt-headlessui',
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt"
  ],
  css: ['~/assets/css/tailwind.css'],
  app: {
    head: {
      title: 'RPG'
    }
  },
  postcss: {
    plugins: {
      tailwindcss: {
      },
      autoprefixer: {}
    }

  },
  headlessui: {
    prefix: ''
  },
  components: {
    dirs: [
      {
        path: '@/components',
        pathPrefix: true
      }
    ]
  },
  shadcn: {
    prefix: '',
    componentDir: './components/ui'
  },
  imports: {
    autoImport: true
  }
})