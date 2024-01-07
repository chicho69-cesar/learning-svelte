<script lang='ts'>
	import type { Product } from '$lib/types/product'
  import cartItemsStore from '$lib/store/cart'

  export let product: Product = {
		name: 'No product provided',
		src: 'https://img.icons8.com/ios/500/no-image.png',
		price: '$0',
		quantity: 1
	}

  const addToCart = () => {
    cartItemsStore.update((currentData) => {
      return [product, ...currentData]
    })
  }
</script>

<div class='relative h-[50vh] w-full bg-indigo-600 overflow-hidden mb-4'>
	<a
		href={`/product/${product.name.toLowerCase()}`}
		data-sveltekit-prefetch
		class='flex items-center justify-center w-full h-full'
	>
		<img
			src={product.src}
			class='flex-none max-h-full transition duration-300 ease-in-out'
			alt={product.name}
		/>

		<div class='absolute top-0 left-0 text-white'>
			<p class='p-3 text-2xl font-medium bg-black'>
        {product.name}
      </p>

			<p class='p-3 text-sm bg-black w-fit'>
        {product.price}
      </p>
		</div>
	</a>

	<div class='absolute bottom-0 w-full p-6'>
		<button on:click={addToCart} class='w-full p-3 bg-black'>
			{' '}Add To Cart{' '}
		</button>
	</div>
</div>
