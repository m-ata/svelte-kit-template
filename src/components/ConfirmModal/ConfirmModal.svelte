<script lang="ts" type="module">
  import type { ModalOptions } from "$lib/types/modal.type";
  export let modalOptions: ModalOptions;
</script>

<section class="modal" style={modalOptions?.style || ''}>
  {#if modalOptions?.heading || modalOptions.icon}
    <div class="header">
      <div class="row">
        <span>
          {#if modalOptions.icon}
            <img
              src={modalOptions.icon}
              width="50px"
              height="50px"
              alt="user"
            />
          {/if}

          <h2>{modalOptions.heading}</h2>
        </span>

        <button class="btn-close" on:click={modalOptions.onCancel}>⨉</button>
      </div>
      <div class="horizontal-line" />
    </div>
  {/if}

  <div>
    {@html modalOptions.content}
  </div>

  {#if modalOptions.confirmBtnText || modalOptions.cancelBtnText}
    <div class="footer">
      <div class="horizontal-line" />
      <div class="action-buttons">
        <button class="cancel" on:click={modalOptions.onCancel}>
          {modalOptions.cancelBtnText}
        </button>
        <button class="apply" on:click={modalOptions.onConfirm}>
          {modalOptions.confirmBtnText}
        </button>
      </div>
    </div>
  {/if}
</section>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="overlay" on:click={modalOptions.onCancel} />

<style lang="scss">
  @import "./style.scss";
</style>
