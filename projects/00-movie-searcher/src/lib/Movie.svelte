<script>
  import styles from './Movie.module.css'

  export let title
  export let year
  export let poster
</script>

<article>
  <h3 class={styles.title}>{title} ({year})</h3>
  <img alt={title} src={poster} class={styles.img} />
</article>
