<script>
  import { onDestroy, onMount } from 'svelte'
  import Header from './components/Header.svelte'
  import Collection from './components/Collection.svelte'

  let guitars = []
  let cart = []
  let activeGuitar = guitars.length > 0 ? guitars[0] : null

  let interval = setInterval(() => {
    const noOfGuitars = guitars.length
    activeGuitar = guitars[Math.floor(Math.random() * noOfGuitars)]
  }, 5000)

  onMount(() => {
    const controller = new AbortController()
    const { signal } = controller

    fetch('/data.json', { signal })
      .then((res) => res.json())
      .then((data) => {
        guitars = data.guitars
        activeGuitar = guitars[0]
      })
      .catch((error) => {
        if (error.name !== 'AbortError') {
          console.error(error.message)
        }
      })

    return () => controller.abort()
  })

  onDestroy(() => {
    clearInterval(interval)
  })

  const handleAddToCart = (guitar) => {
    const isInCart = cart.some((c) => c.id === guitar.id)

    if (!isInCart) {
      cart = [
        ...cart,
        { guitar, quantity: 1 }
      ]
    }
  }

  const handleIncreaseQuantity = (guitar) => {
    cart = cart.map((c) => {
      if (c.guitar.id === guitar.id) {
        /* NOTE: Cuando quieras cambiar el estado de un arreglo, debes de poner
        las propiedades que cambian después del spread operator. */
        return {
          ...c,
          quantity: c.quantity + 1
        }
      }

      return c
    })
  }

  const handleDecreaseQuantity = (guitar) => {
    const newCart = cart.map((c) => {
      if (c.guitar.id === guitar.id) {
        if (c.quantity === 1) {
          return null
        }
        
        return {
          ...c,
          quantity: c.quantity - 1
        }
      }

      return c
    })

    cart = newCart.filter(Boolean)
  }

  const handleRemove = (guitar) => {
    cart = cart.filter((c) => c.guitar.id !== guitar.id)
  }

  const handleClear = () => {
    cart = []
  }
</script>

<Header
  {cart}
  guitar={activeGuitar}
  on:add={({ detail: guitar }) => handleAddToCart(guitar)}
  on:decrease={({ detail: guitar }) => handleDecreaseQuantity(guitar)}
  on:increase={({ detail: guitar }) => handleIncreaseQuantity(guitar)}
  on:remove={({ detail: guitar }) => handleRemove(guitar)}
  on:clear={() => handleClear()}
/>

<main>
  {#if guitars.length > 0}
    <Collection
      {guitars}
      on:add={({ detail: guitar }) => handleAddToCart(guitar)}
    />
  {:else}
    <p class='loading'>
      Loading...
    </p>
  {/if}
</main>

<style>
  main {
    width: 90%;
    margin: 1.5rem auto;
  }

  .loading {
    text-align: center;
  }
</style>
