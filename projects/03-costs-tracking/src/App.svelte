<script>
  import { onMount } from 'svelte'
  
  import Budget from './lib/components/Budget.svelte'
  import BudgetControl from './lib/components/BudgetControl.svelte'
  import Modal from './lib/components/Modal.svelte'
  import Spent from './lib/components/Spent.svelte'
  import Filters from './lib/components/Filters.svelte'
  import { generateId } from './lib/helpers/generate-id'

  import newSpentIcon from './assets/img/nuevo-gasto.svg'

  let budget = 0
  let available = 0
  let spentMoney = 0
  let filter = ''
  let spentList = []
  let currentSpent = {
    name: '',
    quantity: '',
    category: '',
    id: null,
    date: Date.now()
  }
  let modal = {
    show: false,
    animate: false
  }

  $: {
    const totalSpent = spentList.reduce((total, spent) => spent.quantity + total, 0)
    spentMoney = totalSpent
    available = budget - totalSpent

    localStorage.setItem('spent-list', JSON.stringify(spentList))
  }

  $: {
    if (!modal.show) {
      resetSpentState()
    }
  }

  $: filteredSpent = filter
    ? spentList.filter((value) => value.category === filter)
    : [...spentList]

  $: localStorage.setItem('budget', budget)

  onMount(() => {
    const storageBudget = localStorage.getItem('budget')

    if (storageBudget) {
      budget = Number(storageBudget)
      budget = Number(storageBudget)
    }

    const storageSpent = localStorage.getItem('spent-list')

    if (storageSpent) {
      spentList = JSON.parse(storageSpent)
    }
  })

  const resetSpentState = () => {
    currentSpent = {
      name: '',
      quantity: '',
      category: '',
      id: null,
      date: Date.now()
    }
  }

  const defineBudget = (quantity) => {
    budget = quantity
    available = quantity
  }

  const showModal = () => {
    // modal.show = true
    modal = { ...modal, show: true }

    setTimeout(() => {
      // modal.animate = true
      modal = { ...modal, animate: true }
    }, 300)
  }
  
  const closeModal = () => {
    // modal.animate = false
    modal = { ...modal, animate: false }

    setTimeout(() => {
      // modal.show = false
      modal = { ...modal, show: false }
    }, 300)
  }

  const saveSpent = () => {
    if (currentSpent.id) {
      const { id } = currentSpent
      const index = spentList.findIndex((value) => value.id === id)

      spentList = spentList.map((value, i) => {
        if (index === i) return { ...currentSpent }
        return value
      })
    } else {
      const newSpent = {
        ...currentSpent,
        id: generateId()
      }

      spentList = [...spentList, newSpent]
    }

    closeModal()
    resetSpentState()
  }

  const selectSpent = (id) => {
    const spentToEdit = spentList.find((value) => value.id === id)
    if (spentToEdit) currentSpent = { ...spentToEdit }
    showModal()
  }

  const deleteSpent = () => {
    /* Usamos la API del navegador confirm para que el usuario confirme que desea
    eliminar el gasto. */
    if (confirm('¿Está seguro que desea eliminar el gasto?')) {
      spentList = spentList.filter((value) => value.id !== currentSpent.id)
      closeModal()
    }
  }

  const resetApp = () => {
    if (confirm('¿Deseas reiniciar la App?')) {
      spentList = []
      budget = 0
    }
  }
</script>

<div class='{modal.show ? 'fix' : ''}'>
  <header>
    <h1>
      Planificador de gastos
    </h1>

    <div class='container-header container shadow'>
      {#if budget === 0}
        <Budget
          defineBudget={defineBudget}
        />
      {:else}
        <BudgetControl
          {budget}
          {available}
          {spentMoney}
          on:reset-app={() => resetApp()}
        />
      {/if}
    </div>
  </header>

  {#if budget > 0}
    <main>
      <Filters bind:filter />

      <div class='spent-list container'>
        <h2>
          {filteredSpent.length > 0 ? 'Gastos' : 'No hay Gastos'}
        </h2>

        {#each filteredSpent as spentItem, i (spentItem.id)}
          <Spent
            spent={spentItem}
            on:select-spent={({ detail }) => selectSpent(detail)}
          />
        {/each}
      </div>

      <div class='create-spent'>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
        <img
          src={newSpentIcon}
          alt='icono nuevo gasto'
          on:click={() => showModal()}
        />
      </div>

      {#if modal.show}
        <!-- Usamos los eventos on: cuando definimos un evento usando un dispatcher
        de eventos.
        Podemos ejecutar funciones que pasamos como props al componente.
        Podemos pasar variables o props que en el componente sera de solo lectura,
        es decir, que no van a cambiar su valor dentro del componente.
        También podemos usar bind para props que van a cambiar su valor dentro del 
        componente. -->
        <Modal
          on:close-modal={() => closeModal()}
          on:delete-spent={() => deleteSpent()}
          {saveSpent}
          {modal}
          {available}
          id={currentSpent.id}
          bind:name={currentSpent.name}
          bind:quantity={currentSpent.quantity}
          bind:category={currentSpent.category}
        />
      {/if}
    </main>
  {/if}
</div>

<style>
  :global(:root) {
    --blue: #3b82f6;
    --white: #fff;
    --light-gray: #f5f5f5;
    --dark-gray: #64748b;
    --gray: #94a3b8;
    --black: #000;
  }

  :global(html) {
    font-size: 62.5%;
    box-sizing: border-box;
  }

  :global(*),
  :global(*:before),
  :global(*:after) {
    box-sizing: inherit;
  }

  :global(body) {
    font-size: 1.6rem;
    font-family: 'Lato', sans-serif;
    background-color: var(--light-gray);
  }

  :global(h1) {
    font-size: 4rem;
  }

  :global(h2) {
    font-size: 3rem;
  }

  :global(.fix) {
    overflow: hidden;
    height: 100vh;
  }

  :global(header) {
    background-color: var(--blue);
  }

  :global(header h1) {
    padding: 3rem 0;
    margin: 0;
    color: var(--white);
    text-align: center;
  }

  :global(.container) {
    width: 90%;
    max-width: 80rem;
    margin: 0 auto;
  }

  :global(.container-header) {
    margin-top: -5rem;
    transform: translateY(5rem);
    padding: 5rem;
  }

  :global(.shadow) {
    box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
    background-color: var(--white);
    border-radius: 1.2rem;
    padding: 5rem;
  }

  :global(.create-spent) {
    position: fixed;
    bottom: 5rem;
    right: 5rem;
  }

  :global(.create-spent img) {
    width: 5rem;
    cursor: pointer;
  }

  :global(.spent-list) {
    margin-top: 5rem;
  }

  :global(.spent-list h2) {
    font-weight: 900;
    color: var(--dark-gray);
  }

  :global(::-webkit-scrollbar) {
    width: 6px;
  }

  :global(::-webkit-scrollbar-track) {
    background: #fff;
  }

  :global(::-webkit-scrollbar-thumb) {
    background: var(--blue);
  }

  :global(::-webkit-scrollbar-thumb:hover) {
    background: #2667ce;
  }
</style>
