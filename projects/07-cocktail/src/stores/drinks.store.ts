import { writable, derived } from 'svelte/store'

import type { Category } from '../types/categories'
import type { Drinks } from '../types/drinks'
import type { Drink } from '../types/drink'
import { getCategories, searchRecipe, searchRecipes } from '../services/drinks.service'

export interface DrinkStore {
  categories: Category
  search: {
    name: string,
    category: string
  },
  recipes: Drinks
  recipe: Drink
}

function createDrinksStore() {
  const { subscribe, update } = writable<DrinkStore>({
    categories: { drinks: [] },
    search: {
      name: '',
      category: ''
    },
    recipes: { drinks: [] },
    recipe: { drinks: [] }
  })

  const setSearch = (name: string, category: string) => {
    update((state) => ({ ...state, search: { name, category } }))
  }

  const setCategories = async () => {
    const categories = await getCategories()
    update((state) => ({ ...state, categories }))
  }

  const getRecipes = async () => {
    let state: DrinkStore | null = null
    subscribe((value) => state = value)

    if (state != null) {
      const recipes = await searchRecipes(
        (state as DrinkStore).search.category,
        (state as DrinkStore).search.name
      )

      update((state) => ({ ...state, recipes }))
    }
  }

  const selectDrink = async (id: string) => {
    const recipe = await searchRecipe(id)
    update((state) => ({ ...state, recipe }))
    // TODO: Open Modal
  }

  return {
    subscribe,
    setSearch,
    setCategories,
    getRecipes,
    selectDrink
  }
}

export const drinksStore = createDrinksStore()

export const thereIsRecipes = derived(drinksStore, ($drinksStore) => {
  return $drinksStore.recipes.drinks.length > 0
})
