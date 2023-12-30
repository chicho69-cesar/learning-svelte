<script>
  import Spinner from './Spinner.svelte'

  export let result
</script>

<!-- La directiva await nos ayuda a resolver promesas dentro de nuestros componentes
asi podemos manejar varios estados de las promesas, el cual es el loading mientras se
intento resolver la promesa con el 'await', si la promesa se resuelve exitosamente
tenemos el que entra al 'then' y obtenemos el valor que se resolvió, si hay un error
entra al bloque 'catch' y obtenemos el error que se haya generado. -->
{#await result}
  <Spinner />
{:then value}
  {#if value != null}
    <article class='w-full p-4 mb-4 bg-white rounded shadow-lg'>
      <picture class='grid w-full place-content-center h-60'>
        <img
          src={`https://cryptocompare.com/${value.IMAGEURL}`}
          alt='Imagen crypto'
          class='h-60 w-60'
        />
      </picture>

      <section>
        <p class='text-base font-bold'>
          El Precio es de:{' '}
          <span class='text-2xl font-black text-indigo-600'>{value.PRICE}</span>
        </p>
        
        <p class='text-base font-bold'>
          Precio más alto del día:{' '}
          <span class='font-normal'>{value.HIGHDAY}</span>
        </p>
        
        <p class='text-base font-bold'>
          Precio más bajo del día:{' '}
          <span class='font-normal'>{value.LOWDAY}</span>
        </p>
        
        <p class='text-base font-bold'>
          Variación últimas 24 horas:{' '}
          <span class='font-normal'>{value.CHANGEPCT24HOUR}</span>
        </p>
        
        <p class='text-base font-bold'>
          Última Actualización:{' '}
          <span class='font-normal'>{value.LASTUPDATE}</span>
        </p>
      </section>
    </article>
  {/if}
{:catch error}
  <p class='inline-block w-full px-4 py-2 font-bold text-center text-white bg-red-500 rounded'>
    Ocurrió un error al cotizar la criptomoneda
  </p>
{/await}
