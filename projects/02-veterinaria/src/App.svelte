<script>
  import './app.css'
  import Form from './components/Form.svelte'
  import ListOfPatients from './components/ListOfPatients.svelte'

  /* Creamos las variables reactivas que van a funcionar como nuestro estado de la app */
  let patients = []
  let isEditing = false
  let currentPatient = {
    id: '',
    name: '',
    property: '',
    email: '',
    date: new Date(),
    symptoms: '',
  }

  /* Una función que modifica el estado puede ser llamada desde un componente hijo */
  const handleSelectPatient = (patient) => {
    /* En svelte el estado funciona en base a la mutabilidad, es decir, el estado
    solo va a cambiar en la UI si las variables cambian de referencia, cuando
    son objetos u arreglos, y cuando cambian de valor si son variables primitivas */
    currentPatient = { ...patient }
    isEditing = true
  }

  const handleAddPatient = (patient) => {
    const id = window.crypto.randomUUID()
    patients = [...patients, { id, ...patient }]
  }

  const handleEditPatient = (id, patient) => {
    patients = patients.map((p) => {
      if (p.id === id) {
        return {
          id, 
          ...patient
        }
      }

      return p
    })

    isEditing = false
    currentPatient = {
      id: '',
      name: '',
      property: '',
      email: '',
      date: new Date(),
      symptoms: '',
    }
  }

  const handleDeletePatient = (id) => {
    patients = patients.filter((p) => p.id !== id)
  }
</script>

<main class='min-h-screen bg-gray-100'>
  <h1 class='pt-12 pb-6 font-sans text-5xl font-black text-center'>
    Seguimiento de Pacientes <span class='text-indigo-700'>Veterinaria</span>
  </h1>

  <div class='flex items-start justify-between w-5/6 gap-8 mx-auto'>
    <section class='w-full mt-6'>
      <h2 class='text-2xl font-bold text-center'>
        Seguimiento Pacientes
      </h2>

      <p class='mt-2 font-medium text-center'>
        Añade Pacientes y <span class='text-indigo-700'>Administralos</span>
      </p>

      <!-- En svelte podemos mandar las props que se llaman igual a la variable
      que queremos mandar simplemente entre llaves.
      Además podemos ejecutar eventos mediante funciones que aquí mismo 
      definimos. -->
      <Form
        {isEditing}
        initialValues={currentPatient}
        onAddPatient={handleAddPatient}
        onEditPatient={handleEditPatient}
      />
    </section>

    <section class='w-full mt-6'>
      <h2 class='text-2xl font-bold text-center'>
        Administra tus pacientes
      </h2>

      <ListOfPatients
        {patients}
        onSelectPatient={handleSelectPatient}
        onDeletePatient={handleDeletePatient}
      />
    </section>
  </div>
</main>
