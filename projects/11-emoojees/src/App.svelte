<script lang='ts'>
  import EmojiCardCollection from './lib/EmojiCollection.svelte'
  import EmojiGuide from './lib/EmojiGuide.svelte'
  import Footer from './lib/Footer.svelte'
  import Header from './lib/Header.svelte'
  import Toasts from './lib/Toasts.svelte'

  let skin_tone = 0
  let emoji_mode: 'code' | 'emoji' = 'code'
  let search_query = ''
</script>

<main>
  <Toasts />

  <div class='min-h-screen'>
    <Header
      bind:skin_tone
      bind:emoji_mode
      bind:search_query
    />
    
    <div class='px-10'>
      {#if search_query.length === 0}
        <EmojiGuide bind:emoji_mode />
      {/if}

      <EmojiCardCollection
        bind:skin_tone
        bind:emoji_mode
        bind:search_query
      />
    </div>
  </div>
  
  <Footer />
</main>
