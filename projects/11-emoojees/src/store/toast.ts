import { writable } from 'svelte/store'

export interface ToastState {
  title: string
  emoji_mode: 'code' | 'emoji'
  emoji: string
}

export const toastStore = writable<ToastState[]>([])

export function addToast(title: string, emoji_mode: 'code' | 'emoji', emoji: string, duration: number) {
  const newToast = { title, emoji_mode, emoji }

  // Agregamos el toast a la store
  toastStore.update((toasts) => [...toasts, newToast])

  setTimeout(() => {
    toastStore.update((toasts) => toasts.filter((toast) => toast !== newToast))
  }, duration)
}
