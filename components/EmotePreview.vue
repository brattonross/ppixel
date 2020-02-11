<template>
  <div
    class="flex items-center justify-center p-2 rounded"
    :class="backgroundClass"
  >
    <div v-for="size of previewSizes" :key="size" class="px-2">
      <emote-canvas :file="file" :height="size" :width="size" />
    </div>
  </div>
</template>

<script>
import EmoteCanvas from './EmoteCanvas'

export default {
  name: 'EmotePreview',

  components: { EmoteCanvas },

  props: {
    backgroundClass: {
      type: String,
      default: 'bg-white'
    },

    file: {
      required: true,
      validator: () => true
    }
  },

  data: () => ({
    previewSizes: [28, 56, 112]
  })
}
</script>
