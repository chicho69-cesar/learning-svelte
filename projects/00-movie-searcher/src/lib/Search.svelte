<script>
  let value = ''
  export let onSubmit
</script>

<form on:submit|preventDefault={() => onSubmit(value)}>
  <label>
    Introduce tu película:

    <input
      name='movie'
      placeholder='Avengers, The Matrix, etc.'
      bind:value={value}
    />
  </label>

  <button type='submit'>
    Buscar película
  </button>
</form>
