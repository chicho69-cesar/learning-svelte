<script lang='ts'>
  import { createEventDispatcher } from 'svelte'
  import { Link } from 'svelte-routing'
  import type { Client } from '../../types/clients'

  export let client: Client

  $: clientName = client.name + ' ' + client.lastName
  $: clientState = client.state

  const dispatch = createEventDispatcher()
</script>

<tr>
  <td class='py-4 pl-4 pr-3 text-sm whitespace-nowrap sm:pl-0'>
    <p class='font-medium text-gray-900 capitalize'>{clientName}</p>
    <p class='text-gray-500'>{client.email}</p>
  </td>

  <td class='px-3 py-4 text-sm text-gray-500 whitespace-nowrap'>
    <p class='font-bold text-gray-900 capitalize'>{client.business}</p>
    <p class='text-gray-600 capitalize'>{client.role}</p>
  </td>

  <td class='px-3 py-4 text-sm whitespace-nowrap'>
    <button
      class={`inline-flex px-2 text-xs font-semibold leading-5 rounded-full ${clientState ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
      on:click={() => dispatch('update-state', { id: client.id, state: client.state })}
    >
      {clientState ? 'Activo' : 'Inactivo'}
    </button>
  </td>

  <td class='px-3 py-4 text-sm text-gray-500 whitespace-nowrap'>
    <Link
      to={`/edit-client/${client.id}`}
      class='mr-5 text-indigo-600 hover:text-indigo-500'
    >
      Editar
    </Link>

    <button
      class='text-red-600 hover:text-red-500'
      on:click={() => dispatch('delete-cliente', client.id)}
    >
      Eliminar
    </button>
  </td>
</tr>
