<template>
  <label :for="_uid" :class="classes">
    <div v-if="internalChecked" class="text-white">
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
        <path d="M20 6L9 17l-5-5" />
      </svg>
    </div>

    <input
      :id="_uid"
      v-model="internalChecked"
      v-bind="$attrs"
      class="absolute opacity-0"
      type="checkbox"
      :value="value"
    />
  </label>
</template>

<script>
export default {
  name: 'ECheckbox',

  model: {
    prop: 'checked',
    event: 'change'
  },

  props: {
    checked: {
      type: Boolean,
      default: false
    },

    value: {
      type: [String, Number, Object, Array],
      default: null
    }
  },

  data() {
    return {
      internalChecked: this.checked
    }
  },

  computed: {
    classes() {
      return {
        relative: true,
        flex: true,
        'items-center': true,
        'justify-center': true,
        'border-2': true,
        'border-gray-500': !this.internalChecked,
        'border-purple-700': this.internalChecked,
        'bg-purple-700': this.internalChecked,
        rounded: true,
        'w-5': true,
        'h-5': true,
        'transition-colors': true,
        'duration-300': true
      }
    }
  },

  watch: {
    checked(val) {
      if (this.internalChecked !== val) {
        this.internalChecked = val
      }
    },

    internalChecked(val) {
      if (this.checked !== val) {
        this.$emit('change', val)
      }
    }
  }
}
</script>
