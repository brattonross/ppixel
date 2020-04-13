<template>
  <div class="container flex flex-col py-16">
    <div class="mb-8">
      <h2 class="text-4xl font-bold font-display leading-tight">Emotes</h2>
      <p class="text-gray-600">
        Convert emotes to 112x112, 56x56, and 28x28.
      </p>
    </div>

    <table class="bg-white rounded shadow-md">
      <thead>
        <emote-row>
          <template #select>
            <div class="p-4">
              <e-checkbox v-model="allSelected" :disabled="!hasUploaded" />
            </div>
          </template>

          <template #title>
            <div class="p-4">
              <div
                class="font-semibold uppercase tracking-wide text-sm text-gray-600"
              >
                Name
              </div>
            </div>
          </template>

          <template #emote>
            <div
              class="font-semibold uppercase tracking-wide text-sm text-gray-600"
            >
              Preview
            </div>
          </template>

          <template #actions>
            <div class="h-12 flex items-center justify-end p-4">
              <transition name="fade">
                <div v-if="selected.length" class="flex -mx-1">
                  <div class="px-1">
                    <e-button icon @click="onSaveClick">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
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
                    </e-button>
                  </div>

                  <div class="px-1">
                    <e-button type="button" icon @click="onDeleteClick">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path
                          d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"
                        />
                      </svg>
                    </e-button>
                  </div>
                </div>
              </transition>
            </div>
          </template>
        </emote-row>
      </thead>

      <tbody>
        <emote-row v-for="file in items" :key="file.id">
          <template #select>
            <div class="p-4" @click.stop>
              <e-checkbox
                :checked="selected.includes(file.id)"
                @change="onRowChange(file.id)"
              />
            </div>
          </template>

          <template #title>
            <div class="p-4">
              {{ file.name }}
            </div>
          </template>

          <template #emote>
            <div class="flex mr-2">
              <div
                class="flex flex-grow justify-center p-2"
                style="background-color: #f7f7f8;"
              >
                <emote-canvas
                  :key="`${file.id}-light`"
                  :image="file.image"
                  :height="28"
                  :width="28"
                />
              </div>

              <div
                class="flex flex-grow justify-center p-2"
                style="background-color: #18181b;"
              >
                <emote-canvas
                  :key="`${file.id}-dark`"
                  :image="file.image"
                  :height="28"
                  :width="28"
                />
              </div>
            </div>
          </template>
        </emote-row>

        <tr>
          <td colspan="4">
            <form ref="form" class="p-4">
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
            </form>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { basename } from 'path'
import { saveAs } from 'file-saver'
import JSZip from 'jszip'
import Pica from 'pica'
import { mapGetters } from 'vuex'
import { extension } from '@/assets/js/path'
import EButton from '@/components/EButton'
import ECheckbox from '@/components/ECheckbox'
import EmoteCanvas from '@/components/EmoteCanvas'
import EmoteRow from '@/components/EmoteRow'
import ImageUpload from '@/components/ImageUpload'

export default {
  components: {
    EButton,
    ECheckbox,
    EmoteCanvas,
    EmoteRow,
    ImageUpload
  },

  data: () => ({
    previews: [],
    selected: []
  }),

  provide() {
    return {
      register: this.register,
      unregister: this.unregister
    }
  },

  computed: {
    ...mapGetters('emotes', ['items']),

    allSelected: {
      get() {
        return (
          !!this.items.length &&
          this.items.every((file) => this.selected.includes(file.id))
        )
      },

      set(val) {
        if (!this.items.every((file) => this.selected.includes(file.id))) {
          this.selected = this.items.map((file) => file.id)
        } else {
          this.selected = []
        }
      }
    },

    hasUploaded() {
      return this.items.length
    }
  },

  methods: {
    register(vm) {
      this.previews.push(vm)
    },

    unregister(vm) {
      const index = this.previews.indexOf(vm)
      this.previews.splice(index, 1)
    },

    async onChange(e) {
      await this.$store.dispatch('emotes/ADD_FILES', {
        files: [...e.target.files]
      })
      // this.$refs.form.reset()
    },

    async downloadFiles(ids) {
      const zip = new JSZip()
      await Promise.all(
        ids.map(async (id) => {
          const item = this.items.find((item) => item.id === id)
          const ext = `.${extension(item.name)}`

          for (const size of [28, 56, 112]) {
            const canvas = document.createElement('canvas')
            canvas.width = size
            canvas.height = size

            const pica = new Pica()
            await pica.resize(item.image, canvas, { alpha: true })

            const blob = await pica.toBlob(canvas, 'image/png')
            const filename = basename(item.name, ext)

            zip.file(
              `${filename}/${filename}_${canvas.width}x${canvas.height}${ext}`,
              blob
            )
          }
        })
      )

      const blob = await zip.generateAsync({ type: 'blob' })

      saveAs(blob, 'emotes.zip')
    },

    onDeleteClick() {
      for (const id of this.selected) {
        this.$store.commit('emotes/REMOVE_IMAGE', { id })
      }

      this.selected = []
    },

    onRowChange(name) {
      if (this.selected.includes(name)) {
        this.selected = this.selected.filter((n) => n !== name)
      } else {
        this.selected.push(name)
      }
    },

    onSaveClick() {
      this.downloadFiles(this.selected)
    }
  }
}
</script>
