<script lang='ts'>
  export let value: string
  export let name: string
  export let placeholder: string
  export let label: string
</script>

<div class='flex flex-col w-full gap-1 mb-4'>
  <label for={name} class='w-full font-bold text-start'>
    {label}
  </label>
  
  <input
    type='text'
    name={name}
    id={name}
    placeholder={placeholder}
    bind:value
    class='inline-block w-full px-4 py-2 border border-gray-300 rounded outline-none'
  />
</div>
