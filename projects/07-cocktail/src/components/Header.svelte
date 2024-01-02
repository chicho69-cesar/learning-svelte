<script lang='ts'>
  import { onDestroy, onMount } from 'svelte'
  import { Link } from 'svelte-routing'
  import { drinksStore, type DrinkStore } from '../stores/drinks.store'
  import { notificationStore } from '../stores/notifications.store';

  let store: DrinkStore | null = null
  let name = ''
  let category = ''

  const unsubscribe = drinksStore.subscribe((value) => {
    store = value
  })

  $: isHomePage = window.location.pathname === '/'
  $: drinksStore.setSearch(name, category)

  onMount(() => {
    drinksStore.setCategories()
  })

  onDestroy(() => unsubscribe())

  const handleSubmit = () => {
    if (store != null && Object.values(store.search).includes('')) {
      notificationStore.show('Todos los campos son obligatorios', true)
      return
    }

    drinksStore.getRecipes()
  }
</script>

<div>
  <header class:isHomePage class='bg-slate-800'>
    <div class='container px-5 py-16 mx-auto'>
      <div class='flex items-center justify-between'>
        <div>
          <Link to='/'>
            <img
              class='w-32'
              src='/img/logo.svg'
              alt='logotipo'
            />
          </Link>
        </div>

        <nav class='flex gap-4 text-white'>
          <Link to='/' class={`uppercase font-bold ${isHomePage && 'text-orange-500'}`}>
            Inicio
          </Link>

          <Link to='/favorites' class={`uppercase font-bold ${!isHomePage && 'text-orange-500'}`}>
            Favoritos
          </Link>
        </nav>
      </div>

      {#if isHomePage}
        <form
          class='p-10 mt-16 space-y-6 bg-orange-400 rounded-lg shadow md:w-1/2 2xl:w-1/3'
          on:submit|preventDefault={handleSubmit}
        >
          <div class='space-y-4'>
            <label for='ingrediente' class='block text-lg font-extrabold text-white uppercase'>
              Nombre o Ingredientes
            </label>

            <input
              id='ingrediente'
              type='text'
              class='w-full p-3 rounded-lg focus:outline-none'
              placeholder='Nombre o Ingrediente: Ej. Vodka, Tequila, etc'
              bind:value={name}
            />
          </div>

          <div class='space-y-4'>
            <label for='category' class='block text-lg font-extrabold text-white uppercase'>
              Categoría
            </label>

            <select
              id='category'
              class='w-full p-3 rounded-lg focus:outline-none'
              bind:value={category}
            >
              <option value=''>-- Seleccione --</option>

              {#if store != null}
                {#each store.categories.drinks as drink}
                  <option value={drink.strCategory}>
                    {drink.strCategory}
                  </option>
                {/each}
              {/if}
            </select>
          </div>

          <button type='submit' class='w-full p-2 font-extrabold text-white uppercase bg-orange-800 rounded-lg cursor-pointer hover:bg-orange-900'>
            Buscar recetas
          </button>
        </form>
      {/if}
    </div>
  </header>
</div>

<style>
  .isHomePage {
    background-image: url('/img/bg.webp');
    background-size: cover;
    background-position: center;
  }
</style>
