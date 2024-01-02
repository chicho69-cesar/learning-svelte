import { writable } from 'svelte/store'
import type { DrinkElement } from '../types/drinks'
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
    const text = favoritesStore.existsFavorite(drink.idDrink)
      ? 'Eliminar de favoritos'
      : 'Agregar a favoritos'

    update((state) => ({ isOpen: !state.isOpen, text }))
  }

  return {
    subscribe,
    clickModal
  }
}

export const modalStore = createModalStore()
