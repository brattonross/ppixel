<template>
  <div class="font-body min-h-screen text-gray-900 bg-gray-100 antialiased">
    <div class="border-t-4 border-purple-700"></div>
    <header class="bg-white border-b">
      <div class="container py-6">
        <div class="flex items-center">
          <nuxt-link to="/">
            <h1 class="inline-block text-gray-900 text-2xl font-semibold">
              ppixel
            </h1>
          </nuxt-link>
        </div>
      </div>
    </header>

    <main>
      <nuxt />
    </main>
  </div>
</template>

<script>
export default {
  name: 'Default'
}
</script>
