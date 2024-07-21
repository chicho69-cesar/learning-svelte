<script>
  // +layout.ts
  // console.log('I work on the server the first load, and then the client on every request')

  // +layout.server.ts
  // console.log('This works on the server the first request and then the client for every nav')
</script>

<main>
  <p>
    Nested Layout
  </p>

  <slot />
</main>
