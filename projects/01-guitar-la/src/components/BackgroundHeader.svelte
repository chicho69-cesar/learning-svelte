<header>
  <div class='content'>
    <slot />
  </div>
</header>

<style>
  header {
    position: relative;
    overflow: hidden;
  }
  
  .content {
    position: relative;    
    min-height: 30rem;
  }

  .content::before {
    content: ' ';
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background-image: url('/img/header.jpg');
    background-repeat: no-repeat;
    background-position: 50% 0;
    background-size: cover;
    background-color: black;
    z-index: -15;
  }

  .content::after {
    content: ' ';
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0.7;
    background-color: black;
    z-index: -10;
  }
</style>
