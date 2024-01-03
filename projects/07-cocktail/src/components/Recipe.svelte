<script lang='ts'>
  import type { DrinkElement as DrinkElementOne } from '../types/drink'
  import type { DrinkElement as DrinkElementTwo } from '../types/drinks'
  import { drinksStore } from '../stores/drinks.store'

  export let recipe: DrinkElementOne | DrinkElementTwo
</script>

<div class='border rounded shadow-lg'>
  <div class='overflow-hidden'>
    <img
      class='transition-transform hover:scale-125 hover:rotate-2'
      src={recipe.strDrinkThumb}
      alt={`Imagen de ${recipe.strDrink}`}
    />
  </div>

  <div class='p-5'>
    <h2 class='text-2xl font-extrabold truncate'>
      {recipe.strDrink}
    </h2>

    <!-- Usamos un método definido en la store para manipular su valor. -->
    <button
      type='button'
      on:click={() => drinksStore.selectDrink(recipe.idDrink ?? '')}
      class='w-full mt-5 text-lg font-bold text-white bg-orange-400 rounded hover:bg-orange-500'
    >
      Ver Receta
    </button>
  </div>
</div>
