<script lang="ts">
  import { _ } from "svelte-i18n";
  import spinner from "$lib/images/gifs/spinner.svg";

  export let buttonText: string = "";
  export let icon: string = "";
  export let clickHandler: any;
  export let isLoading: boolean = false;
</script>

<button on:click={clickHandler}>
  {#if isLoading}
    <div class="loader">
      <img src={spinner} alt="spinner" />
    </div>
  {:else}
    <span>
      {#if icon}
        <img src={icon} alt="icon" />
      {/if}
      {buttonText}
    </span>
  {/if}
</button>

<style lang="scss">
  button {
    background-color: rgb(0, 84, 166);
    border: none;
    color: #ffffff;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.1px;
    font-weight: 600px;
    padding: 8px 12px;
    text-align: center;
    text-decoration: none;
    display: inline-flex;
    justify-content: center;
    font-size: 16px;
    margin: 4px 0px;
    cursor: pointer;
    border-radius: 6px;
    white-space: nowrap;
    min-width: 100px;

    &:hover {
      background-color: rgb(0, 67, 133);
      box-shadow: none;
      text-decoration: none;
    }

    img {
      width: 25px;
      height: 25px;
      color: white;
    }
  }
</style>
