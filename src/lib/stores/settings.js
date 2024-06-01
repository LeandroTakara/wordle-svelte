import { persisted } from 'svelte-persisted-store'

export const settingsStore = persisted('settings', {
    'keyboard': 'Alphabetically'
})
