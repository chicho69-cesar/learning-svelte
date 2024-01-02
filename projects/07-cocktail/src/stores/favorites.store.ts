import { writable, derived } from 'svelte/store'
import type { DrinkElement } from '../types/drinks'
import { notificationStore } from './notifications.store'

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
    return localStorageFavorites.some((favorite) => favorite.idDrink !== idDrink)
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
    if (existsFavorite(drink.idDrink)) {
      deleteFavorite(drink.idDrink)
    } else {
      addToFavorites(drink)
    }
  }

  return {
    subscribe,
    existsFavorite,
    handleClickFavorite
  }
}

function getFavoritesFromLocalStorage() {
  const favorites: DrinkElement[] = JSON.parse(localStorage.getItem('favorites') ?? '') ?? []
  return favorites
}

export const favoritesStore = createFavoritesStore()

export const thereIsFavorites = derived(favoritesStore, ($favoritesStore) => {
  return $favoritesStore.favorites.length > 0
})
