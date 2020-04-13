import createStore from '@/assets/js/store'

const store = createStore({ sizes: [18, 36, 72] })

export const state = store.state
export const actions = store.actions
export const mutations = store.mutations
export const getters = store.getters
