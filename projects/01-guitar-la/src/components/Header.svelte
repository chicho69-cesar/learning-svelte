<script>
  import { createEventDispatcher } from 'svelte'
  import { quintOut } from 'svelte/easing'
  import { crossfade } from 'svelte/transition'
  import BackgroundHeader from './BackgroundHeader.svelte'
  import Cart from './Cart.svelte'

  export let guitar
  export let cart = []

  let isCartOpen = false

  const dispatch = createEventDispatcher()

  const [send, receive] = crossfade({
    fallback: (node, params) => {
      const style = getComputedStyle(node)
      const transform = style.transform === 'node' ? '' : style.transform

      return {
        duration: 1000,
        easing: quintOut,
        css: (t) => `
          transform: ${transform} scale(${t});
          opacity: ${t}
        `,
      }
    },
  })
</script>

<BackgroundHeader>
  <nav>
    <figure>
      <img src='/img/logo.svg' alt='Logo of the app' class='logo' />
    </figure>

    <button class='cart-button' on:click={() => (isCartOpen = !isCartOpen)}>
      <img src='/img/carrito.png' alt='Logo of the app' class='img-btn' />
    </button>
  </nav>

  {#if guitar}
    <section>
      <h1 in:receive={{ key: guitar.id }} out:send={{ key: guitar.id }}>
        Modelo {guitar.model}
      </h1>

      <p class='guitar-desc' in:receive={{ key: guitar.id }} out:send={{ key: guitar.id }}>
        {guitar.description}
      </p>

      <p class='guitar-price' in:receive={{ key: guitar.id }} out:send={{ key: guitar.id }}>
        ${guitar.price}
      </p>

      <button class='add-to-cart' on:click={() => dispatch('add', guitar)}>
        Agregar al carrito
      </button>
    </section>
  {/if}

  {#if guitar}
    <img
      src={`/guitars/${guitar.img}`}
      alt={guitar.model}
      class='active-guitar'
      in:receive={{ key: guitar.id }}
      out:send={{ key: guitar.id }}
    />
  {/if}

  <Cart {cart} isOpen={isCartOpen} on:decrease on:increase on:remove on:clear />
</BackgroundHeader>

<style>
  nav {
    padding: 1rem 0;
    width: 80%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
  }

  .logo {
    width: 250px;
  }

  .cart-button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    width: 50px;
  }

  .img-btn {
    width: 100%;
  }

  .active-guitar {
    position: absolute;
    right: -120px;
    bottom: -75px;
    z-index: -5;
    width: 500px;
  }

  section {
    width: 80%;
    margin: 2rem auto;
  }

  h1 {
    color: #f77f1d;
    font-size: 2.75rem;
    font-weight: 900;
  }

  .guitar-desc {
    font-size: 1.125rem;
    color: #fff;
  }

  .guitar-price {
    margin-bottom: 1rem;
    font-size: 4rem;
    font-weight: 900;
    color: #f77f1d;
  }

  .add-to-cart {
    display: inline-block;
    cursor: pointer;
    padding: 0.5rem 1.5rem;
    border: none;
    border-radius: 0.25rem;
    background-color: #f77f1d;
    color: #fff;
    font-size: 1.125rem;
    box-shadow: 2px 2px 10px -5px rgb(0 0 0 / 50%);
  }
</style>
