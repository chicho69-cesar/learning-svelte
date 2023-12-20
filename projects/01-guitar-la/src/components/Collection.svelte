<script>
  import Guitar from './Guitar.svelte'

  export let guitars = []
</script>

<h1>
  Nuestra Colección
</h1>

<section class='grid'>
  <!-- En los ciclos, obtenemos el elemento, el indice y entre paréntesis podemos definir
  una key para identificar el componente en el DOM y que Svelte pueda hacer mejoras de
  rendimiento. -->
  {#each guitars as guitar, i (guitar.id)}
    <Guitar {guitar} on:add />
  {/each}
</section>

<style>
  h1 {
    margin-top: 1rem;
    text-align: center;
    color: #f77f1d;
    font-weight: 900;
    font-size: 3rem;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(200px, 1fr));
    gap: 1rem;
    margin-top: 2rem;
  }
</style>
