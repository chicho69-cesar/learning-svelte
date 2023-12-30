<script>
  import Spinner from './Spinner.svelte'

  export let result
</script>

{#await result}
  <Spinner />
{:then value}
  {#if value != null}
    <p>
      {value.PRICE}
    </p>
  {/if}
{:catch error}
  <p>
    Ocurrió un error al cotizar la criptomoneda
  </p>
{/await}
