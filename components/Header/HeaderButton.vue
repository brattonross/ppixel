<template>
  <a
    class="flex items-center p-4 border-b-2 outline-none cursor-pointer transition-colors duration-300"
    :class="{ 'border-transparent': !active, 'border-purple-700': active }"
    style="margin-bottom: -1px"
    v-on="$listeners"
  >
    <div
      class="mr-2"
      :class="{
        'text-gray-600': !active,
        'text-purple-700': active
      }"
    >
      <slot name="icon" />
    </div>

    <div
      class="flex-grow font-semibold select-none"
      :class="{
        'text-gray-600': !active
      }"
    >
      <slot />
    </div>
  </a>
</template>

<script>
export default {
  name: 'HeaderButton',

  inheritAttrs: false,

  props: {
    active: {
      type: Boolean,
      default: false
    }
  }
}
</script>
