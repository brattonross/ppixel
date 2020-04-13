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
    icon: {
      type: Boolean,
      default: false
    },

    text: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    classes() {
      return {
        'font-semibold': true,
        'text-purple-100': !this.text && !this.icon,
        'text-purple-700': this.text || this.icon,
        'bg-transparent': this.text || this.icon,
        'bg-purple-700': !this.text && !this.icon,
        'hover:bg-purple-800': !this.text && !this.icon,
        'hover:bg-purple-200': this.text || this.icon,
        'active:bg-purple-900': !this.text && !this.icon,
        'active:bg-purple-300': this.text || this.icon,
        'disabled:bg-purple-300': !this.text && !this.icon,
        'disabled:bg-transparent': this.text || this.icon,
        'disabled:text-purple-300': this.text || this.icon,
        'px-3': !this.icon,
        'py-2': !this.icon,
        'p-2': this.icon,
        rounded: !this.icon,
        'rounded-full': this.icon,
        'transition-colors': true,
        'duration-300': true,
        'outline-none': true,
        'focus:shadow-outline': true
      }
    }
  }
}
</script>
