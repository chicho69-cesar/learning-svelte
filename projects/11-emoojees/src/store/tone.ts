import { writable } from 'svelte/store'

export const tone = writable<string>(
  window.localStorage.getItem('tone') ?? '0'
)
