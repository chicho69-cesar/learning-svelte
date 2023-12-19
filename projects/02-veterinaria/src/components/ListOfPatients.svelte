<script>
  import { dateFormatter } from '../lib/intl-formatters'

  export let patients = []
  export let onSelectPatient
  export let onDeletePatient
</script>

<div class='w-full mt-8'>
  {#each patients as patient}
    <article class='w-full mb-4 py-2 px-4 bg-white rounded-md shadow'>
      <p class='font-bold mb-1'>
        Id: <span class='font-normal'>{patient.id}</span>
      </p>

      <p class='font-bold mb-1'>
        Nombre: <span class='font-normal'>{patient.name}</span>
      </p>

      <p class='font-bold mb-1'>
        Propietario: <span class='font-normal'>{patient.property}</span>
      </p>

      <p class='font-bold mb-1'>
        Email: <span class='font-normal'>{patient.email}</span>
      </p>

      <p class='font-bold mb-1'>
        Fecha de alta: <span class='font-normal'
          >{dateFormatter.format(patient.date)}</span
        >
      </p>

      <p class='font-bold mb-1'>
        Síntomas: <span class='font-normal'>{patient.symptoms}</span>
      </p>

      <div class='w-full flex justify-between items-center gap-4 mt-4'>
        <button
          on:click={() => onSelectPatient(patient)}
          class='w-full bg-indigo-700 font-bold text-white py-1 rounded shadow-sm'
        >
          Editar
        </button>

        <button
          on:click={() => onDeletePatient(patient.id)}
          class='w-full bg-red-600 font-bold text-white py-1 rounded shadow-sm'
        >
          Eliminar
        </button>
      </div>
    </article>
  {:else}
    <h2 class='text-center text-xl font-semibold'>No Hay Pacientes</h2>
  {/each}
</div>
