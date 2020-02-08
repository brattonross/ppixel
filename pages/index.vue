<template>
  <div class="container mx-auto px-4 py-10">
    <h1>Twitch Emote Tool</h1>

    <form @submit.prevent="onSubmit" enctype="multipart/form-data">
      <input
        id="images"
        @change="onChange"
        type="file"
        name="images"
        accept="image/*"
        multiple
      />

      <div v-for="file in files" :key="file.name" class="flex">
        <div v-for="size of previewSizes" :key="size">
          <emote-preview :file="file" :height="size" :width="size" />
        </div>
      </div>

      <button v-if="canDownload" type="submit">Download</button>
    </form>
  </div>
</template>

<script>
import EmotePreview from '../components/EmotePreview'
import { saveAs } from 'file-saver'
import JSZip from 'jszip'

export default {
  components: {
    EmotePreview
  },

  data: () => ({
    files: [],
    previews: [],
    previewSizes: [28, 56, 112]
  }),

  provide() {
    return {
      register: this.register,
      unregister: this.unregister
    }
  },

  computed: {
    canDownload() {
      return this.files.length
    }
  },

  methods: {
    onChange(e) {
      this.files = e.target.files
    },

    async onSubmit() {
      if (!this.previews.length) {
        return
      }

      const zip = new JSZip()
      await Promise.all(
        this.previews.map(async (preview) => {
          const blob = await preview.toBlob()
          const extension = preview.file.name.split('.').pop()
          const filename = preview.file.name.slice(
            0,
            -1 * (extension.length + 1)
          )

          zip.file(
            `${filename}/${filename}${preview.width}x${preview.height}.${extension}`,
            blob
          )
        })
      )

      const blob = await zip.generateAsync({ type: 'blob' })

      saveAs(blob, 'images.zip')
    },

    register(item) {
      this.previews.push(item)
    },

    unregister(item) {
      const index = this.previews.indexOf(item)
      this.previews.splice(index, 1)
    }
  }
}
</script>
