<script>
  import { blur } from "svelte/transition";

  export let data;
  let tick = 0
  $: index = tick % data.images.length

  setInterval(() => { tick++ }, 15 * 60_000)
</script>

<svelte:head>
  {#each data.images as img, i}
  <link rel="prefetch" href={img.urls.full}>
  {/each}
</svelte:head>

<div class="container">
  {#each data.images as img, i}
    {#if i == index}
      <img transition:blur="{{duration: 1000}}" src={img.urls.full} />
    {/if}
  {/each}
</div>

<button
  on:click={() => document.documentElement.requestFullscreen()}
>⤢</button>

<style>
  :global(html), :global(body) {
    padding: 0;
    margin: 0;
  }
  .container {
    overflow: hidden;
    width: 100vw;
    height: 100vh;
    position: relative;
  }
  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    object-fit: cover;
    object-position: center;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }
  button {
    position: fixed;
    bottom: 1rem;
    right: 1rem;
    background: transparent;
    border: none;
    font-size: 2rem;
    color: white;
  }
</style>
