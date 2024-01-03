<script lang='ts'>
  import Header from '../components/Header.svelte'
  import Recipe from '../components/Recipe.svelte'
  import { drinksStore, thereIsRecipes } from '../stores/drinks.store'
</script>

<Header />

<main class='container mx-auto mt-10'>
  <div>
    <h1 class='text-6xl font-extrabold'>Recetas</h1>

    {#if $thereIsRecipes}
      <div class='grid grid-cols-1 gap-2 my-10 md:grid-cols-2 lg:grid-cols-3'>
        {#each $drinksStore.recipes.drinks as drink, i (drink.idDrink)}
          <Recipe recipe={drink} />
        {/each}
      </div>
    {:else}
      <p class='my-10 text-2xl text-center'>
        Realice una búsqueda
      </p>
    {/if}
  </div>
</main>
