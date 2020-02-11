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
    text: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    classes() {
      return {
        'font-semibold': true,
        'text-purple-100': !this.text,
        'text-purple-700': this.text,
        'bg-transparent': this.text,
        'bg-purple-700': !this.text,
        'hover:bg-purple-800': !this.text,
        'hover:bg-purple-200': this.text,
        'active:bg-purple-900': !this.text,
        'active:bg-purple-300': this.text,
        'disabled:bg-purple-300': !this.text,
        'disabled:bg-transparent': this.text,
        'disabled:text-purple-300': this.text,
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
