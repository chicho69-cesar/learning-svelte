<script lang='ts'>
  import './app.css'
  import { Router, Route } from 'svelte-routing'
  import Home from './routes/Home.svelte'
  import AddClient from './routes/AddClient.svelte'
  import EditClient from './routes/EditClient.svelte'

  export let url: string = ''
</script>

<Router {url}>
  <Route path='/' component={Home} />
  <Route path='/add-client' component={AddClient} />
  <Route path='/edit-client/:id' component={EditClient} let:params />
</Router>
