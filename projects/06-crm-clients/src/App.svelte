<script lang='ts'>
  import './app.css'
  import { Router, Route } from 'svelte-routing'
  
  import Header from './components/ui/Header.svelte'
  import Home from './routes/Home.svelte'
  import AddClient from './routes/AddClient.svelte'
  import EditClient from './routes/EditClient.svelte'
  import Page404 from './routes/404.svelte'

  export let url: string = ''
</script>

<!-- Creamos un router de svelte routing teniendo como base la url / -->
<Router {url}>
  <!-- Dentro de nuestro router antes de definir las rutas podemos crear el Layout
  para cada una de las paginas. -->
  <Header />

  <main class='max-w-6xl mx-auto mt-10'>
    <!-- Definimos la ruta que sera renderizada en la ruta /, en este caso el componente
    Home. -->
    <Route path='/' component={Home} />
    <Route path='/add-client' component={AddClient} />
    <!-- Creamos una ruta dinámica, donde tendremos un param llamado id, es por esto
    que debemos definir los params para obtenerlos como props en al ruta. -->
    <Route path='/edit-client/:id' component={EditClient} let:params />
    <!-- Creamos una ruta para los errores 404. -->
    <Route path='*' component={Page404} />
  </main>
</Router>

<style>
  /* width */
  :global(::-webkit-scrollbar) {
    width: 5px;
  }

  /* Track */
  :global(::-webkit-scrollbar-track) {
    background: #fff;
  }

  /* Handle */
  :global(::-webkit-scrollbar-thumb) {
    background: #1e293b;
  }

  /* Handle on hover */
  :global(::-webkit-scrollbar-thumb:hover) {
    background: #0b1016;
  }
</style>
