<template>
  <div
    class="font-body min-h-screen flex flex-col text-gray-900 bg-gray-100 antialiased"
  >
    <div class="border-t-4 border-purple-700"></div>
    <header class="bg-white border-b">
      <div class="container py-6">
        <div class="flex items-center justify-between">
          <nuxt-link to="/">
            <h1 class="inline-block text-gray-900 text-2xl font-semibold">
              ppixel
            </h1>
          </nuxt-link>

          <div class="flex items-center text-gray-600 -mx-3">
            <a href="https://github.com/brattonross/ppixel" class="px-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-github"
              >
                <path
                  d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"
                />
              </svg>
            </a>

            <a href="https://twitter.com/brattonross_" class="px-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-twitter"
              >
                <path
                  d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </header>

    <main class="flex-grow">
      <nuxt />
    </main>
  </div>
</template>

<script>
export default {
  name: 'Default'
}
</script>
