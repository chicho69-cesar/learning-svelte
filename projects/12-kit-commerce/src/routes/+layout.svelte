<script lang='ts'>
	import './styles.css'

	import { page } from '$app/stores'
	import ShoppingCart from '$lib/components/ShoppingCart.svelte'
	import Modal from '$lib/components/Modal.svelte'
	import cartItemsStore from '$lib/store/cart'

	console.log($page.data.product)

	let showCart = false
	let showModal = false
	let cartCount = 0

	$: cartItems = $cartItemsStore
	$: {
		cartCount = 0
		cartItems.forEach((item) => {
			cartCount += item.quantity
		})
	}

	const addItemToCart = (event: CustomEvent<any>) => {
		cartItems = [...cartItems, event.detail.item]
	}
</script>

<div>
	{#if showModal}
		<Modal
			on:click={() => {
				showModal = false
			}}
		>
			<span slot='body'>
				<p class='mb-6 text-center'>
					The whole store is 20% off!
				</p>
			</span>

			<span slot='button' let:hover={hovering}>
				<button
					on:click={() => {
						showModal = false;
					}}
					class='p-2 font-medium text-white uppercase bg-pink-500 rounded-md'
				>
					{hovering ? 'Close' : 'Awesome!'}
				</button>
			</span>
		</Modal>
	{/if}

	<div>
		<nav class='flex items-center p-4 border-b border-zinc-700 lg:px-6'>
			<div class='flex items-center justify-between w-full'>
				<div class='mr-4'>
					<a href='/' class=''>
						<picture>
							<source srcset='/svelte_logo.png' type='image/png' />
							<img src='/svelte_logo.png' alt='Svelte Logo' class='h-8' />
						</picture>
					</a>
				</div>

				<button
					on:click={() => {
						showCart = true;
					}}
					class='flex items-center text-white uppercase'
				>
					<h3>Cart</h3>

					<div
						class='flex items-center justify-center w-5 h-5 ml-2 text-xs font-bold text-black bg-white rounded-full'
					>
						{cartCount}
					</div>
				</button>
			</div>
		</nav>
	</div>

	<div class='relative'>
		{#if showCart}
			<ShoppingCart
				on:click={() => {
					showCart = false
				}}
				on:addItemToCart={addItemToCart}
			/>
		{/if}

		<slot />
	</div>
</div>
