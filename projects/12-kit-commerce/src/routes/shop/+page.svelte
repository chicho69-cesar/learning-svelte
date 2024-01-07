<script lang='ts'>
  import GridTile from '$lib/components/GridTile.svelte'
	import type { Product } from '$lib/types/product'

  let displayedProducts: Omit<Product, 'quantity'>[] = [
		{
			name: 'Cup',
			src: 'https://cdn.shopify.com/s/files/1/0434/0285/4564/products/Cup-front-black.png?v=1623159405',
			price: '$10.00'
		},
		{
			name: 'Quarter Zip',
			src: 'https://cdn.shopify.com/s/files/1/0434/0285/4564/products/QZSide-Model.png?v=1623256247',
			price: '$30.00'
		},
		{
			name: 'Sticker',
			src: 'https://cdn.shopify.com/s/files/1/0434/0285/4564/products/Sticker-mock.png?v=1623256356',
			price: '$8.00'
		}
	]
</script>

<div>
	<ul class="grid grid-flow-row grid-cols-2 gap-4 md:grid-cols-3">
		{#each displayedProducts as product, i (product.src)}
			<li>
				<div>
					<GridTile {product} />
				</div>
			</li>
		{/each}
	</ul>
</div>