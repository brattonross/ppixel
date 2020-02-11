<template>
  <div class="font-body min-h-screen text-gray-900 bg-gray-100 antialiased">
    <header class="bg-white border-t-4 border-purple-600 shadow">
      <div class="container py-6">
        <div class="flex items-center justify-between">
          <nuxt-link to="/">
            <h1 class="inline-block text-2xl font-semibold">ppixel</h1>
          </nuxt-link>

          <image-upload @change="onChange">
            <e-button outline>
              Upload
              <template #append>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path
                    d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"
                  />
                </svg>
              </template>
            </e-button>
          </image-upload>
        </div>
      </div>
    </header>

    <main>
      <nuxt />
    </main>
  </div>
</template>

<script>
import EButton from '../components/EButton'
import ImageUpload from '../components/ImageUpload'

export default {
  name: 'Default',

  components: {
    EButton,
    ImageUpload
  },

  methods: {
    onChange(e) {
      this.$store.commit('uploads/addFiles', e.target.files)
    }
  }
}
</script>
