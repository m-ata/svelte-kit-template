<script lang="ts" type="module">
  // builtin imports
  import { _ } from "svelte-i18n";
  import { afterUpdate } from "svelte";

  //custom imports
  import type { PaginationOption } from "$lib/types/data-table.type";
  import { NEXT_PREV_TYPE } from "$lib/constants";

  //props
  export let handleItemChange: any;
  export let handleNextPrevious: any;
  export let option: PaginationOption;

  //local variable
  let selectedItemsPerPage: number = option.amount[0];

  const onItemChange = (event: Event) => {
    const target = event.target as HTMLSelectElement;
    const value = Number(target.value);
    handleItemChange(0, value, option.size / value, 1);
  };

  // updating option on afterUpdate
  afterUpdate(() => {
    option = { ...option };
  });

  // navigation (next, previous) change handler
  const onNavigationChange = (offset: number, type: string) => {
    switch (type) {
      case NEXT_PREV_TYPE.FIRST:
        handleNextPrevious(offset, 1);
        break;
      case NEXT_PREV_TYPE.PREVIOUS:
        handleNextPrevious(offset, option.page - 1);
        break;
      case NEXT_PREV_TYPE.NEXT:
        handleNextPrevious(offset, option.page + 1);
        break;
      case NEXT_PREV_TYPE.LAST:
        handleNextPrevious(offset, Math.ceil(option.total));
        break;
      default:
        handleNextPrevious(offset, 1);
        break;
    }
  };
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
    <span> {option.page} / {Math.ceil(option.total)} </span>
  </div>

  <div class="pagination">
    <button
      disabled={option.offset === 0}
      on:click={() => onNavigationChange(0, 'first')}
    >
      <i class="mi mi-chevron-double-left">
        <span class="u-sr-only" />
      </i>
    </button>
    <button
      disabled={option.offset === 0}
      on:click={() => onNavigationChange(option.offset - option.limit, 'previous')}
    >
      <i class="mi mi-chevron-left">
        <span class="u-sr-only" />
      </i>
    </button>
    <button
      disabled={option.offset + option.limit >= option.size}
      on:click={() => onNavigationChange(option.offset + option.limit, 'next')}
    >
      <i class="mi mi-chevron-right">
        <span class="u-sr-only" />
      </i>
    </button>
    <button
      disabled={option.offset + option.limit >= option.size}
      on:click={() =>
        onNavigationChange(
          option.size -
            (option.size % option.limit === 0
              ? option.limit
              : option.size % option.limit), 'last'
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
