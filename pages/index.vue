<template>
  <div class="container py-10">
    <form enctype="multipart/form-data" @submit.prevent="downloadAll">
      <label
        v-if="!hasUploaded"
        for="images"
        class="relative flex flex-col items-center justify-center text-center border-2 border-gray-400 border-dashed rounded p-16 font-semibold text-gray-500"
      >
        <div class="mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="56"
            height="56"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path
              d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"
            />
          </svg>
        </div>
        <div class="text-xl">
          Drop your emotes here, or
          <span class="text-indigo-600">browse</span>
        </div>

        <input
          id="images"
          class="opacity-0 w-full absolute inset-0 cursor-pointer"
          type="file"
          name="images"
          accept="image/*"
          multiple
          @change="onChange"
        />
      </label>

      <div v-if="hasUploaded" class="flex items-center justify-between mb-3">
        <h2 class="text-2xl font-semibold">Uploads</h2>

        <div class="flex -mx-1">
          <div class="px-1">
            <e-button type="submit">
              Download All
              <template #append>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path
                    d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"
                  />
                </svg>
              </template>
            </e-button>
          </div>

          <div class="px-1">
            <e-button outline @click="$store.commit('uploads/removeAllFiles')"
              >Clear All</e-button
            >
          </div>
        </div>
      </div>
    </form>

    <div class="bg-white rounded shadow">
      <div
        v-for="file in files"
        :key="file.name"
        class="flex flex-col p-4 border-b"
      >
        <div class="flex items-center justify-between">
          <span class="text-xl">{{ file.name }}</span>
          <div>
            <e-button outline @click="download(file)">Download</e-button>
            <e-button outline @click="$store.commit('uploads/removeFile', file)"
              >Clear</e-button
            >
          </div>
        </div>

        <div class="my-3">
          <div class="flex flex-col md:flex-row md:justify-center -my-1">
            <div class="py-1">
              <div class="flex items-center justify-center p-2 rounded">
                <div v-for="size of previewSizes" :key="size" class="px-2">
                  <emote-preview :file="file" :height="size" :width="size" />
                </div>
              </div>
            </div>

            <div class="py-1">
              <div
                class="flex items-center justify-center p-2 bg-gray-900 rounded"
              >
                <div v-for="size of previewSizes" :key="size" class="px-2">
                  <emote-preview :file="file" :height="size" :width="size" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { saveAs } from 'file-saver'
import JSZip from 'jszip'
import { mapState } from 'vuex'
import EButton from '../components/EButton'
import EmotePreview from '../components/EmotePreview'

export default {
  components: {
    EButton,
    EmotePreview
  },

  data: () => ({
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
    ...mapState('uploads', ['files']),

    hasUploaded() {
      return this.files.length
    }
  },

  methods: {
    onChange(e) {
      this.$store.commit('uploads/addFiles', e.target.files)
    },

    async download(file) {
      const previews = this.previews.filter((p) => p.file === file)
      await this.downloadFiles(...previews)
    },

    async downloadAll() {
      if (!this.previews.length) {
        return
      }

      await this.downloadFiles(...this.previews)
    },

    async downloadFiles(...previews) {
      const zip = new JSZip()
      await Promise.all(
        previews.map(async (preview) => {
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

      saveAs(blob, 'emotes.zip')
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
