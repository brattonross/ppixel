import Vue from 'vue'
import cuid from 'cuid'

export default function createStore({ sizes = [] }) {
  return {
    state: () => ({
      files: {}
    }),

    actions: {
      async ADD_FILES({ commit }, { files }) {
        const images = await Promise.all(
          files.map(
            (file) =>
              new Promise((resolve) => {
                const reader = new FileReader()
                reader.addEventListener('load', (e) => {
                  const image = new Image()
                  image.src = e.target.result
                  image.addEventListener('load', () => {
                    const id = cuid()
                    image.id = id
                    resolve({
                      id,
                      image,
                      name: file.name
                    })
                  })
                })

                reader.readAsDataURL(file)
              })
          )
        )

        commit('ADD_IMAGES', { images })
      }
    },

    mutations: {
      ADD_IMAGES(state, { images }) {
        for (const image of images) {
          Vue.set(state.files, image.id, image)
        }
      },

      REMOVE_IMAGE(state, { id }) {
        Vue.delete(state.files, id)
      }
    },

    getters: {
      items: (state) => Object.values(state.files)
    }
  }
}
