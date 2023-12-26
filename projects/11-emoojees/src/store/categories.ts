import { writable } from 'svelte/store'

export const categoriesSelected = writable<string>(
  window.localStorage.getItem('categories_selected') ??
    '[\"Smileys & Emotion\"]'
)
