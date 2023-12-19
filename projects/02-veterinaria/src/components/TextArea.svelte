<script>
  export let id
  export let label
  export let placeholder
  export let value
  export let onInput
</script>

<div class='w-full flex flex-col justify-start items-start gap-1 mb-4'>
  <label for={id} class='w-full font-medium text-base'>
    {label}
  </label>

  <textarea
    id={id}
    name={id}
    rows={3}
    autocomplete='off'
    placeholder={placeholder}
    bind:value={value}
    on:input={onInput}
    class='w-full border py-2 px-3 rounded-md border-gray-300 outline-none'
  />
</div>
