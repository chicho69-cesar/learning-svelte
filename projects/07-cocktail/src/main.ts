import App from './App.svelte'

const target = document.getElementById('app') as HTMLElement

const app = new App({
  target
})

export default app
