<script lang='ts'>
  import { getContext } from 'svelte'
	import type { Product } from '$lib/types/product'

  let items: Product[] = getContext('newItemsContext')
</script>

<div class='flex items-center'>
	{#each items as item}
		<div
			class='relative flex items-center justify-center w-1/2 h-40 m-2 overflow-hidden bg-white/20'
		>
			<img
        src={item.src}
        class='h-full'
        alt={item.name}
      />

			<div class='absolute bottom-0 right-0 p-2 bg-black'>
				{item.name}
			</div>
		</div>
	{/each}
</div>
