<script>
  import { formatDateToString } from '../lib/formatter'
  import Alert from './Alert.svelte'
  import Input from './Input.svelte'
  import SelectDate from './SelectDate.svelte'
  import TextArea from './TextArea.svelte'

  let error = false
  let success = false

  export let initialValues
  export let isEditing = false
  export let onAddPatient
  export let onEditPatient

  const handleSubmit = (e) => {
    const { id } = initialValues
    const patient = { ...initialValues }
    delete patient.id

    if (Object.values(patient).some((value) => value === '')) {
      error = true
      return
    }

    isEditing ? onEditPatient(id, patient) : onAddPatient(patient)
    e.currentTarget.reset()

    initialValues = {
      id: '',
      name: '',
      property: '',
      email: '',
      date: new Date(),
      symptoms: '',
    }

    error = false
    success = true

    setTimeout(() => {
      success = false
    }, 2500)
  }
</script>

{#if error}
  <Alert message='Todos los campos son obligatorios' />
{/if}

{#if success}
  <Alert message='Paciente almacenado correctamente' type='success' />
{/if}

<form
  on:submit|preventDefault={handleSubmit}
  class='my-8 bg-white p-4 rounded-md shadow-lg'
>
  <Input
    id='name'
    label='Nombre Mascota'
    placeholder='Nombre de la mascota...'
    value={initialValues.name}
    onInput={(e) => (initialValues.name = e.target.value)}
  />

  <Input
    id='property'
    label='Nombre Propietario'
    placeholder='Nombre del propietario...'
    value={initialValues.property}
    onInput={(e) => (initialValues.property = e.target.value)}
  />

  <Input
    id='email'
    label='Email'
    placeholder='Email del propietario...'
    value={initialValues.email}
    onInput={(e) => (initialValues.email = e.target.value)}
  />

  <SelectDate
    id='date'
    label='Alta'
    value={formatDateToString(initialValues.date)}
    onInput={(value) => (initialValues.date = new Date(value))}
  />

  <TextArea
    id='symptoms'
    label='Síntomas'
    placeholder='Síntomas de la mascota...'
    value={initialValues.symptoms}
    onInput={(e) => (initialValues.symptoms = e.target.value)}
  />

  <button
    class='w-full bg-indigo-700 py-1 rounded-md text-white font-bold text-lg shadow'
  >
    {#if isEditing}
      Editar paciente
    {:else}
      Registrar paciente
    {/if}
  </button>
</form>
