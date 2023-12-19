<script>
  import './app.css'
  import Form from './components/Form.svelte'
  import ListOfPatients from './components/ListOfPatients.svelte'

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

  const handleSelectPatient = (patient) => {
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
  <h1 class='pt-12 pb-6 text-center text-5xl font-black font-sans'>
    Seguimiento de Pacientes <span class='text-indigo-700'>Veterinaria</span>
  </h1>

  <div class='w-5/6 mx-auto flex justify-between items-start gap-8'>
    <section class='w-full mt-6'>
      <h2 class='text-2xl font-bold text-center'>
        Seguimiento Pacientes
      </h2>

      <p class='font-medium text-center mt-2'>
        Añade Pacientes y <span class='text-indigo-700'>Administralos</span>
      </p>

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
