<script lang='ts'>
  import { slide } from 'svelte/transition'
  import { IconCircleCheck, IconCircleX, IconX } from '@tabler/icons-svelte'
  
  import { notificationStore } from '../stores/notifications.store'
</script>

<div
  aria-live='assertive'
  class='fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:items-start sm:p-6'
>
  <div class='flex flex-col items-center w-full space-y-4 sm:items-end'>
    {#if $notificationStore.isShown}
      <div
        transition:slide
        class='w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-lg pointer-events-auto ring-1 ring-black ring-opacity-5'
      >
        <div class='p-4'>
          <div class='flex items-start'>
            <section class='flex-shrink-0'>
              {#if $notificationStore.isError}
                <IconCircleX class='w-6 h-6 text-red-400' />
              {:else}
                <IconCircleCheck class='w-6 h-6 text-green-400' />
              {/if}
            </section>

            <section class='ml-3 w-0 flex-1 pt-0.5'>
              <p class='text-sm font-medium text-gray-900 uppercase'>Notificación</p>
              <p class='mt-1 text-sm text-gray-500'>{$notificationStore.text}</p>
            </section>

            <section class='flex flex-shrink-0 ml-4'>
              <button
                type='button'
                on:click={() => notificationStore.hide()}
                class='inline-flex text-gray-400 bg-white rounded-md hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
              >
                <span class='sr-only'>Close</span>
                <IconX class='w-5 h-5' />
              </button>
            </section>
          </div>
        </div>
      </div>
    {/if}
  </div>
</div>
