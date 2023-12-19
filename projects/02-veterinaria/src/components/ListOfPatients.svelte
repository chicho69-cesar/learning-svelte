<script>
  import Patient from './Patient.svelte'

  export let patients = []
  export let onSelectPatient
  export let onDeletePatient
</script>

<div class='w-full mt-8'>
  <!-- Estructura de repetición o ciclo en svelte -->
  {#each patients as patient}
    <!-- En svelte podemos crear eventos personalizados en los componentes
    y mandarlos a ejecutar en los componentes que los utilizan.
    En este caso mandamos a llamar dos eventos del componente Patient, los 
    cuales son edit y delete, a traves de los cuales recibimos la variable que 
    mandamos en el evento en la propiedad detail, donde en el primero
    recibimos el patient completo y el segundo recibimos solo el id. -->
    <Patient
      {patient}
      on:edit={({ detail: p }) => onSelectPatient(p)}
      on:delete={({ detail: id }) => onDeletePatient(id)}
    />
  {:else}
    <h2 class='text-xl font-semibold text-center'>No Hay Pacientes</h2>
  {/each}
</div>
