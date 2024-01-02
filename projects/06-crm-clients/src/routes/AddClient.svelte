<script lang='ts'>
  import { navigate } from 'svelte-routing'

  import Input from '../components/ui/Input.svelte'
  import RouterLink from '../components/ui/RouterLink.svelte'
  import Title from '../components/ui/Title.svelte'
  import { addClient } from '../services/clients'

  let name = ''
  let lastName = ''
  let email = ''
  let phone = ''
  let business = ''
  let role = ''

  const handleSubmit = () => {
    addClient({
      id: Math.floor(Math.random() * (99999 - 1000 + 1)) + 1000,
      state: true,
      name,
      lastName,
      email,
      phone,
      business,
      role
    })
      .then((response) => {
        /* Usamos la función navigate de svelte routing para hacer una navegación
        desde el script. */
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
    Agregar cliente
  </Title>

  <div class='mx-auto mt-10 bg-white shadow'>
    <div class='px-6 py-20 mx-auto md:w-2/3'>
      <form on:submit|preventDefault={handleSubmit}>
        <Input
          label='Nombre'
          name='name'
          placeholder='Nombre del cliente'
          bind:value={name}
        />
        
        <Input
          label='Apellidos'
          name='lastName'
          placeholder='Apellido del cliente'
          bind:value={lastName}
        />
        
        <Input
          label='Email'
          name='email'
          placeholder='Email del cliente'
          bind:value={email}
        />
        
        <Input
          label='Teléfono'
          name='phone'
          placeholder='Teléfono: XXX-XXX-XXXX'
          bind:value={phone}
        />
        
        <Input
          label='Empresa'
          name='business'
          placeholder='Empresa del cliente'
          bind:value={business}
        />
        
        <Input
          label='Puesto'
          name='role'
          placeholder='Puesto del cliente'
          bind:value={role}
        />

        <button type='submit' class='block px-3 py-2 text-sm font-bold text-white uppercase bg-blue-600 rounded shadow md:inline-block hover:bg-blue-500'>
          Agregar cliente
        </button>
      </form>
    </div>
  </div>
</div>
