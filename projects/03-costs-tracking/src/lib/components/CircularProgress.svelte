<script>
  import { percentageFormatter } from '../helpers/formatters'
	
  export let progress

  $: angle = progress > 100 ? 360 : 360 * (progress / 100)
	$: background = `radial-gradient(white 50%, transparent 51%),
    conic-gradient(transparent 0deg ${angle}deg, gainsboro ${angle}deg 360deg),
    conic-gradient(#3b82f6 0deg, #3b82f6);`
	$: cssVarStyles = `--background:${background}`
</script>

<div id='progress-circle' style='{cssVarStyles}'>
	<p>
    {percentageFormatter(progress / 100)}
  </p>
</div>

<style>
  #progress-circle {
    background: var(--background);
    border-radius: 50%;
    width: 250px;
    height: 250px;
    transition: all 500ms ease-in;
    will-change: transform;
    display: grid;
    place-content: center;
  }
  
  p {
    color: #64748b;
    font-size: 3rem;
    font-weight: 900;
  }
</style>
