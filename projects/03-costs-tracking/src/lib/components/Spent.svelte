<script>
  import { createEventDispatcher } from 'svelte'
  import { slide } from 'svelte/transition'
  import { currencyFormatter, dateFormatter } from '../helpers/formatters'
  
  import AhorroIcon from '../../assets/img/icono_ahorro.svg'
  import CasaIcon from '../../assets/img/icono_casa.svg'
  import ComidaIcon from '../../assets/img/icono_comida.svg'
  import GastosIcon from '../../assets/img/icono_gastos.svg'
  import OcioIcon from '../../assets/img/icono_ocio.svg'
  import SaludIcon from '../../assets/img/icono_salud.svg'
  import SuscripcionesIcon from '../../assets/img/icono_suscripciones.svg'

  export let spent

  const dispatch = createEventDispatcher()

  const dictionaryIcons = {
    ahorro: AhorroIcon,
    comida: ComidaIcon,
    casa: CasaIcon,
    gastos: GastosIcon,
    ocio: OcioIcon,
    salud: SaludIcon,
    suscripciones: SuscripcionesIcon,
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  class='shadow spent'
  on:click={() => dispatch('select-spent', spent.id)}
  transition:slide
>
  <div class='content'>
    <img
      src={dictionaryIcons[spent.category]}
      alt='Icono gasto'
      class='icon'
    />
    
    <div class='details'>
      <p class='category'>
        {spent.category}
      </p>
      
      <p class='name'>
        {spent.name}
      </p>
      
      <p class='date'>
        Fecha:
        <span>
          {dateFormatter(spent.date)}
        </span>
      </p>
    </div>
  </div>

  <p class='quantity'>
    {currencyFormatter(spent.quantity)}
  </p>
</div>

<style>
  .spent {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    cursor: pointer;
  }

  .content {
    display: flex;
    align-items: center;
    gap: 2rem;
  }

  .icon {
    width: 5rem;
  }

  .details p {
    margin: 0 0 1rem 0;
  }

  .category {
    color: var(--gray);
    font-size: 1.2rem;
    text-transform: uppercase;
    font-weight: 900;
  }

  .name {
    color: var(--dark-gray);
    font-size: 2.4rem;
    font-weight: 700;
    text-transform: capitalize;
  }

  .date {
    font-size: 1.6rem;
    font-weight: 900;
    color: var(--dark-gray);
  }

  .date span {
    font-weight: 400;
  }

  .quantity {
    font-size: 3rem;
    font-weight: 900;
    margin: 0;
  }
</style>
