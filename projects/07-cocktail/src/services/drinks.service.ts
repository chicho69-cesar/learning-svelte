import api from '../config/axios'
import type { Category } from '../types/categories'
import type { Drink } from '../types/drink'
import type { Drinks } from '../types/drinks'

export async function getCategories() {
  const { data } = await api.get<Category>('/list.php?c=list')
  return data
}

export async function searchRecipes(category: string, name: string) {
  const { data } = await api.get<Drinks>(`/filter.php?c=${category}&i=${name}`)
  return data
}

export async function searchRecipe(id: string) {
  const { data } = await api.get<Drink>(`/lookup.php?i=${id}`)
  return data
}
