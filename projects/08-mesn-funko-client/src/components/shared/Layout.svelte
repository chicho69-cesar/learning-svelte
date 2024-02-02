<script>
  import { Link } from "svelte-routing";
import Search from "../icons/Search.svelte"
  import Home from "../icons/Home.svelte";
  import Store from "../icons/Store.svelte";
  import Category from "../icons/Category.svelte";
</script>

<header class="w-full flex gap-12 justify-start items-center py-6 px-12">
  <Link to='/' class="text-3xl font-bold text-gray-900 dark:text-gray-100">
    <h2>
      Funko <span class="text-yellow-500 dark:text-yellow-400">Dashboard</span>
    </h2>
  </Link>

  <nav class="flex-1 flex justify-between items-center gap-8">
    <form role="search" class="w-1/3 flex justify-start items-center gap-2">
      <input
        type="search"
        name="search"
        id="search"
        placeholder="Buscar..."
        class="py-1 px-6 flex-1 rounded bg-gray-200 dark:bg-gray-800 text-base placeholder:text-base placeholder:text-gray-500 dark:placeholder:text-gray-300 text-gray-900 dark:text-gray-100"
      />
      
      <button type="submit" class="text-gray-900 dark:text-gray-100">
        <Search />
      </button>
    </form>
  </nav>
</header>

<section class="w-full py-4 px-12 flex justify-between items-start gap-x-12">
  <aside class="h-full">
    <ul class="flex flex-col gap-y-2">
      <li>
        <Link to='/' class="flex gap-x-2 items-center text-base text-gray-900 dark:text-gray-100">
          <Home /> Inicio
        </Link>
      </li>
      
      <li>
        <Link to='/products' class="flex gap-x-2 items-center text-base text-gray-900 dark:text-gray-100">
          <Store /> Productos
        </Link>
      </li>
      
      <li>
        <Link to='/categories' class="flex gap-x-2 items-center text-base text-gray-900 dark:text-gray-100">
          <Category /> Categorías
        </Link>
      </li>
    </ul>
  </aside>

  <main class="flex-1">
    <slot />
  </main>
</section>
