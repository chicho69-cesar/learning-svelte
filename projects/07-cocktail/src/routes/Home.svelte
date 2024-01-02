<script lang='ts'>
  import Header from '../components/Header.svelte'
  import { drinksStore } from '../stores/drinks.store'
</script>

<Header />

<main class='container mx-auto mt-10'>
  <p>
    {$drinksStore.search.name}
  </p>
  
  <p>
    {$drinksStore.search.category}
  </p>
</main>
