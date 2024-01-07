<script lang='ts'>
  import { fade } from 'svelte/transition'
  import { flip } from 'svelte/animate'
  import cartItemsStore from '$lib/store/cart'
	import type { Product } from '$lib/types/product'

  let cartItems: Product[]
  let newItem: Product = {
		name: 'T-Shirt',
		src: 'https://cdn.shopify.com/s/files/1/0434/0285/4564/products/Front-NoModel_ec3be051-d579-4c03-b55b-64449d0b0445.png?v=1623255893',
		price: '$80.00',
		quantity: 1
	}

  cartItemsStore.subscribe((value) => {
    cartItems = value
  })

  const shuffle = (i: number) => {
    let element = cartItems[i]
    cartItems.splice(i, 1)
    cartItems.splice(0, 0, element)
  }

  const addOne = (i: number) => {
    shuffle(i)
    cartItems[i].quantity = cartItems[i].quantity + 1
  }

  const removeOne = (i: number) => {
    shuffle(i)
    cartItems[i].quantity = cartItems[i].quantity - 1
  }

  const addItemToCart = () => {
    cartItemsStore.update((currentData) => {
      return [newItem, ...currentData]
    })
  }
</script>

<div
	transition:fade
	class='absolute inset-0 z-50 flex justify-end w-full max-h-screen overflow-hidden bg-black/50'
>
	<div class='z-50 w-full p-6 bg-black lg:w-1/3 md:w-1/2'>
		<div class='flex items-center justify-between w-full mb-6'>
			<h3 class='text-2xl font-medium'>
        My Cart
      </h3>

			<button on:click class='text-sm uppercase opacity-80 hover:opacity-100'>
        close
      </button>
		</div>

		<div class='flex items-center justify-between px-6 py-1 mb-4 bg-zinc-900'>
			<div class='relative flex items-center'>
				<img
          src={newItem.src}
          class='h-10 mr-2 bg-white'
          alt='cup'
        />

				<p class='font-medium uppercase'>
          {newItem.name}
        </p>

				<p
					class='absolute top-0 left-0 flex items-center justify-center px-1 py-px -ml-4 font-medium text-black bg-white rounded-full'
					style='font-size: 10px;'
				>
					NEW!
				</p>
			</div>

			<button
				on:click={addItemToCart}
				class='p-1 text-xs font-medium text-black uppercase bg-white/90'
			>
				Add to Cart
			</button>
		</div>

		{#if cartItems.length === 0}
			<div class='flex flex-col items-center justify-center w-full mt-20 overflow-hidden'>
				<div class='flex items-center justify-center w-16 h-16 bg-white rounded-full' />

        <p class='mt-6 text-2xl font-bold text-center'>
          Your cart is empty.
        </p>
			</div>
		{/if}

		<div class='overflow-y-auto' style='height: 60%;'>
			{#each cartItems as item, i (item.name)}
				<div animate:flip>
					<div class='flex w-full mb-2'>
						<img
              class='flex-none w-20 bg-white'
              src={item.src}
              alt={item.name}
            />

						<div class='flex flex-col justify-between w-full ml-4'>
							<div class='flex justify-between w-full'>
								<di>
									<p class='text-lg font-medium'>{item.name}</p>
								</di>

								<p class='font-medium'>{item.price}</p>
							</div>
						</div>
					</div>

					<div class='flex w-full mb-4'>
						<div class='flex w-full h-8 border border-white/40'>
							<p class='flex items-center h-full px-2 '>
								{item.quantity}
							</p>

							<button
								on:click={() => {
									removeOne(i);
								}}
								class='flex items-center justify-center w-8 h-8 ml-auto border-l border-white/40 bg-white/0 hover:bg-white/10'
							>
								-
							</button>

							<button
								on:click={() => {
									addOne(i);
								}}
								class='flex items-center justify-center w-8 h-8 border-l border-white/40 bg-white/0 hover:bg-white/10'
							>
								+
							</button>
						</div>
					</div>
				</div>
			{/each}
		</div>

		{#if cartItems.length !== 0}
			<button
				class='flex items-center justify-center w-full p-3 mt-8 text-sm font-medium text-black uppercase bg-white opacity-90 hover:opacity-100'
			>
				<span>Proceed to Checkout</span>
			</button>
		{/if}
	</div>
</div>
