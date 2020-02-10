export const state = () => ({
  files: []
})

export const mutations = {
  addFiles(state, files) {
    state.files.push(...files)
  },

  removeFile(state, file) {
    const index = state.files.indexOf(file)
    state.files.splice(index, 1)
  },

  removeAllFiles(state) {
    state.files = []
  }
}
