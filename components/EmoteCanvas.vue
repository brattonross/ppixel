<template>
  <canvas ref="canvas" :height="height" :width="width" />
</template>

<script>
import Pica from 'pica'

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

  data() {
    return {
      pica: null
    }
  },

  created() {
    this.register(this)

    this.pica = new Pica()
    const reader = new FileReader()
    const img = new Image()
    reader.addEventListener('load', (e) => {
      img.src = e.target.result
      img.addEventListener('load', async () => {
        await this.pica.resize(img, this.$refs.canvas, {
          alpha: true
        })
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
