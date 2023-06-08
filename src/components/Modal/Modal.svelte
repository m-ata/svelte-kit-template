<script lang="ts" type="module">
  import type { ModalOptions } from "$lib/types/modal.type";
  export let modalOptions: ModalOptions;
</script>

<section class="modal">
  <div class="header">
    <div class="row">
      <span>
        {#if modalOptions.icon}
          <img src={modalOptions.icon} width="50px" height="50px" alt="user" />
        {/if}

        <h2>{modalOptions.heading}</h2>
      </span>

      <button class="btn-close" on:click={modalOptions.onCancel}>⨉</button>
    </div>
    <div class="horizontal-line" />
  </div>

  <div>
    {@html modalOptions.content}
  </div>

  <div class="footer">
    <div class="horizontal-line" />
    <div class="action-buttons">
      <button class="cancel" on:click={modalOptions.onCancel}> {modalOptions.cancelText} </button>
      <button class="apply" on:click={modalOptions.onApply}> {modalOptions.applyText} </button>
    </div>
  </div>
</section>

<div class="overlay" />

<style lang="scss">
  @import "./style.scss";
</style>
