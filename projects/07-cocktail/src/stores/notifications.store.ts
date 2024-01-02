import { writable } from 'svelte/store'

interface NotificationStore {
  text: string
  isError: boolean
  isShown: boolean
}

function createNotificationStore() {
  const initialValues: NotificationStore = {
    text: '',
    isError: false,
    isShown: false
  }

  const { subscribe, set } = writable<NotificationStore>(initialValues)

  const show = (text: string, isError: boolean) => {
    set({
      text,
      isError,
      isShown: true
    })

    setTimeout(() => {
      hide()
    }, 3000)
  }

  const hide = () => {
    set(initialValues)
  }

  return {
    subscribe,
    show,
    hide
  }
}

export const notificationStore = createNotificationStore()
