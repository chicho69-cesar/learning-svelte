<script lang='ts'>
  import { Link } from 'svelte-routing'
  export let to: string
</script>

<!-- Usamos el componente Link de svelte routing para la navegación. -->
<Link to={to} class='block px-3 py-2 text-sm font-bold text-white uppercase bg-blue-600 rounded shadow md:inline-block hover:bg-blue-500'>
  <slot />
</Link>
