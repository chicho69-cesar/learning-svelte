<script>
	import Movie from './Movie.svelte'
  import styles from './Movies.module.css'

  export let movies
</script>

{#if movies?.length === 0}
  <p class={styles.text}>
    No hay resultados
  </p>
{:else if movies?.length}
  <section class={styles.grid}>
    {#each movies as movie}
      <Movie {...movie} />
    {/each}
  </section>
{:else}
  <p class={styles.text}>
    Usa el formulario para buscar una película
  </p>
{/if}
