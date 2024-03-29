<script lang="ts" type="module">
  import { browser } from "$app/environment";
  import { _ } from "svelte-i18n";
  //custom imports
  import type { PaginationOption } from "$lib/types/data-table.type";
  import Pagination from "../Pagination/Pagination.svelte";
  import arrowUp from "$lib/images/icons/arrow-up.svg";
  import arrowDown from "$lib/images/icons/arrow-down.svg";
  import noData from "$lib/images/icons/no-data.svg";
  import { parseDateInputFormat } from "$lib/utils/date-parser.util";
  import tableLoader from "$lib/images/gifs/table-loader.svg";
  import { loading } from "$lib/store/data-loader.store";
  // props
  export let columns: any[];
  export let data: any[];
  export let clickHandlers: any = {};
  export let paginationOption: PaginationOption = {
    offset: 0,
    limit: 10,
    size: data?.length || 0,
    page: 1,
    total: data?.length / 10,
    amount: [10, 25, 50],
  };
  export let isLoading: boolean = false;
  // component state
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
  <div class="container">
    {#if JSON.parse($loading) && !filteredData.length}
      <div class="loader">
        <img src={tableLoader} alt="table-loader" />
      </div>
    {/if}
    <div class="table-container">
      <table class="table" role="grid">
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
                  <img
                    src={column.sort.sortType === "asc" ? arrowUp : arrowDown}
                    alt="sort-icon"
                    class={column.sort.isSortActive ? "display-unset" : ""}
                  />
                {/if}
                <span>
                  {$_(column.name)}
                </span>
              </th>
            {/each}
          </tr>
        </thead>
        <tbody>
          {#if filteredData?.length}
            {#each filteredData as row, rowIndex}
              <tr aria-rowindex={rowIndex + 1}>
                {#each columns as column}
                  <td>
                    <div>
                      {#if column?.type === "text"}
                        <span> {row[column.field]} </span>
                      {/if}
                      {#if column?.type === "date"}
                        <span> {parseDateInputFormat(row[column.field])} </span>
                      {/if}
                      {#if column?.type === "checkbox"}
                        <input
                          class="checkbox"
                          checked={row[column.field]}
                          type="checkbox"
                          on:change={(event) =>
                            clickHandlers.selection(row, event?.target)}
                        />
                      {/if}
                      {#if column?.type === "icon-buttons"}
                        {#each column.buttons as button}
                          <button
                            type="button"
                            class={`icon ${button.type}`}
                            on:click={clickHandlers[button.type](row)}
                          >
                            <img src={button.icon} alt={button.type} />
                          </button>
                        {/each}
                      {/if}
                    </div>
                  </td>
                {/each}
              </tr>
            {/each}
          {/if}
        </tbody>
      </table>
      {#if filteredData?.length === 0 && !JSON.parse($loading)}
        <div class="no-data">
          <img src={noData} alt="no-data" />
          <span> {$_("_common.noDataFound")} </span>
        </div>
      {/if}
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
