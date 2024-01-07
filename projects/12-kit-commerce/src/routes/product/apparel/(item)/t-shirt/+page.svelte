<script lang='ts'>
  import GridTile from '$lib/components/GridTile.svelte'
  import Modal from '$lib/components/Modal.svelte'
	import type { ProductWithDescription } from '$lib/types/product'

  let showModal = false
	let product: ProductWithDescription = {
		name: 'T-shirt',
		price: '$40',
		quantity: 1,
		src: 'https://cdn.shopify.com/s/files/1/0434/0285/4564/products/Front-NoModel_ec3be051-d579-4c03-b55b-64449d0b0445.png?v=1623255893',
		description: 'This is a really soft t-shirt. You should buy it.'
	}
</script>

<div>
	{#if showModal}
		<Modal
			on:click={() => {
				showModal = false
			}}
		>
			<span slot='header'>
				<div class='mb-4 font-bold text-center uppercase'>This item is on sale!</div>
			</span>
      
			<span slot='body'>
				<div class='mb-4'>
					{product.name} is on sale! It is only {product.price}
				</div>
			</span>
      
			<span slot='button'>
				<button
					on:click={() => {
						showModal = false
					}}
					class='p-2 font-medium text-white uppercase bg-pink-500 rounded-md'
        >
          Awesome!</button>
			</span>
		</Modal>
	{/if}
  
	<div class='flex flex-col md:flex-row'>
		<div class='md:w-2/3 md:h-90'>
			<div class='relative h-4/5 bg-violet-700'>
				<GridTile {product} />
			</div>
		</div>
    
		<div class='h-full p-6 text-xl md:w-1/3'>
			<p class=''>{product.description}</p>
			
      <button class='w-full p-2 mt-6 text-base font-medium text-black uppercase bg-white'>
				Add To Cart
			</button>
		</div>
	</div>
</div>
