<template>
  <div
    class="font-body min-h-screen flex flex-col text-gray-900 bg-gray-100 antialiased"
  >
    <header class="flex flex-col bg-white border-t-4 border-purple-700">
      <div class="border-b">
        <div class="container py-6">
          <div class="flex items-center justify-between">
            <h1 class="inline-block text-gray-900 text-2xl font-display">
              ppixel
            </h1>

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
      </div>

      <div class="flex items-center justify-center border-b">
        <div class="px-2">
          <nuxt-link v-slot="{ href, isExactActive, navigate }" to="/">
            <header-button
              :active="isExactActive"
              :href="href"
              @click="navigate"
            >
              <template #icon>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" />
                </svg>
              </template>

              <span>Emotes</span>
            </header-button>
          </nuxt-link>
        </div>

        <div class="px-2">
          <nuxt-link v-slot="{ href, isExactActive, navigate }" to="/badges">
            <header-button
              :active="isExactActive"
              :href="href"
              @click="navigate"
            >
              <template #icon>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-award"
                >
                  <circle cx="12" cy="8" r="7" />
                  <path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12" />
                </svg>
              </template>

              <span>Badges</span>
            </header-button>
          </nuxt-link>
        </div>
      </div>
    </header>

    <main class="flex-grow">
      <transition name="fade" mode="out-in">
        <keep-alive>
          <nuxt />
        </keep-alive>
      </transition>
    </main>
  </div>
</template>

<script>
import HeaderButton from '../components/Header/HeaderButton'

export default {
  name: 'Default',

  components: {
    HeaderButton
  }
}
</script>
