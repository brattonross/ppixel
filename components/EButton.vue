<template>
  <button v-bind="$attrs" :class="classes" v-on="$listeners">
    <div class="flex items-center">
      <div v-if="$slots.prepend" class="mr-2">
        <slot name="prepend" />
      </div>

      <slot />

      <div v-if="$slots.append" class="ml-2">
        <slot name="append" />
      </div>
    </div>
  </button>
</template>

<script>
export default {
  name: 'EButton',

  inheritAttrs: false,

  props: {
    outline: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    classes() {
      return {
        border: true,
        'border-purple-600': true,
        'font-semibold': true,
        'text-purple-100': !this.outline,
        'text-purple-600': this.outline,
        'bg-transparent': this.outline,
        'bg-purple-600': !this.outline,
        'px-3': true,
        'py-2': true,
        rounded: true
      }
    }
  }
}
</script>
