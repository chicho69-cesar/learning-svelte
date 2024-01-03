import { writable, derived } from 'svelte/store'

import type { Category } from '../types/categories'
import type { Drinks } from '../types/drinks'
import type { Drink } from '../types/drink'
import { getCategories, searchRecipe, searchRecipes } from '../services/drinks.service'
import { modalStore } from './modal.store'

export interface DrinkStore {
  categories: Category
  search: {
    name: string,
    category: string
  },
  recipes: Drinks
  recipe: Drink
}

/* Creamos una función la cual nos va a ayudar a crear nuestra custom store. */
function createDrinksStore() {
  /* El método writable no solo nos permite inicializar valores para una store 
  directamente, sino que también nos permite obtener los métodos de suscribe, update
  y set, mediante los cuales podemos manipular una store, esto con el fin de crear
  store que sean mas extensibles y fáciles de utilizar.
  Este también recibe el valor inicial de la store y un genérico para determinar
  el tipado de esta store. */
  const { subscribe, update } = writable<DrinkStore>({
    categories: { drinks: [] },
    search: {
      name: '',
      category: ''
    },
    recipes: { drinks: [] },
    recipe: { drinks: [] }
  })

  /* Creamos una función la cual nos va a ayudar a actualizar el estado de la store. */
  const setSearch = (name: string, category: string) => {
    /* Utilizamos el método update para actualizar el estado de la store. */
    update((state) => ({ ...state, search: { name, category } }))
  }

  const setCategories = async () => {
    const categories = await getCategories()
    update((state) => ({ ...state, categories }))
  }

  const getRecipes = async () => {
    let state: DrinkStore | null = null
    /* Utilizamos el método subscribe para obtener el estado de la store. */
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
    modalStore.clickModal(recipe.drinks[0])
  }

  /* Al momento de realizar el return de esta función es obligatorio que para poder
  crear stores a partir de esta función, que regresemos un objeto con el método
  subscribe y los métodos que hayamos definido para manipular la store. */
  return {
    subscribe,
    setSearch,
    setCategories,
    getRecipes,
    selectDrink
  }
}

/* Creamos y exportamos nuestra store en base a la función que definimos anteriormente. */
export const drinksStore = createDrinksStore()

/* Creamos una store derivado de nuestra store drinksStore, una store derivado lo que nos
permite es crear estados los cuales se modifican en base a los cambios de la store
que queramos. */
export const thereIsRecipes = derived(drinksStore, ($drinksStore) => {
  return $drinksStore.recipes.drinks.length > 0
})
