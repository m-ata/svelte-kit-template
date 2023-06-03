<script lang="ts" type="module">
  import { _ } from "svelte-i18n";
  //custom imports
  import type { PaginationOption } from "$lib/types/data-table.type";
  //props
  export let handleItemChange: any;
  export let option: PaginationOption;
  const { amount, size } = option;
  //local variable
  let selectedItemsPerPage: number = amount[0];
  let total = size / selectedItemsPerPage;
  let currentPage: number = 1;

  const onItemChange = (event: Event) => {
    const target = event.target as HTMLSelectElement;
    const value = Number(target.value);
    handleItemChange(0, value);
    selectedItemsPerPage = value;
    total = size / selectedItemsPerPage;
  }
</script>

<div class="paginator-container">
  <div class="page-items">
    <span> {$_("_component.dataTable.pagination.itemsPerPage")} </span>
    <select value={selectedItemsPerPage} on:change={onItemChange}>
      {#each amount as item}
        <option value={item}> {item} </option>
      {/each}
    </select>
  </div>

  <div class="item-count">
    <span> {currentPage} / {Math.ceil(total)} </span>
  </div>

  <div class="pagination">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <i class="mi mi-chevron-double-left" on:click={handleItemChange}><span class="u-sr-only" /></i>
    <i class="mi mi-chevron-left"><span class="u-sr-only" /></i>
    <i class="mi mi-chevron-right"><span class="u-sr-only" /></i>
    <i class="mi mi-chevron-double-right"><span class="u-sr-only" /></i>
  </div>
</div>

<style lang="scss">
  @import "./style.scss";
</style>
