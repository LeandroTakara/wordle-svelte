import { writable } from 'svelte/store'

export const settingsStore = writable({
    'keyboard': 'Alphabetically'
})
