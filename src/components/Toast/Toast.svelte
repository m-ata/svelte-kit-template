<script>
  import { createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";
  import SuccessIcon from "./../../lib/images/success.png";
  import WarningIcon from "./../../lib/images/warning.png";
  import ErrorIcon from "./../../lib/images/error.webp";
  import CloseIcon from "./../../lib/images/close.jpeg";

  const dispatch = createEventDispatcher();

  export let type = "success";
  export let dismissible = true;
</script>

<article class={type} role="alert" transition:fade>
  {#if type === "success"}
    <img src={SuccessIcon} alt="Success" />
  {:else if type === "error"}
    <img src={ErrorIcon} alt="Error" />
    {:else if type === "warning"}
    <img src={WarningIcon} alt="Warning" />
  {/if}

  <div class="text">
    <slot />
  </div>

  {#if dismissible}
    <button class="close" on:click={() => dispatch("dismiss")}>
      <img src={CloseIcon} alt="Welcome" />
    </button>
  {/if}
</article>

<style lang="scss">
  @import './styles.scss';
</style>
