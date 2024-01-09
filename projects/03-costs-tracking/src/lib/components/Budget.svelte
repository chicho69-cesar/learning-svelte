<script>
  import Alert from './Alert.svelte'

  export let defineBudget

  let budget = ''
  let error = false

  const handleDefineBudget = () => {
    if (budget <= 0 || budget === '') {
      error = 'Presupuesto no valido'

      setTimeout(() => {
        error = ''
      }, 3000)
      
      return
    }

    defineBudget(budget)
  }
</script>

<form class='budget' on:submit|preventDefault={handleDefineBudget}>
  {#if error}
    <Alert>
      {error}
    </Alert>
  {/if}

  <div class='field'>
    <label for='new-budget'>
      Definir presupuesto
    </label>

    <input
      id='new-budget'
      type='number'
      class='new-budget'
      placeholder='Añade tu presupuesto'
      min='0'
      bind:value={budget}
    />
  </div>

  <input type='submit' value='Definir presupuesto' />
</form>

<style>
  .budget {
    width: 100%;
  }

  .field {
    display: grid;
    gap: 2rem;
  }

  .budget label {
    font-size: 2.2rem;
    text-align: center;
    color: var(--blue);
  }

  .budget input[type='number'] {
    background-color: var(--light-gray);
    border-radius: 1rem;
    padding: 1rem;
    border: none;
    font-size: 2.2rem;
    text-align: center;
  }

  .budget input[type='submit'] {
    background-color: var(--blue);
    border: none;
    padding: 1rem;
    border-radius: 1rem;
    text-align: center;
    font-size: 2rem;
    margin-top: 2rem;
    color: var(--white);
    font-weight: 900;
    width: 100%;
    transition: background-color 300ms ease;
  }

  .budget input[type='submit']:hover {
    background-color: #1048a4;
    cursor: pointer;
  }
</style>
