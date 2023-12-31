<script>
  import styles from './Search.module.css'

  let value = ''
  export let onSubmit
</script>

<form on:submit|preventDefault={() => onSubmit(value)} class={styles.form}>
  <label class={styles.label}>
    <span class={styles.span}>Introduce tu película:</span>

    <input
      name='movie'
      placeholder='Avengers, The Matrix, etc.'
      bind:value={value}
      class={styles.input}
    />
  </label>

  <button type='submit' class={styles.button}>
    Buscar película
  </button>
</form>
