<script lang='ts'>
  import { onMount } from 'svelte'

  import Client from '../components/clients/Client.svelte'
  import RouterLink from '../components/ui/RouterLink.svelte'
  import Title from '../components/ui/Title.svelte'
  
  import type { Client as ClientType } from '../types/clients'
  import { changeState, deleteClient, getClients } from '../services/clients'

  let clients: ClientType[] = []

  $: thereIsClients = clients.length > 0

  onMount(() => {
    getClients()
      .then((res) => clients = res)
      .catch((error) => console.log('Hubo un error'))
  })

  const handleChangeState = (id: number, state: boolean) => {
    changeState(id, { state: !state })
      .then(() => {
        clients = clients.map((client) => {
          if (client.id === id) {
            const newState = !client.state
            
            return {
              ...client,
              state: newState,
            }
          }

          return client
        })
      })
      .catch((error) => console.log(error))
  }

  const handleDelete = (id: number) => {
    deleteClient(id)
      .then(() => {
        clients = clients.filter((client) => client.id !== id)
      })
      .catch((error) => console.log(error))
  }
</script>

<div>
  <div class='flex justify-end'>
    <RouterLink to='/add-client'>
      Agregar cliente
    </RouterLink>
  </div>
  
  <Title>
    Listado de Clientes
  </Title>

  {#if thereIsClients}
    <section class='flow-root p-5 mx-auto mt-10 bg-white shadow'>
      <div class='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
        <div class='min-w-full py-2 align-middle sm:px-6 lg:px-8'>
          <table class='min-w-full divide-y divide-gray-300'>
            <thead>
              <tr>
                <th scope='col' class='p-2 text-sm font-extrabold text-left text-gray-600'>
                  Nombre
                </th>

                <th scope='col' class='p-2 text-sm font-extrabold text-left text-gray-600'>
                  Empresa
                </th>

                <th scope='col' class='p-2 text-sm font-extrabold text-left text-gray-600'>
                  Estado
                </th>

                <th scope='col' class='p-2 text-sm font-extrabold text-left text-gray-600'>
                  Acciones
                </th>
              </tr>
            </thead>

            <tbody class='bg-white divide-y divide-gray-200'>
              {#each clients as client, i (client.id)}
                <Client
                  {client}
                  on:update-state={({ detail }) => handleChangeState(detail.id, detail.state)}
                  on:delete-cliente={({ detail }) => handleDelete(detail)}
                />
              {/each}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  {:else}
    <p class='mt-10 text-center'>
      No hay clientes
    </p>
  {/if}
</div>
