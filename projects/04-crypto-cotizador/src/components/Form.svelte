<script>
  import { onMount } from 'svelte'
  import { currencies } from '../data/currencies'

  let cryptos = []

  export let currency
  export let crypto
  export let showAlert

  onMount(() => {
    fetch('https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD')
      .then((res) => res.json())
      .then((data) => {
        cryptos = data.Data.map((crypto) => ({
          id: crypto.CoinInfo.Name,
          name: crypto.CoinInfo.FullName
        }))
      })
  })
</script>

<!-- Hacemos un bind de un evento, en este caso el evento submit del formulario,
al hacer submit se ejecutar el evento que se defina en el componente que mande llamar
a este componente y a la vez se ejecutar el modificador de eventos preventDefault. -->
<form
  class='inline-block w-full px-8 py-6 my-8 bg-white rounded-lg shadow-sm'
  on:submit|preventDefault
>
  {#if showAlert}
    <p class='inline-block w-full px-4 py-2 mb-4 font-bold text-center text-white bg-red-500'>
      Debes seleccionar todos los campos
    </p>
  {/if}
  
  <div class='w-full'>
    <label class='flex flex-col gap-1 mb-4'>
      <span class='text-sm font-bold'>Moneda:</span>

      <!-- Hacemos un bind de la propiedad value con la variable currency, en este caso
      cada que cambia el valor del select, este nuevo valor sera asignado a la variable 
      currency. -->
      <select
        class='w-full px-4 py-2 font-medium bg-gray-200 rounded outline-none'
        bind:value={currency}
      >
        <option value='default'>Seleccione</option>
        
        {#each currencies as currency, i (currency.id)}
          <option value={currency.id}>
            {currency.name}
          </option>
        {/each}
      </select>
    </label>
  </div>

  <div class='w-full'>
    <label class='flex flex-col gap-1 mb-4'>
      <span class='text-sm font-bold'>Criptomoneda:</span>

      <select
        class='w-full px-4 py-2 font-medium bg-gray-200 rounded outline-none'
        bind:value={crypto}
      >
        <option value='default'>Seleccione</option>

        {#each cryptos as crypto, i (crypto.id)}
          <option value={crypto.id}>
            {crypto.name}
          </option>
        {/each}
      </select>
    </label>
  </div>

  <button type='submit' class='inline-block w-full px-4 py-2 text-lg font-bold text-white transition bg-indigo-500 rounded shadow-inner hover:bg-indigo-700 hover:shadow-lg hover:scale-95'>
    Cotizar
  </button>
</form>
