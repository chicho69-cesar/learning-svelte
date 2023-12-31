import axios from 'axios'
import { writable } from 'svelte/store'

/* Usamos writable para crear un estado global con Svelte, esta store la vamos
a poder modificar desde cualquier componente y los cambios se verán reflejados en todos
los lugares donde estemos suscritos a esta store. */
export const weather = writable({
  weather: null,
  error: null
})

export const loadingWeather = writable(false)

export async function searchWeather(city, country) {
  try {
    const apiKey = import.meta.env.VITE_API_KEY
    /* Seteamos un un cambio en nuestra store. También tenemos los métodos de update
    que nos ayuda a hacer modificaciones en la store tomando como parámetros un callback
    que recibe el estado actual y devuelve el nuevo estado. Y el método suscribe que recibe
    un callback el cual recibe como argumentos el valor del estado actual. */
    loadingWeather.set(true)
  
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${country}&limit=1&appid=${apiKey}`
    const { data } = await axios.get(url)
    const { lat, lon } = data[0]

    const weatherUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
    const { data: weatherData } = await axios.get(weatherUrl)

    weather.set({ weather: weatherData, error: null })
  } catch (error) {
    weather.set({ weather: null, error: error.message })
  } finally {
    loadingWeather.set(false)
  }
}
