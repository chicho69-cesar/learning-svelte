<script>
  import { dateFormatter } from '../lib/intl-formatters'

  export let patients = []
  export let onSelectPatient
  export let onDeletePatient
</script>

<div class='w-full mt-8'>
  <!-- Estructura de repetición o ciclo en svelte -->
  {#each patients as patient}
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
        <button
          on:click={() => onSelectPatient(patient)}
          class='w-full py-1 font-bold text-white bg-indigo-700 rounded shadow-sm'
        >
          Editar
        </button>

        <button
          on:click={() => onDeletePatient(patient.id)}
          class='w-full py-1 font-bold text-white bg-red-600 rounded shadow-sm'
        >
          Eliminar
        </button>
      </div>
    </article>
  {:else}
    <h2 class='text-xl font-semibold text-center'>No Hay Pacientes</h2>
  {/each}
</div>
