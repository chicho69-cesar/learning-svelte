<script>
  export let type = 'error'
  export let message
</script>

<p class={`
  w-full mt-8 py-2 text-center font-bold text-white rounded
  ${type === 'error' ? 'bg-red-600': 'bg-green-600'}
`}>
  {message}
</p>
