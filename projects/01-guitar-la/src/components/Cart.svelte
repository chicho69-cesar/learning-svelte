<script>
  import { createEventDispatcher } from 'svelte'

  export let cart = []
  export let isOpen = true

  $: total = cart.reduce((acc, el) => {
    return acc + (el.quantity * el.guitar.price)
  }, 0)

  const dispatch = createEventDispatcher()
</script>

<div class='container' class:isOpen>
  <h3>
    Carrito de compras
  </h3>

  <!-- La directiva each es un ciclo que nos permite iterar listas y todo tipo de objetos
  que sean iterables, además de que podemos usar la directiva else con el para cuando
  el elemento iterable no tiene elementos. -->
  {#each cart as { quantity, guitar }}
    <article>
      <figure>
        <img
          src={`/guitars/${guitar.img}`}
          alt={guitar.model}
        />
      </figure>

      <p class='price'>
        ${guitar.price}
      </p>

      <section>
        <h4>
          {guitar.model}
        </h4>

        <div class='actions'>
          <button class='action' on:click={() => dispatch('decrease', guitar)}>
            <svg xmlns='http://www.w3.org/2000/svg' class='icon icon-tabler icon-tabler-minus' width='20' height='20' viewBox='0 0 24 24' stroke-width='2' stroke='currentColor' fill='none' stroke-linecap='round' stroke-linejoin='round'><path stroke='none' d='M0 0h24v24H0z' fill='none'/><path d='M5 12l14 0' /></svg>
          </button>

          <p class='quantity'>
            {quantity}
          </p>

          <button class='action' on:click={() => dispatch('increase', guitar)}>
            <svg xmlns='http://www.w3.org/2000/svg' class='icon icon-tabler icon-tabler-plus' width='20' height='20' viewBox='0 0 24 24' stroke-width='2' stroke='currentColor' fill='none' stroke-linecap='round' stroke-linejoin='round'><path stroke='none' d='M0 0h24v24H0z' fill='none'/><path d='M12 5l0 14' /><path d='M5 12l14 0' /></svg>
          </button>
        </div>
      </section>

      <button class='remove' on:click={() => dispatch('remove', guitar)}>
        Quitar
      </button>
    </article>
  {:else}
    <p class='empty'>
      Carrito vació
    </p>
  {/each}

  {#if cart.length > 0}
    <p class='total'>
      Total a pagar: ${total}
    </p>

    <button class='clear' on:click={() => dispatch('clear')}>
      Vaciar carrito
    </button>
  {/if}
</div>

<style>
  .isOpen {
    display: block !important;
  }
  
  .container {
    display: none;
    position: absolute;
    width: 33%;
    height: 20rem;
    padding-block: 0.5rem;
    padding-inline: 1rem;
    border-radius: 0.5rem;
    top: 12%;
    right: 12%;
    background-color: #fff;
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
    overflow-y: scroll;
  }

  .container::-webkit-scrollbar {
    width: 5px;
    background: transparent;
  }

  .container::-webkit-scrollbar-thumb {
    background: rgb(0 0 0 / 0.5);
    border-radius: 3px;
  }
  
  .empty {
    width: 100%;
    height: 80%;
    display: grid;
    place-content: center;
    font-size: 1.5rem;
    font-weight: 700;
  }

  h3 {
    text-align: center;
    padding-top: 0.5rem;
    font-size: 2rem;
  }

  article {
    width: 100%;
    margin-block: 0.5rem;
    display: flex;
    flex-flow: row nowrap;
    gap: 0.5rem;
    justify-content: space-between;
    align-items: center;
  }

  img {
    width: 100px;
  }

  .price {
    font-size: 2.25rem;
    font-weight: 900;
  }

  h4 {
    font-size: 1.5rem;
    font-weight: 700;
    text-align: center;
  }

  .actions {
    margin-top: 0.125rem;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
  }

  button:hover {
    cursor: pointer;
  }

  .action {
    display: inline-block;
    padding: 0.25rem 0.35rem;
    border: none;
    border-radius: 0.5rem;
    background-color: #101010;
    color: #fff;
  }

  .quantity {
    font-size: 2rem;
  }

  .remove {
    display: inline-block;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 0.5rem;
    background-color: #ee0505;
    color: #fff;
    font-weight: 700;
  }

  .total {
    width: 100%;
    margin-block: 0.75rem;
    text-align: right;
    font-size: 1.5rem;
    font-weight: 700;
  }

  .clear {
    display: inline-block;
    width: 100%;
    padding: 0.75rem 1rem;
    border: none;
    border-radius: 0.5rem;
    background-color: #101010;
    color: #fff;
    font-size: 1.25rem;
    font-weight: 700;
  }
</style>
