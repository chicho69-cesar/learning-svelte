<script>
  import { onMount } from 'svelte'
  import { currencies } from '../data/currencies'
  
  let cryptos = []

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

<form class='inline-block w-full px-8 py-6 my-8 bg-white rounded-lg shadow-sm'>
  <div class='w-full'>
    <label class='flex flex-col gap-1 mb-4'>
      <span class='text-sm font-bold'>Moneda:</span>

      <select class='w-full px-4 py-2 font-medium bg-gray-200 rounded outline-none'>
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

      <select class='w-full px-4 py-2 font-medium bg-gray-200 rounded outline-none'>
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
