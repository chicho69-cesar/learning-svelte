<script>
  import { createEventDispatcher } from 'svelte'
  import { quintOut } from 'svelte/easing'
  import { crossfade } from 'svelte/transition'
  import BackgroundHeader from './BackgroundHeader.svelte'
  import Cart from './Cart.svelte'

  /* Definimos las props de nuestro componente, cuando le damos un valor a una prop
  por defecto, le decimos a Svelte que esta prop sera opcional. */
  export let guitar
  export let cart = []

  let isCartOpen = false

  /* La función createEventDispatcher nos regresa una función mediante la cual podemos
  crear eventos personalizados. */
  const dispatch = createEventDispatcher()

  /* Creamos una transición crossfade para los elementos de nuestro DOM. */
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

<!-- Cuando nuestros componentes tienen un <slot />, actúa como el children de React
y le podemos pasar componentes hijos que serán renderizados dentro de el. -->
<BackgroundHeader>
  <nav>
    <figure>
      <img src='/img/logo.svg' alt='Logo of the app' class='logo' />
    </figure>

    <!-- Mediante la directiva on: podemos definir eventos en los elementos. -->
    <button class='cart-button' on:click={() => (isCartOpen = !isCartOpen)}>
      <img src='/img/carrito.png' alt='Logo of the app' class='img-btn' />
    </button>
  </nav>

  {#if guitar}
    <section>
      <!-- Usamos las transiciones que definimos anteriormente. -->
      <h1 in:receive='{{ key: guitar.id }}' out:send='{{ key: guitar.id }}'>
        Modelo {guitar.model}
      </h1>

      <p class='guitar-desc' in:receive='{{ key: guitar.id }}' out:send='{{ key: guitar.id }}'>
        {guitar.description}
      </p>

      <p class='guitar-price' in:receive='{{ key: guitar.id }}' out:send='{{ key: guitar.id }}'>
        ${guitar.price}
      </p>

      <!-- Creamos un evento personalizado llamado add al cual le mandamos el elemento
      guitar en los details del evento. -->
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

  <!-- Cuando mandamos llamar componentes y en los eventos no le pasamos un callback
  le decimos a Svelte que estos eventos serán definidos por el componente padre, del
  componente. -->
  <Cart
    {cart}
    isOpen={isCartOpen}
    on:decrease
    on:increase
    on:remove
    on:clear
  />
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
