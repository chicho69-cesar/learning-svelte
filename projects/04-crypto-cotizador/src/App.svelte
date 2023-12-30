<script>
  import './app.css'
  import Form from './components/Form.svelte'
</script>

<div class='w-full min-h-screen bg-black/90'>
  <main class='w-5/6 min-h-screen py-8 mx-auto md:w-2/3 lg:w-1/3'>
    <h1 class='text-6xl font-black text-white'>
      Cotizador de <span class='text-indigo-600'>Criptomonedas</span>
    </h1>

    <Form />
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
