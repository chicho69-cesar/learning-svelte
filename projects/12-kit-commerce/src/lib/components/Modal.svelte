<script lang='ts'>
  let hover = false
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	on:click|self
	class='absolute inset-0 z-50 flex items-start justify-center w-full h-screen p-8 bg-black/60'
>
	<div
		class='flex flex-col items-center justify-center w-full p-8 text-black bg-white rounded-md md:w-1/2 '
	>
		{#if $$slots.header}
			<div class='w-full p-2 pt-6 mb-6 bg-purple-100'>
				<slot name='header' />
			</div>
		{/if}

		<slot name='body'>
			<p class='mb-6 text-center'>
        Sorry, something must have gone wrong.
      </p>
		</slot>

		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div
			on:mouseenter={() => {
				hover = true
			}}
			on:mouseleave={() => {
				hover = false
			}}
		>
			<slot name='button' {hover}>
				<button on:click class='p-2 font-medium text-white uppercase bg-black rounded-md'>
          Close
        </button>
			</slot>
		</div>
	</div>
</div>
