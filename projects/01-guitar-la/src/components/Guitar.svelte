<script>
  import { createEventDispatcher } from 'svelte'

  export let guitar
  const dispatch = createEventDispatcher()
</script>

<article id={guitar.id}>
  <figure>
    <img
      src={`/guitars/${guitar.img}`}
      alt={guitar.model}
    />
  </figure>

  <section>
    <h3>
      {guitar.model}
    </h3>

    <p class='desc'>
      {guitar.description}
    </p>

    <p class='price'>
      ${guitar.price}
    </p>

    <button on:click={() => dispatch('add', guitar)}>
      Agregar al Carrito
    </button>
  </section>
</article>

<style>
  article {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 0.5rem;
  }

  img {
    width: 8.5rem;
  }

  section {
    flex: 1;
  }

  h3 {
    font-size: 1.75rem;
    font-weight: 800;
  }

  .desc {
    font-size: 1rem;
    color: #404040;
    text-wrap: pretty;
  }

  .price {
    margin-block: 0.5rem;
    font-size: 2rem;
    font-weight: 900;
    color: #f77f1d;
  }

  button {
    cursor: pointer;
    display: inline-block;
    width: 100%;
    padding-block: 0.5rem;
    border: none;
    background-color: #101010;
    color: #fff;
    font-size: 1.125rem;
    font-weight: 700;
  }
</style>
