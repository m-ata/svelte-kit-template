<script lang="ts" type="module">
  import { _ } from "svelte-i18n";
  import { afterUpdate } from "svelte";
  //custom imports
  import type { PaginationOption } from "$lib/types/data-table.type";
  //props
  export let handleItemChange: any;
  export let handleNextPrevious: any;
  export let option: PaginationOption;
  //local variable
  let selectedItemsPerPage: number = option.amount[0];
  let total = option.size / selectedItemsPerPage;
  let currentPage: number = 1;

  const onItemChange = (event: Event) => {
    const target = event.target as HTMLSelectElement;
    const value = Number(target.value);
    handleItemChange(0, value);
    selectedItemsPerPage = value;
    total = option.size / selectedItemsPerPage;
  };

  // updating option on afterUpdate
  afterUpdate(() => {
    option = { ...option };
  });
</script>

<div class="paginator-container">
  <div class="page-items">
    <span> {$_("_component.dataTable.pagination.itemsPerPage")} </span>
    <select value={selectedItemsPerPage} on:change={onItemChange}>
      {#each option.amount as item}
        <option value={item}> {item} </option>
      {/each}
    </select>
  </div>

  <div class="item-count">
    <span> {currentPage} / {Math.ceil(total)} </span>
  </div>

  <div class="pagination">
    <button
      disabled={option.offset === 0}
      on:click={() => handleNextPrevious(0)}
    >
      <i class="mi mi-chevron-double-left">
        <span class="u-sr-only" />
      </i>
    </button>
    <button
      disabled={option.offset === 0}
      on:click={() =>
        handleNextPrevious(
          option.offset - option.limit
        )}
    >
      <i class="mi mi-chevron-left">
        <span class="u-sr-only" />
      </i>
    </button>
    <button
      disabled={option.offset + option.limit >= option.size}
      on:click={() =>
        handleNextPrevious(option.offset + option.limit)}
    >
      <i class="mi mi-chevron-right">
        <span class="u-sr-only" />
      </i>
    </button>
    <button
      disabled={option.offset + option.limit >= option.size}
      on:click={() =>
        handleNextPrevious(
          option.size -
            (option.size % option.limit === 0
              ? option.limit
              : option.size % option.limit),
        )}
    >
      <i class="mi mi-chevron-double-right">
        <span class="u-sr-only" />
      </i>
    </button>
  </div>
</div>

<style lang="scss">
  @import "./style.scss";
</style>
