<template>
  <canvas ref="canvas" :width="width" :height="height" />
</template>

<script>
import { resize } from '@/assets/js/pica'

export default {
  name: 'EmoteCanvas',

  props: {
    /** HTMLImageElement */
    image: {
      required: true,
      validator: () => true
    },

    height: {
      type: [String, Number],
      required: true
    },

    width: {
      type: [String, Number],
      required: true
    }
  },

  inject: ['register', 'unregister'],

  data() {
    return {
      canvas: null
    }
  },

  created() {
    this.register(this)
  },

  async mounted() {
    this.canvas = await resize(this.image, this.$refs.canvas)
  },

  beforeDestroy() {
    this.unregister(this)
  },

  methods: {
    toBlob() {
      return new Promise((resolve) => {
        this.$refs.canvas.toBlob((blob) => {
          resolve(blob)
        }, 'image/png')
      })
    }
  }
}
</script>
