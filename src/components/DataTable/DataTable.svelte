<script lang="ts" type="module">
  import { browser } from "$app/environment";
  import { tableA11y } from "@skeletonlabs/skeleton";
  import { _ } from "svelte-i18n";
  //custom imports
  import type { PaginationOption } from "$lib/types/data-table.type";
  import Pagination from "../Pagination/Pagination.svelte";
  export let columns: any[];
  export let data: any[];

  export let paginationOption: PaginationOption = {
    offset: 0,
    limit: 10,
    size: data?.length || 0,
    page: 1,
    total: data?.length / 10,
    amount: [10, 25, 50],
  };
  let filteredData: any[];

  $: handleResetData(data);

  const handleResetData = (data: any) => {
    handleFilterData(0, 10);
    paginationOption = {
      offset: 0,
      limit: 10,
      size: data?.length || 0,
      page: 1,
      total: data?.length / 10,
      amount: [10, 25, 50],
    };
  };

  const handleFilterData = (offset: number, limit: number) => {
    filteredData = data?.slice(offset, limit);
  };
  // handling sort w.r.t column and sort type
  const handleSort = (field: string, type: string) => {
    type === "desc"
      ? filteredData.sort((a, b) => (a[field] < b[field] ? 1 : -1))
      : filteredData.sort((a, b) => (a[field] > b[field] ? 1 : -1));
    filteredData = [...filteredData];
  };

  // reset all columns sort
  const allSortedColumnsInActive = () => {
    columns.forEach((column) => {
      if (column?.sort?.hasOwnProperty("isSortActive"))
        column.sort.isSortActive = false;
    });
    columns = [...columns];
  };

  const handleItemChange = (
    offset: number,
    limit: number,
    total: number,
    page: number
  ) => {
    paginationOption.limit = limit;
    paginationOption = { ...paginationOption, limit, offset, total, page };
    handleFilterData(offset, limit);
  };

  // handling previous and next
  const handleNextPrevious = (offset: number, page: number) => {
    const { limit } = paginationOption;
    handleFilterData(offset, offset + limit);
    paginationOption = { ...paginationOption, offset, page };
  };
</script>

{#if browser}
  <div style="width: 100%">
    <div class="table-container">
      <table class="table" role="grid" use:tableA11y>
        <thead>
          <tr>
            {#each columns as column}
              <th
                data-sort={column.field}
                class={`${column?.sort?.isSortable ? "cursor-pointer" : ""}`}
                on:click={() => {
                  handleSort(column.field, column.sort.sortType);
                  if (column.sort.sortType === "asc") {
                    column.sort.sortType = "desc";
                  } else {
                    column.sort.sortType = "asc";
                  }
                  allSortedColumnsInActive();
                  column.sort.isSortActive = true;
                  columns = [...columns];
                }}
              >
                {#if column?.sort?.isSortable}
                  <i
                    class={`mi ${
                      column.sort.sortType === "asc"
                        ? "mi-arrow-up"
                        : "mi-arrow-down"
                    } ${column.sort.isSortActive ? "display-unset" : ""}`}
                  >
                    <span class="u-sr-only" />
                  </i>
                {/if}
                {$_(column.name)}
              </th>
            {/each}
          </tr>
        </thead>
        <tbody>
          {#if filteredData?.length}
            {#each filteredData as row, rowIndex}
              <tr aria-rowindex={rowIndex + 1}>
                {#each columns as column}
                  <td>{row[column.field]}</td>
                {/each}
              </tr>
            {/each}
          {/if}
        </tbody>
      </table>
    </div>
    <Pagination
      option={paginationOption}
      {handleItemChange}
      {handleNextPrevious}
    />
  </div>
{/if}

<style lang="scss">
  @import "./style.scss";
</style>
