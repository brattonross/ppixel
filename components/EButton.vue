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
        'border-purple-700': true,
        'font-semibold': true,
        'text-purple-100': !this.outline,
        'text-purple-700': this.outline,
        'bg-transparent': this.outline,
        'bg-purple-700': !this.outline,
        'hover:bg-purple-800': !this.outline,
        'hover:bg-purple-200': this.outline,
        'active:bg-purple-900': !this.outline,
        'active:bg-purple-300': this.outline,
        'disabled:bg-purple-300': !this.outline,
        'disabled:border-purple-300': true,
        'disabled:bg-transparent': this.outline,
        'disabled:text-purple-300': this.outline,
        'px-3': true,
        'py-2': true,
        rounded: true,
        'transition-colors': true,
        'duration-300': true,
        'outline-none': true,
        'focus:shadow-outline': true
      }
    }
  }
}
</script>
