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
          <emote-preview :file="file" />
        </div>

        <div class="py-1">
          <emote-preview background-class="bg-gray-900" :file="file" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EButton from './EButton'
import EmotePreview from './EmotePreview'

export default {
  name: 'EmoteUpload',

  components: {
    EButton,
    EmotePreview
  },

  props: {
    file: {
      required: true,
      /** Allow any, expects File type. */
      validator: () => true
    }
  }
}
</script>
