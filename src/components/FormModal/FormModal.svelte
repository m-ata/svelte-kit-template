<script lang="ts" type="module">
  import type { FormModalOptions } from "$lib/types/modal.type";
  export let modalOptions: FormModalOptions;
</script>

<section class="modal">
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

  <div class="content">
    <form on:submit={modalOptions.onApply}>
      {#each modalOptions.form as form}
        {#if form.type === "inputText"}
          <div class="form-group">
            <label > { form.label } </label>
            <input class="text" type="text" value={form.value} name={form.field} />
          </div>
        {/if}
        
        {#if form.type === "password"}
          <div class="form-group">
            <label > { form.label } </label>
            <img alt="icon" src={form.icon} />
            <input type="password" value={form.value} name={form.field} />
          </div>
        {/if}

        {#if form.type === "email"}
          <div class="form-group">
            <label > { form.label } </label>
            <img alt="icon" src={form.icon} />
            <input type="email" value={form.value} name={form.field} />
          </div>
        {/if}
        {#if form.type === "phone"}
        <div class="form-group">
          <label > { form.label } </label>
          <img alt="icon" src={form.icon} />
          <input type="tel" value={form.value} name={form.field} />
        </div>
        {/if}
        
        {#if form.type === "date"}
        <div class="form-group">
          <label > { form.label } </label>
          <input class="date" type="date" value={form.value} name={form.field} />
        </div>
        {/if}
        
        {#if form.type === "select"}
        <div class="form-group">
          <label > { form.label } </label>
          {#if form.options && form.options.length > 0}
          <select class="select" value={form.value}>
            {#each form.options as option}
              <option>
                {option.label}
              </option>
            {/each}
          </select>
          {/if}
        </div>
        {/if}
      {/each}

      {#if modalOptions.confirmBtnText || modalOptions.cancelBtnText}
        <div class="footer">
          <div class="horizontal-line" />
          <div class="action-buttons">
            <button class="cancel" on:click={modalOptions.onCancel}>
              {modalOptions.cancelBtnText}
            </button>
            <button class="apply" type="submit" name="submit">
              {modalOptions.confirmBtnText}
            </button>
          </div>
        </div>
      {/if}
    </form>
  </div>
</section>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="overlay" on:click={modalOptions.onCancel} />

<style lang="scss">
  @import "./style.scss";
</style>
