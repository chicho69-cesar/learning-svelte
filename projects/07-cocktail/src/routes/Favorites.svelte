<script lang='ts'>
  import Header from '../components/Header.svelte'
  import Recipe from '../components/Recipe.svelte'
  import { favoritesStore, thereIsFavorites } from '../stores/favorites.store'
</script>

<Header />

<main class='container mx-auto mt-10'>
  <div>
    <h1 class='text-6xl font-extrabold'>Favoritos</h1>

    {#if $thereIsFavorites}
      <div class='grid grid-cols-1 gap-2 my-10 md:grid-cols-2 lg:grid-cols-3'>
        {#each $favoritesStore.favorites as drink, i (drink.idDrink)}
          <Recipe recipe={drink} />
        {/each}
      </div>
    {:else}
      <p class='my-10 text-2xl text-center'>
        No hay favoritos
      </p>
    {/if}
  </div>
</main>
