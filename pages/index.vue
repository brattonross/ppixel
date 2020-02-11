<template>
  <div class="container py-10">
    <form
      ref="form"
      enctype="multipart/form-data"
      @submit.prevent="downloadAll"
    >
      <div class="bg-white rounded shadow-md">
        <div class="p-4 border-b">
          <div class="flex items-center justify-between">
            <div class="flex flex-col">
              <h2 class="text-2xl font-semibold">Emotes</h2>
              <p class="text-gray-500 text-sm">
                Choose images from your computer to preview their apperance in
                Twitch chat.
              </p>
            </div>

            <div class="flex -mx-1">
              <div class="px-1">
                <e-button :disabled="!hasUploaded" type="submit">
                  Save All
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
                      class="feather feather-save"
                    >
                      <path
                        d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"
                      />
                      <path d="M17 21v-8H7v8M7 3v5h8" />
                    </svg>
                  </template>
                </e-button>
              </div>

              <div class="px-1">
                <e-button
                  :disabled="!hasUploaded"
                  text
                  @click="$store.commit('uploads/removeAllFiles')"
                  >Remove All</e-button
                >
              </div>
            </div>
          </div>
        </div>

        <div v-for="file in files" :key="file.name" class="p-4 border-b">
          <emote-upload
            :file="file"
            @click:clear="$store.commit('uploads/removeFile', file)"
            @click:delete="download(file)"
          />
        </div>

        <div class="p-4">
          <image-upload @change="onChange">
            <div
              class="flex flex-grow flex-col items-center justify-center text-center border-2 border-gray-400 border-dashed rounded p-16 font-semibold text-gray-500"
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
                <span class="text-indigo-600">click to browse</span>
              </div>
            </div>
          </image-upload>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { basename } from 'path'
import { saveAs } from 'file-saver'
import JSZip from 'jszip'
import { mapState } from 'vuex'
import { extension } from '@/assets/js/path'
import EButton from '@/components/EButton'
import EmoteUpload from '@/components/EmoteUpload'
import ImageUpload from '@/components/ImageUpload'

export default {
  components: {
    EButton,
    EmoteUpload,
    ImageUpload
  },

  data: () => ({
    previews: []
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
      this.$refs.form.reset()
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
          const ext = `.${extension(preview.file.name)}`
          const filename = basename(preview.file.name, ext)

          zip.file(
            `${filename}/${filename}${preview.width}x${preview.height}${ext}`,
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
