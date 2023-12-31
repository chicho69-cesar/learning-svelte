<script>
  let city = ''
  let country = ''
</script>

<form class='w-1/2'>
  <div class='w-full mb-4'>
    <label class='flex flex-col w-full gap-1'>
      <span class='text-sm font-bold text-white'>Ciudad</span>

      <input
        type='text'
        bind:value={city}
        placeholder='Ciudad'
        class='w-full px-4 py-2 text-lg text-white bg-transparent border-2 border-white rounded-lg outline-none'
      />
    </label>
  </div>
  
  <div class='w-full mb-4'>
    <label class='flex flex-col w-full gap-1'>
      <span class='text-sm font-bold text-white'>País</span>

      <select bind:value={country} class='w-full px-4 py-2 text-lg text-white bg-transparent border-2 border-white rounded-lg outline-none [&>option]:text-black'>
        <option value=''>Seleccione un país</option>
        <option value='US'>Estados Unidos</option>
        <option value='MX'>México</option>
        <option value='AR'>Argentina</option>
        <option value='CO'>Colombia</option>
        <option value='CR'>Costa Rica</option>
        <option value='ES'>España</option>
        <option value='PE'>Perú</option>
      </select>
    </label>
  </div>

  <button type='submit' class='inline-block w-full px-4 py-2 mt-4 font-bold text-center text-white uppercase transition bg-orange-500 rounded hover:bg-orange-600 hover:scale-95'>
    Consultar clima
  </button>
</form>
