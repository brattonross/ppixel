import createStore from '@/assets/js/store'

const store = createStore({ sizes: [28, 56, 128] })

export const state = store.state
export const actions = store.actions
export const mutations = store.mutations
export const getters = store.getters
