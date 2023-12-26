<script lang='ts'>
  import { onMount } from 'svelte'

  import { mode } from '../store/mode'
  import { theme } from '../store/theme'
  import { tone } from '../store/tone'

  theme.subscribe((value) => {
    window.localStorage.setItem('theme', value)
  })

  $: if ($theme === 'dark') document.documentElement.classList.add('dark')
  else document.documentElement.classList.remove('dark')

  tone.subscribe((value) => {
    window.localStorage.setItem('tone', value)
  })

  mode.subscribe((value) => {
    window.localStorage.setItem('mode', value)
  })

  let subtitleElement$: HTMLElement
  let searchElement$: HTMLElement

  export let skinTone = 0
  export let searchQuery = ''
  export let emojiMode = 'code'

  onMount(() => {
    subtitleElement$ = document.getElementById('subtitle')!
    searchElement$ = document.getElementById('search')!

    emojiMode = $mode
  })

  document.addEventListener('keydown', (e) => {
    if (e.key === ' ' && searchQuery.length === 0) return
    if (e.key.match(/^([a-zA-Z ]|Backspace)$/) === null) return
    
    searchElement$.focus()
  })

  document.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
      subtitleElement$.classList.add('max-h-0')
      subtitleElement$.classList.add('scale-y-0')

      subtitleElement$.classList.remove('max-h-6')
    } else {
      subtitleElement$.classList.remove('max-h-0')
      subtitleElement$.classList.remove('scale-y-0')

      subtitleElement$.classList.add('max-h-6')
    }
  })
</script>

<div class='shadow sticky z-10 top-0 py-4 px-6 bg-white flex mb-12 dark:bg-[#020617] dark:text-slate-200 flex-col md:flex-row'>
  <div class='flex flex-row'>
    <button
      class='flex flex-row items-center mr-2 md:mr-6'
      aria-label='Cycle emoji skin tones'
      on:click={() => {
        skinTone = (skinTone + 1) % 6
        tone.set('' + skinTone)
      }}
    >
      <g-emoji class='w-10 h-10 pt-1 text-2xl md:text-4xl' tone={skinTone}>
        {[
          '👶',
          '🧒',
          '👦',
          '👧',
          '🧑',
          '👱',
          '👨',
          '🧔',
          '👩',
          '🧓',
          '👴',
          '👵',
        ][Math.floor(Math.random() * 11)]}
      </g-emoji>
    </button>

    <div class='flex flex-col'>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
      <h1
        class='text-2xl font-semibold md:text-3xl'
        on:click={() => {
          searchQuery = ''
          window.scroll(0, 0)
        }}
      >
        <a href='/'>emoojees</a>
      </h1>

      <p
        id='subtitle'
        class='text-md overflow-hidden max-h-6 transition-[max-height] duration-300 ease-in-out'
      >
        Porque los emojis son importantes
      </p>
    </div>
  </div>

  <div class='flex flex-row items-center h-10 p-2 mx-auto mt-4 rounded-md w-fit ring-2 ring-indigo-500 dark:ring-pink-500 md:m-auto'>
    <input
      id='search'
      class='focus:outline-none bg-[rgba(0,0,0,0)] focus:border-none'
      bind:value={searchQuery}
      type='text'
      autocomplete='off'
      placeholder='Buscar...'
      aria-label='Search for emojis'
    />
    <p>🔍</p>
  </div>

  <div class='flex flex-row mt-4 justify-evenly md:my-auto'>
    <button
      class='flex flex-row items-center justify-center md:justify-end min-w-[100px]'
      aria-label='Toggle emoji copy mode'
      on:click={() => {
        emojiMode = emojiMode === 'emoji' ? 'code' : 'emoji'
        mode.set(emojiMode)
      }}
    >
      <!-- La etiqueta especial @html nos permite renderizar elementos html en base
      a cadenas de caracteres. -->
      <p class='mr-0 text-center'>
        {@html emojiMode === 'emoji'
          ? '📎'
          : `<span class='p-1 bg-gray-200 rounded dark:text-slate-200 dark:bg-slate-700'>:paperclip:</span>`}
      </p>
    </button>

    <button
      aria-label='Toggle dark mode'
      class='ml-2 mr-2 text-2xl text-center w-9 h-9 md:ml-4'
      on:click={() => {
        $theme === 'light' ? theme.set('dark') : theme.set('light')
      }}
    >
      {$theme === 'light' ? '☀️' : '🌙'}
    </button>

    <button
      aria-label='Scroll to top'
      class='mx-2 text-3xl'
      on:click={() => {
        window.scroll(0, 0)
      }}
      >🔝
    </button>

    <a
      href='https://github.com/chicho69-cesar/learning-svelte '
      class='my-auto ml-4 h-fit'
    >
      <svg
        class='fill-slate-800 dark:fill-slate-200 w-9 h-9'
        viewBox='0 0 100 100'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          fill-rule='evenodd'
          clip-rule='evenodd'
          d='M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z'
        />
      </svg>
    </a>
  </div>
</div>
