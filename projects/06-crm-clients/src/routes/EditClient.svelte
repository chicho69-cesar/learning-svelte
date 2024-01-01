<script lang='ts'>
  import { Link } from 'svelte-routing'
  
  export let id: string
</script>

<h1>
  Editar cliente con id: {id}!!!
</h1>

<Link to='/'>
  Ir a home
</Link>
