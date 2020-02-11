<template>
  <div class="flex flex-col">
    <div class="flex items-center justify-between">
      <span class="text-xl">{{ file.name }}</span>
      <div>
        <e-button outline @click="$emit('click:download', file)"
          >Download</e-button
        >
        <e-button outline @click="$emit('click:clear')">Clear</e-button>
      </div>
    </div>

    <div class="my-3">
      <div class="flex flex-col md:flex-row md:justify-center -my-1">
        <div class="py-1">
          <div class="flex items-center justify-center p-2 rounded">
            <div v-for="size of previewSizes" :key="size" class="px-2">
              <emote-canvas :file="file" :height="size" :width="size" />
            </div>
          </div>
        </div>

        <div class="py-1">
          <div class="flex items-center justify-center p-2 bg-gray-900 rounded">
            <div v-for="size of previewSizes" :key="size" class="px-2">
              <emote-canvas :file="file" :height="size" :width="size" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EButton from './EButton'
import EmoteCanvas from './EmoteCanvas'

export default {
  name: 'EmoteUpload',

  components: {
    EButton,
    EmoteCanvas
  },

  props: {
    file: {
      required: true,
      /** Allow any, expects File type. */
      validator: () => true
    }
  },

  data: () => ({
    previewSizes: [28, 56, 112]
  })
}
</script>
