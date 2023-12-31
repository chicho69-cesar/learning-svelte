<script>
  import { loadingWeather, weather } from '../store/weather'
  import Loading from './Loading.svelte'

  let result = { weather: null, error: null }
  const KELVIN = 273.15

  weather.subscribe((value) => {
    result = value
  })
</script>

{#if $loadingWeather}
  <Loading />
{:else if result.weather == null && result.error == null}
  <span></span>
{:else if result.error != null}
  <p class='text-xl font-bold text-center text-white'>
    Ocurrió un error al consultar el clima
  </p>
{:else if result.weather != null}
  <article class='w-1/2 p-4 bg-white rounded shadow-lg'>
    <h2 class='w-full mb-4 text-2xl font-bold text-center'>
      El Clima de {result.weather.name} es:
    </h2>

    <p class='w-full mb-4 font-black text-center text-7xl'>
      {parseInt(result.weather.main.temp - KELVIN)} <span>&#x2103;</span>
    </p>
    
    <div class='flex items-center justify-center gap-4'>
      <p class='text-base font-semibold'>
        Mín: {parseInt(result.weather.main.temp_min - KELVIN)} <span>&#x2103;</span>
      </p>
      
      <p class='text-base font-semibold'>
        Máx: {parseInt(result.weather.main.temp_max - KELVIN)} <span>&#x2103;</span>
      </p>
    </div>
  </article>
{/if}
