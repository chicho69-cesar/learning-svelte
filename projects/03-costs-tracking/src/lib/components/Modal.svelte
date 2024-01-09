<script>
  import Alert from './Alert.svelte'
  import closeModal from '../../assets/img/cerrar.svg'
  import { createEventDispatcher } from 'svelte'

  export let modal
  export let name
  export let quantity
  export let category
  export let available
  export let id
  export let saveSpent

  let error = ''
  const old = quantity

  const dispatch = createEventDispatcher()

  $: isEditing = id

  const handleAddSpent = () => {
    if ([name, quantity, category].includes('')) {
      error = 'Todos los campos son obligatorios'

      setTimeout(() => {
        error = ''
      }, 3000)

      return
    }

    if (quantity <= 0) {
      error = 'Cantidad no válida'

      setTimeout(() => {
        error = ''
      }, 3000)

      return
    }

    if (id) {
      if (quantity > old + available) {
        error = 'Has excedido el saldo disponible'

        setTimeout(() => {
          error = ''
        }, 3000)

        return
      }
    } else {
      if (quantity > available) {
        error = 'Has excedido el saldo disponible'

        setTimeout(() => {
          error = ''
        }, 3000)

        return
      }
    }

    saveSpent()
  }
</script>

<div class='modal'>
  <div class='close-modal'>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
    <img
      src={closeModal}
      alt='ico cerrar modal'
      on:click={() => dispatch('close-modal')}
    />
  </div>

  <div class={`container form-container ${modal.animate ? 'animate' : 'close'}`}>
    <form class='new-spent' on:submit|preventDefault={handleAddSpent}>
      <legend>
        {isEditing ? 'Guardar Cambios' : 'Añadir Gasto' }
      </legend>

      {#if error}
        <Alert>{error}</Alert>
      {/if}

      <div class='field'>
        <label for='name'>Nombre gasto:</label>
        <input
          type='text'
          id='name'
          placeholder='Añade el nombre del gasto'
          bind:value={name}
        />
      </div>

      <div class='field'>
        <label for='quantity'>Cantidad:</label>
        <input
          type='number'
          id='quantity'
          placeholder='Añade la cantidad del gasto'
          bind:value={quantity}
        />
      </div>

      <div class='field'>
        <label for='category'>Categoría:</label>
        <select
          id='category'
          bind:value={category}
        >
          <option value=''>-- Seleccione --</option>
          <option value='ahorro'>Ahorro</option>
          <option value='comida'>Comida</option>
          <option value='casa'>Casa</option>
          <option value='gastos'>Gastos varios</option>
          <option value='ocio'>Ocio</option>
          <option value='salud'>Salud</option>
          <option value='suscripciones'>Suscripciones</option>
        </select>
      </div>

      <input type='submit' value='{isEditing ? 'Guardar Cambios' : 'Añadir Gasto'}' />
      {#if isEditing}
        <button
          type='button'
          class='btn-delete'
          on:click={() => dispatch('delete-spent')}
        >
          Eliminar Gasto
        </button>
      {/if}
    </form>
  </div>
</div>

<style>
  .modal {
    position: absolute;
    background-color: rgb(0 0 0/0.9);
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  .close-modal {
    position: absolute;
    right: 3rem;
    top: 3rem;
  }

  .close-modal img {
    width: 3rem;
    cursor: pointer;
  }

  .form-container {
    transition-property: all;
    transition-duration: 300ms;
    transition-timing-function: ease-in;
    opacity: 0;
  }

  .animate {
    opacity: 1;
  }

  .close {
    opacity: 0;
  }

  .new-spent {
    margin: 10rem auto 0 auto;
    display: grid;
    gap: 2rem;
  }

  .new-spent legend {
    text-align: center;
    color: var(--white);
    font-size: 3rem;
    font-weight: 700;
  }
  
  .field {
    display: grid;
    gap: 2rem;
  }

  .new-spent input,
  .new-spent select {
    background-color: var(--light-gray);
    border-radius: 1rem;
    padding: 1rem;
    border: none;
    font-size: 2.2rem;
  }

  .new-spent label {
    color: var(--white);
    font-size: 3rem;
  }

  .new-spent input[type='submit'] {
    background-color: var(--blue);
    color: var(--white);
    font-weight: 700;
    cursor: pointer;
  }

  .new-spent input[type='submit']:hover {
    background-color: #3475dd;
  }

  .btn-delete {
    padding: 1rem;
    width: 100%;
    border: none;
    background-color: #ef4444;
    font-weight: 700;
    font-size: 2.2rem;
    color: var(--white);
    cursor: pointer;
    border-radius: 1rem;
  }
</style>
