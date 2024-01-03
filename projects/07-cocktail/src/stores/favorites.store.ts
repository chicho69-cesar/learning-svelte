import { writable, derived } from 'svelte/store'
import type { DrinkElement } from '../types/drink'
import { notificationStore } from './notifications.store'
import { modalStore } from './modal.store'

interface FavoritesStore {
  favorites: DrinkElement[]
}

function createFavoritesStore() {
  const { subscribe, update } = writable<FavoritesStore>({
    favorites: getFavoritesFromLocalStorage()
  })

  const syncWithLocalStorage = () => {
    subscribe((value) => {
      localStorage.setItem('favorites', JSON.stringify(value.favorites))
    })
  }

  const existsFavorite = (idDrink: string) => {
    const localStorageFavorites = getFavoritesFromLocalStorage()
    const isInFavorites = localStorageFavorites.some((favorite) => favorite.idDrink === idDrink)
    return isInFavorites
  }

  const deleteFavorite = (idDrink: string) => {
    update((state) => ({
      ...state,
      favorites: state.favorites.filter((favorite) => favorite.idDrink !== idDrink)
    }))

    syncWithLocalStorage()
    notificationStore.show('Se eliminó de favoritos', false)
  }

  const addToFavorites = (drink: DrinkElement) => {
    update((state) => ({
      ...state,
      favorites: [...state.favorites, drink]
    }))

    syncWithLocalStorage()
    notificationStore.show('Se agregó a favoritos', false)
  }

  const handleClickFavorite = (drink: DrinkElement) => {
    if (existsFavorite(drink.idDrink!)) {
      deleteFavorite(drink.idDrink!)
    } else {
      addToFavorites(drink)
    }

    modalStore.closeModal()
  }

  return {
    subscribe,
    existsFavorite,
    handleClickFavorite
  }
}

function getFavoritesFromLocalStorage() {
  const localStorageFavorites = localStorage.getItem('favorites')

  if (localStorageFavorites != null) {
    const favorites: DrinkElement[] = JSON.parse(localStorageFavorites)
    return favorites
  }

  return []
}

export const favoritesStore = createFavoritesStore()

export const thereIsFavorites = derived(favoritesStore, ($favoritesStore) => {
  return $favoritesStore.favorites.length > 0
})
