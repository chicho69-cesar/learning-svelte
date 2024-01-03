<script lang='ts'>
  import { Dialog, DialogTitle, TransitionChild, Transition } from '@rgossiaux/svelte-headlessui'
  import { modalStore } from '../stores/modal.store'
  import { drinksStore } from '../stores/drinks.store'
  import { favoritesStore } from '../stores/favorites.store'
  import type { DrinkElement } from '../types/drink'

  let recipe: DrinkElement | null = null
  let noOfIngredients = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]

  drinksStore.subscribe((value) => {
    recipe = value.recipe.drinks[0]
  })
</script>

<Transition show={$modalStore.isOpen}>
  <Dialog as='div' class='relative z-10' on:close={() => modalStore.closeModal()}>
    <TransitionChild
      enter='ease-out duration-300'
      enterFrom='opacity-0'
      enterTo='opacity-100'
      leave='ease-in duration-200'
      leaveFrom='opacity-100'
      leaveTo='opacity-0'
    >
      <div class='fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75' />
    </TransitionChild>
    
    <div class='fixed inset-0 z-10 overflow-y-auto'>
      <div
        class='flex items-end justify-center min-h-full p-4 text-center sm:items-center sm:p-0'
      >
        <TransitionChild
          enter='ease-out duration-300'
          enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
          enterTo='opacity-100 translate-y-0 sm:scale-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100 translate-y-0 sm:scale-100'
          leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
        >
          <div class='relative px-4 pt-5 pb-4 overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:w-full sm:max-w-2xl sm:p-6'>
            <div>
              {#if recipe != null}
                <div class='mt-3'>
                  <DialogTitle as='h3' class='my-5 text-4xl font-extrabold text-gray-900'>
                    {recipe.strDrink}
                  </DialogTitle>

                  <img
                    src={recipe.strDrinkThumb}
                    alt={`Imagen de ${recipe.strDrink}`}
                    class='m-auto rounded w-96'
                  />

                  <DialogTitle as='h3' class='my-5 text-4xl font-extrabold text-gray-900'>
                    Ingredientes y Cantidades
                  </DialogTitle>

                  {#each noOfIngredients as i}
                    {#if recipe[`strIngredient${i}`] != null}
                      <p class='text-lg text-gray-500'>
                        {recipe[`strIngredient${i}`]} - {recipe[`strMeasure${i}`]}
                      </p>
                    {/if}
                  {/each}

                  <DialogTitle as='h3' class='my-5 text-4xl font-extrabold text-gray-900'>
                    Instrucciones
                  </DialogTitle>

                  <p class='text-xl text-gray-500'>
                    {recipe.strInstructions}
                  </p>
                </div>
              
                <div class='flex justify-between gap-4 mt-5 sm:mt-6'>
                  <button
                    type='button'
                    on:click={() => modalStore.closeModal()}
                    class='w-full p-3 font-bold text-white uppercase bg-gray-600 rounded shadow hover:bg-gray-500'
                  >
                    Cerrar
                  </button>

                  <button
                    type='button'
                    on:click={() => favoritesStore.handleClickFavorite(recipe ?? { idDrink: '', strDrink: '', strDrinkThumb: '' })}
                    class='w-full p-3 font-bold text-white uppercase bg-orange-600 rounded shadow hover:bg-orange-500'
                  >
                    {$modalStore.text}
                  </button>
                </div>
              {/if}
            </div>
          </div>
        </TransitionChild>
      </div>
    </div>
  </Dialog>
</Transition>
