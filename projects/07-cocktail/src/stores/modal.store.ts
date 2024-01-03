import { writable } from 'svelte/store'
import type { DrinkElement } from '../types/drink'
import { favoritesStore } from './favorites.store'

interface ModalStore {
  isOpen: boolean
  text: string
}

function createModalStore() {
  const { subscribe, update } = writable<ModalStore>({
    isOpen: false,
    text: ''
  })

  const clickModal = (drink: DrinkElement) => {
    const text = favoritesStore.existsFavorite(drink.idDrink!)
      ? 'Eliminar de favoritos'
      : 'Agregar a favoritos'

    update((state) => ({ isOpen: !state.isOpen, text }))
  }

  const closeModal = () => {
    update(() => ({ isOpen: false, text: '' }))
  }

  return {
    subscribe,
    clickModal,
    closeModal
  }
}

export const modalStore = createModalStore()
