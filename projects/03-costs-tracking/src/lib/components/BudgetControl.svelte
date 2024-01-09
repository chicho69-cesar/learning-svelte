<script>
  import { createEventDispatcher } from 'svelte'
  import CircularProgress from './CircularProgress.svelte'
  import { currencyFormatter } from '../helpers/formatters'

  export let budget
  export let available
  export let spentMoney

  const dispatch = createEventDispatcher()

  $: percentage = ((budget - available) / budget) * 100
</script>

<div>
  <div class='two-columns'>
    <div class='graphic-container'>
      <CircularProgress progress={percentage} />
    </div>

    <div class='budget-container'>
      <button
        class='reset-app'
        type='button'
        on:click={() => dispatch('reset-app')}
      >
        Resetar app
      </button>

      <p>
        <span>Presupuesto:</span>
        {currencyFormatter(budget)}
      </p>
      
      <p>
        <span>Disponible:</span>
        {currencyFormatter(available)}
      </p>
      
      <p>
        <span>Gastado:</span>
        {currencyFormatter(spentMoney)}
      </p>
    </div>
  </div>
</div>

<style>
  .two-columns {
    display: flex;
    flex-direction: column;
  }

  @media (min-width: 768px) {
    .two-columns {
      flex-direction: row;
      gap: 4rem;
      align-items: center;
    }

    .two-columns > :first-child {
      margin-bottom: 0;
    }
  }

  .reset-app {
    background-color: #db2777;
    border: none;
    padding: 1rem;
    width: 100%;
    color: var(--white);
    font-weight: 900;
    text-transform: uppercase;
    border-radius: 1rem;
    transition-property: background-color;
    transition-duration: 300ms;
  }

  .reset-app:hover {
    cursor: pointer;
    background-color: #c11d67;
  }

  .budget-container {
    width: 100%;
  }

  .budget-container p {
    font-size: 2.4rem;
    text-align: center;
    color: var(--dark-gray);
  }

  @media (min-width: 768px) {
    .budget-container p {
      text-align: left;
    }
  }

  .budget-container span {
    font-weight: 900;
    color: var(--blue);
  }
</style>
