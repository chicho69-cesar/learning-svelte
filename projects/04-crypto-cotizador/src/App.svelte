<script>
  import './app.css'
  
  import Form from './components/Form.svelte'
  import Result from './components/Result.svelte'

  let selectedCurrency = 'default'
  let selectedCrypto = 'default'
  let showAlert = false

  const fetchCryptos = async () => {
    if (selectedCurrency === 'default' || selectedCrypto === 'default') {
      showAlert = true
      return null
    }
    
    showAlert = false
    const currency = selectedCurrency
    const crypto = selectedCrypto

    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${crypto}&tsyms=${currency}`
    const response = await fetch(url)

    if (response.status === 200) {
      const data = await response.json()
      return data.DISPLAY[crypto][currency]
    } else {
      throw new Error('Error al cotizar la criptomoneda')
    }
  }

  let result = undefined

  const handleSubmit = () => {
    result = fetchCryptos()
  }
</script>

<div class='w-full min-h-screen bg-black/90'>
  <main class='w-5/6 min-h-screen py-8 mx-auto md:w-2/3 lg:w-1/3'>
    <h1 class='text-6xl font-black text-white'>
      Cotizador de <span class='text-indigo-600'>Criptomonedas</span>
    </h1>

    <!-- Cuando hacemos un bind de una prop de un componente, lo que hacemos es que
    al modificar el valor de las props en el componente hijo también cambia el valor
    en el componente padre que hace el bind.
    Cuando tenemos una prop que se llama al valor que le queremos pasar podemos simplemente
    pasarla entre {}.
    Hacemos un bind de eventos, esto lo que hacemos es que un cierto evento submit
    de un form dentro del componente ejecutara la función que le mandemos al evento desde
    el padre. -->
    <Form
      bind:currency={selectedCurrency}
      bind:crypto={selectedCrypto}
      {showAlert}
      on:submit={handleSubmit}
    />

    <Result
      {result}
    />
  </main>
</div>

<style>
  div {
    background-image: url('/img/imagen-criptos.png');
    background-position: top center;
    background-repeat: no-repeat;
    background-size: auto;
  }
</style>
