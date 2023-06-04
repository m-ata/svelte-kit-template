<script lang="ts">
  import { _ } from "svelte-i18n";
  import DataTable from "../../components/DataTable/DataTable.svelte";
  import { parseDateInputFormat } from "../../lib/utils/date-parser.util";
  import { stays } from "$lib/store/stay.store";
  import type { TStayResponse, TStayDataTable } from "$lib/types/stay.type";
  import { getColumns } from "$lib/utils/columns.util";
  const columns = ["Arrival Date", "Departure Date", "Description", "Persons", "Code"]
  let data: TStayDataTable[];
  stays.subscribe((stayList: TStayResponse[]) => {
    if (stayList?.length) {
      data = stayList?.map((stay: TStayResponse) => {
        const { startDate, endDate, stayDescription, numberOfFishers, code } =
          stay;
        return {
          startDate: parseDateInputFormat(startDate),
          endDate: parseDateInputFormat(endDate),
          stayDescription,
          numberOfFishers,
          code,
        } as TStayDataTable;
      });
    }
  });
</script>

<svelte:head>
  <title>{$_("_page.stay.title")}</title>
  <meta name="description" content="Welcome to stay" />
  <link rel="stylesheet" href="https://unpkg.com/mono-icons@1.0.5/iconfont/icons.css" >
</svelte:head>

<div>
  <DataTable columns={getColumns("stay")} bind:data />
</div>


