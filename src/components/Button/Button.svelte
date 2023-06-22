<script lang="ts">
  import { _ } from "svelte-i18n";
  export let buttonText: string = "";
  export let icon: string = "";
  export let clickHandler: any;
</script>

<button on:click={clickHandler}> 
    {#if icon}
        <img src={icon} alt="icon" />
    {/if}
     {buttonText} </button>

<style lang="scss">
  button {
    background-color: #2196F3;
    border: none;
    color: white;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 0px;
    cursor: pointer;
    border-radius: 5px;
    float: right;

    img {
        width: 25px;
        height: 25px;
        color: white;
    }
  }
</style>
