import { writable } from 'svelte/store'

export const mode = writable<string>(
  window.localStorage.getItem('mode') ?? 'code'
)
