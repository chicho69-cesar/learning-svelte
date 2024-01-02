<script lang='ts'>
  import './app.css'
  import { Router, Route } from 'svelte-routing'

  import Modal from './components/Modal.svelte'
  import Notification from './components/Notification.svelte'
  import Home from './routes/Home.svelte'
  import Favorites from './routes/Favorites.svelte'

  export let url = ''
</script>

<Router {url}>
  <div>
    <Route
      path='/'
      component={Home}
    />

    <Route
      path='/favorites'
      component={Favorites}
    />

    <Modal />
    <Notification />
  </div>
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
    background: #ea7437;
  }

  /* Handle on hover */
  :global(::-webkit-scrollbar-thumb:hover) {
    background: #d35f25;
  }
</style>
