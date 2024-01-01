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

<Router {url}>
  <Header />

  <main class='max-w-6xl mx-auto mt-10'>
    <Route path='/' component={Home} />
    <Route path='/add-client' component={AddClient} />
    <Route path='/edit-client/:id' component={EditClient} let:params />
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
