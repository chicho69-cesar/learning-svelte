<script>
  import { createEventDispatcher } from 'svelte'
  import { dateFormatter } from '../lib/intl-formatters'
  
  /* Utilizamos createEventDispatcher para crear un dispatch de eventos personalizados */
  const dispatch = createEventDispatcher()

  export let patient
</script>

<article class='w-full px-4 py-2 mb-4 bg-white rounded-md shadow'>
  <p class='mb-1 font-bold'>
    Id: <span class='font-normal'>{patient.id}</span>
  </p>

  <p class='mb-1 font-bold'>
    Nombre: <span class='font-normal'>{patient.name}</span>
  </p>

  <p class='mb-1 font-bold'>
    Propietario: <span class='font-normal'>{patient.property}</span>
  </p>

  <p class='mb-1 font-bold'>
    Email: <span class='font-normal'>{patient.email}</span>
  </p>

  <p class='mb-1 font-bold'>
    Fecha de alta: <span class='font-normal'
      >{dateFormatter.format(patient.date)}</span
    >
  </p>

  <p class='mb-1 font-bold'>
    Síntomas: <span class='font-normal'>{patient.symptoms}</span>
  </p>

  <div class='flex items-center justify-between w-full gap-4 mt-4'>
    <!-- Creamos nuestro evento personalizado edit, al cual le mandamos la variable
    patient en el evento para recibirla cuando definamos el evento en el componente
    que mande llamar a este componente. -->
    <button
      on:click={() => dispatch('edit', patient)}
      class='w-full py-1 font-bold text-white bg-indigo-700 rounded shadow-sm'
    >
      Editar
    </button>

    <!-- Definimos nuestro evento delete mandando le el id del patient -->
    <button
      on:click={() => dispatch('delete', patient.id)}
      class='w-full py-1 font-bold text-white bg-red-600 rounded shadow-sm'
    >
      Eliminar
    </button>
  </div>
</article>
