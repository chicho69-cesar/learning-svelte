<script>
  import { afterUpdate, beforeUpdate, onDestroy, onMount } from 'svelte'
  import Header from './components/Header.svelte'
  import Collection from './components/Collection.svelte'

  /* Creamos las variables que serán nuestro estado */
  let guitars = []
  let cart = []
  let activeGuitar = guitars.length > 0 ? guitars[0] : null

  /* Creamos un intervalo para cambiar el estado de la variable de la guitarra
  activa cada 5 segundos. */
  let interval = setInterval(() => {
    const noOfGuitars = guitars.length
    activeGuitar = guitars[Math.floor(Math.random() * noOfGuitars)]
  }, 5000)

  /* La función onMount es parte de las 4 funciones del ciclo de vida de nuestros
  componentes, en este caso onMount solo se ejecuta cuando el componente es creado.
  Por lo que es sumamente util para cargar data que viene de una API. */
  onMount(() => {
    // console.log('El componente sera creado')
    
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

  /* La función onDestroy es la segunda función del ciclo de vida de los componentes.
  Esta función se ejecuta cuando el componente se destruye del DOM. */
  onDestroy(() => {
    // console.log('El componente sera destruido')
    clearInterval(interval)
  })

  /* La función beforeUpdate es la tercera función del ciclo de vida de los componentes,
  esta función se ejecuta cada vez que el estado del componente va a cambiar, es decir,
  se ejecuta antes de que el componente ejecute un re-renderizado. */
  beforeUpdate(() => {
    // console.log('El componente sera modificado')
  })

  /* La función afterUpdate es la ultima función del ciclo de vida de los componentes,
  esta función se ejecuta cada vez que el estado del componente ha cambiado, es decir,
  se ejecuta después de que el componente ejecuta un re-renderizado. */
  afterUpdate(() => {
    // console.log('El componente ya fue modificado')
  })

  const handleAddToCart = (guitar) => {
    const isInCart = cart.some((c) => c.id === guitar.id)

    /* Modificamos el estado del carrito */
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

<!-- Usamos nuestro componente Header, junto con el llamado a los custom events que 
creamos en este componente, nuestros eventos personalizado nos mandan el evento en los
parámetros, el cual tiene la propiedad detail que es el parámetro que se manda en el
evento. -->
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
  <!-- Para hacer condiciones en Svelte tenemos las directivas de if, if-else, 
  if-else if-else. -->
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
