<script>
  export let filter = ''
</script>

<div class='container shadow filters'>
  <form>
    <div class='field'>
      <label for='filter'>Filtrar Gastos</label>

      <select
        id='filter'
        bind:value={filter}
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
  </form>
</div>

<style>
  .filters {
    margin-top: 10rem;
  }

  .filters .field {
    display: flex;
    align-items: center;
    gap: 2rem;
  }

  .filters label {
    font-size: 3rem;
    font-weight: 900;
    color: var(--dark-gray);
  }

  .filters select {
    flex: 1;
    padding: 1rem;
    border: none;
    border-radius: 1rem;
    background-color: var(--light-gray);
    text-align: center;
    cursor: pointer;
  }
</style>
