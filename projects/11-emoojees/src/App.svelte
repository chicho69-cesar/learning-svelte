<script lang='ts'>
  import EmojiCollection from './lib/EmojiCollection.svelte'
  import EmojiGuide from './lib/EmojiGuide.svelte'
  import Footer from './lib/Footer.svelte'
  import Header from './lib/Header.svelte'
  import Toasts from './lib/Toasts.svelte'

  let skinTone = 0
  let emojiMode: 'code' | 'emoji' = 'code'
  let searchQuery = ''
</script>

<main>
  <Toasts />

  <div class='min-h-screen'>
    <!-- Cuando tenemos props en un component hijo podemos hacer bind del valor de estas
    props, asi cuando en uno de los componentes hijos cambiamos el valor de esta prop,
    también se va a cambiar el valor de la variable en el componente padre y por ende
    lo cambiara en los demás componentes que también usen esta variable. -->
    <Header
      bind:skinTone
      bind:emojiMode
      bind:searchQuery
    />

    <div class='px-10'>
      {#if searchQuery.length === 0}
        <EmojiGuide bind:emojiMode />
      {/if}

      <EmojiCollection
        bind:skinTone
        bind:emojiMode
        bind:searchQuery
      />
    </div>
  </div>

  <Footer />
</main>
