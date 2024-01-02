<script lang='ts'>
  import { onMount } from 'svelte'
  import { navigate } from 'svelte-routing'

  import Input from '../components/ui/Input.svelte'
  import RouterLink from '../components/ui/RouterLink.svelte'
  import Title from '../components/ui/Title.svelte'
  import { getClient, updateClient } from '../services/clients'
  import type { Client } from '../types/clients'

  /* Aquí nuestra prop id sera la que obtengamos de los params. */
  export let id: string
  let client: Client

  onMount(() => {
    getClient(Number(id))
      .then((data) => client = data)
      .catch((error) => console.log(error))
  })

  const handleSubmit = () => {
    updateClient(Number(id), client)
      .then((response) => {
        navigate('/', { replace: true })
      })
      .catch((error) => console.log(error))
  }
</script>

<div>
  <div class='flex justify-end'>
    <RouterLink to='/'>
      Volver
    </RouterLink>
  </div>

  <Title>
    Editar cliente
  </Title>

  <div class='mx-auto mt-10 bg-white shadow'>
    <div class='px-6 py-20 mx-auto md:w-2/3'>
      {#if client}
        <form on:submit|preventDefault={handleSubmit}>
          <Input
            label='Nombre'
            name='name'
            placeholder='Nombre del cliente'
            bind:value={client.name}
          />
          
          <Input
            label='Apellidos'
            name='lastName'
            placeholder='Apellido del cliente'
            bind:value={client.lastName}
          />
          
          <Input
            label='Email'
            name='email'
            placeholder='Email del cliente'
            bind:value={client.email}
          />
          
          <Input
            label='Teléfono'
            name='phone'
            placeholder='Teléfono: XXX-XXX-XXXX'
            bind:value={client.phone}
          />
          
          <Input
            label='Empresa'
            name='business'
            placeholder='Empresa del cliente'
            bind:value={client.business}
          />
          
          <Input
            label='Puesto'
            name='role'
            placeholder='Puesto del cliente'
            bind:value={client.role}
          />

          <button type='submit' class='block px-3 py-2 text-sm font-bold text-white uppercase bg-blue-600 rounded shadow md:inline-block hover:bg-blue-500'>
            Guardar cambios
          </button>
        </form>
      {:else}
        <p class='text-2xl font-bold text-center'>
          No existe el cliente con el id: {id}
        </p>
      {/if}
    </div>
  </div>
</div>
