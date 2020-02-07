<template>
  <canvas ref="canvas" :height="height" :width="width" />
</template>

<script>
export default {
  name: 'EmotePreview',

  props: {
    file: {
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

  created() {
    this.register(this)

    const reader = new FileReader()
    const img = new Image()
    reader.addEventListener('load', (e) => {
      img.src = e.target.result
      img.addEventListener('load', () => {
        const ctx = this.$refs.canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, this.width, this.height)
      })
    })
    reader.readAsDataURL(this.file)
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
