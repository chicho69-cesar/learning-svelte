<script>
	import Search from './lib/Search.svelte'
	import Movies from './lib/Movies.svelte'
  import styles from './App.module.css'

  const API_KEY = import.meta.env.VITE_API_KEY
  const API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}`

  let promise
  let searchInput = ''

  const handleSubmit = value => {
		if (value.length <= 2) {
			alert('Introduce más de 2 letras para buscar')
    	return
		}

		searchInput = value
  }

  const fetchMovies = async (search) => {
    const response = await fetch(`${API_URL}&s=${search}`)
    if (!response.ok) return []

    const json = await response.json()
    const { Response, Search } = await json

		if (Response === 'False') return []

    return Search.map(({ Title, Year, Poster }) => ({
			title: Title,
			year: Year,
			poster: Poster
		}))
  }

  $: if (searchInput.length > 2) {
    promise = fetchMovies(searchInput)
  }
</script>

<main class={styles.main}>
  <Search onSubmit={handleSubmit} />

  {#await promise}
    <p class={styles.loading}>
      Cargando...
    </p>
  {:then movies}
    <Movies movies={movies} />
  {/await}
</main>

<style>
  :global(body) {
    min-height: 100vh;
    background: radial-gradient(#25292e, #101010);
  }
</style>
