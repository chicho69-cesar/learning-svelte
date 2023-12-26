<script lang='ts'>
  // import '@github/g-emoji-element'

  import gitEmojisImport from '../assets/git_emojis.json'
  import { categoriesSelected } from '../store/categories'
  import { addToast } from '../store/toast'
  import type { EmojiList } from '../types.d'

  let gitEmojis: EmojiList = gitEmojisImport

  export let skinTone = 0
  export let emojiMode: 'code' | 'emoji' = 'code'
  export let searchQuery = ''

  categoriesSelected.subscribe((value) => {
    window.localStorage.setItem('categories_selected', value)
  })

  let categoriesSelectedArr: string[] = JSON.parse($categoriesSelected)
  let categories = Object.keys(gitEmojis)

  $: allCategoriesSelected = categoriesSelectedArr.length === categories.length
</script>

{#if searchQuery.length === 0}
  <div class='relative flex flex-wrap max-w-2xl mx-auto mb-10 font-medium text-white select-none w-fit place-content-evenly'>
    {#each categories as category (category)}
      <button
        class={
          `w-28 px-4 py-2 h-16 mx-1 my-3 rounded-xl transition-all 
          ${categoriesSelectedArr.includes(category)
            ? `translate-y-[4px] bg-indigo-400 dark:bg-pink-400 `
            : `bg-indigo-500 dark:bg-pink-500 [box-shadow:0_4px_0_0_#4f46e5] dark:[box-shadow:0_4px_0_0_#db2777]`
          }`
        }
        on:click={() => {
          if (categoriesSelectedArr.includes(category))
            categoriesSelectedArr = categoriesSelectedArr.filter(
              (e) => e !== category
            )
          else categoriesSelectedArr.push(category)

          $categoriesSelected = JSON.stringify(categoriesSelectedArr)
          categories = categories
        }}
      >
        {category}
      </button>
    {/each}

    {#if !allCategoriesSelected}
      <button
        class='absolute bottom-[-88px] lg:bottom-auto lg:right-0 lg:translate-x-[100%] w-28 px-4 py-2 h-16 my-3 rounded-xl transition-all font-medium bg-green-500 [box-shadow:0_4px_0_0_#16a34a]'
        on:click={() => {
          categoriesSelectedArr = categories
          $categoriesSelected = JSON.stringify(categoriesSelectedArr)
          categories = categories
        }}
      >
        Show all
      </button>
    {:else}
      <button
        class='absolute bottom-[-88px] lg:bottom-auto lg:right-0 lg:translate-x-[100%] w-28 px-4 py-2 h-16 my-3 rounded-xl transition-all font-medium bg-red-500 [box-shadow:0_4px_0_0_#dc2626]'
        on:click={() => {
          categoriesSelectedArr = []
          $categoriesSelected = JSON.stringify(categoriesSelectedArr)
          categories = categories
        }}
      >
        Hide all
      </button>
    {/if}
  </div>

  <div class='h-16 show-all-spacer lg:h-0' />
{/if}

<div class='max-w-3xl mx-auto'>
  {#each categories as category (category)}
    {#if categoriesSelectedArr.includes(category) || searchQuery.length > 0}
      {#if searchQuery.length === 0}
        <h2 class='text-2xl font-semibold' id={category}>
          <header>{category}</header>
        </h2>
      {/if}

      {#if category === 'Custom'}
        {#each Object.values(gitEmojis[category]) as emoji (emoji.name)}
          {#if emoji.name.constructor === String && emoji.fallback_url.constructor === String}
            {#if emoji.name.includes(searchQuery) || searchQuery.length === 0}
              <button
                class={`text-3xl w-1/4 md:w-auto font-emoji p-4 md:p-6 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl`}
                on:click={() => {
                  navigator.clipboard.writeText(`:${emoji.name}:`)
                  addToast('Copied!', emojiMode, `:${emoji.name}:`, 2000)
                }}
              >
                <img class='w-10' src={emoji.fallback_url} alt={emoji.name} />
              </button>
            {/if}
          {/if}
        {/each}
      {:else}
        {#each Object.keys(gitEmojis[category]) as subcategory (subcategory)}
          <div class='my-6'>
            {#if searchQuery.length === 0}
              <h3 class='ml-8 font-medium'>
                <header>
                  {subcategory.replaceAll('-', ' ').replace(/\w\S*/g, (txt) => {
                    return (
                      txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase()
                    )
                  })}
                </header>
              </h3>
            {/if}

            <div class='text-center'>
              {#each Object.entries(gitEmojis[category][subcategory]) as [slug, emoji] (slug)}
                {#if slug.includes(searchQuery) || emoji.name.includes(searchQuery) || searchQuery.length === 0}
                  <button
                    class={`text-3xl w-1/4 md:w-auto font-emoji p-4 md:p-6 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl`}
                    on:click={() => {
                      if (emojiMode === 'code') {
                        navigator.clipboard.writeText(`:${slug}:`)
                        addToast('Copied!', emojiMode, `:${slug}:`, 2000)
                      } else {
                        navigator.clipboard.writeText(emoji.emoji)
                        addToast('Copied!', emojiMode, emoji.emoji, 2000)
                      }
                    }}
                  >
                    <g-emoji tone={skinTone}>
                      {emoji.emoji}
                    </g-emoji>
                  </button>
                {/if}
              {/each}
            </div>
          </div>
        {/each}
      {/if}
    {/if}
  {/each}
</div>
