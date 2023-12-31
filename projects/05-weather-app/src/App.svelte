<script>
  import './app.css'
  import Container from './components/Container.svelte'
  import Form from './components/Form.svelte'
  import Result from './components/Result.svelte'
</script>

<Container>
  <h1 class='pt-6 text-4xl font-black text-center text-white'>
    Buscador de clima
  </h1>

  <div class='flex items-start justify-between w-full gap-8 my-6'>
    <Form />
    <Result />
  </div>
</Container>
