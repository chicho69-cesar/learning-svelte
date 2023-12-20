import './app.css'
import App from './App.svelte'

/* Creamos una instancia de nuestra aplicación en el elemento con el id app
en en el html que importa este componente. */
const app = new App({
  target: document.getElementById('app'),
})

export default app
