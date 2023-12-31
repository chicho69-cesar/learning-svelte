<div class='w-full min-h-screen image-background -z-50'>
  <div class='min-h-screen bg-black/70 -z-40'>
    <main class='w-5/6 mx-auto md:w-2/3'>
      <slot />
    </main>
  </div>
</div>

<style>
  .image-background {
    background-image: url('/background.webp');
    background-position: bottom center;
    background-repeat: no-repeat;
    background-size: cover;
  }
</style>
