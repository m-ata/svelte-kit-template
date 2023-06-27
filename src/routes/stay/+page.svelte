<script lang="ts">
  import { _ } from "svelte-i18n";
  import { onMount } from "svelte";
  //custom imports
  import DataTable from "../../components/DataTable/DataTable.svelte";
  import { stays } from "$lib/store/stay.store";
  import type { TStay, TStayDataTable } from "$lib/types/stay.type";
  import { getColumns } from "$lib/utils/columns.util";
  import Modal from "../../components/ConfirmModal/ConfirmModal.svelte";
  import type { ModalOptions } from "$lib/types/modal.type";
  import { DELETE_API } from "$lib/constants";
  import { stayApiHandler } from "$lib/api/stay";
  import { fetchData } from "$lib/api/api";

  // fetching data on onMount
  onMount(async () => {
    fetchData(true);
  });
  //component states
  let data: TStay[] = $stays;
  let selectedStay: TStayDataTable | null;
  let isDeleteStayModalOpen: boolean = false;

  stays.subscribe(
    (stayList: TStay[]) => (data = stayList?.map((stay: TStay) => stay))
  );

  const deleteModalOptions = {
    heading: $_("_common.confirmation.heading"),
    content: `<p style='font-size: large; font-weight: 500'> ${$_(
      "_common.confirmation.deleteText",
      {
        values: {
          deleteType: "stay",
        },
      }
    )} </p>`,
    onConfirm: () => {
      stays.subscribe((stayList: TStay[]) => {
        const stay = stayList.find(
          (stay: TStay) => stay.code === selectedStay?.code
        ) || { campId: "", startDate: 0, endDate: 0 };
        if (stay?.stayId)
          stayApiHandler({
            fetchFunction: fetch,
            payload: stay,
            endpoint: DELETE_API.STAY,
          });
        selectedStay = null;
      });
      isDeleteStayModalOpen = false;
    },
    onCancel: () => (isDeleteStayModalOpen = false),
    cancelBtnText: $_("_common.confirmation.button.no"),
    confirmBtnText: $_("_common.confirmation.button.yes"),
  } as ModalOptions;

  const handlers = {
    delete: (stay: TStayDataTable) => {
      isDeleteStayModalOpen = true;
      selectedStay = stay;
    },
    selection: (selectedStay: TStay, target: any) => {
      stays.set(
        $stays.map((stay: TStay) => {
          return {
            ...stay,
            isSelected:
              stay?.stayId === selectedStay?.stayId
                ? target.checked
                : stay?.isSelected,
          };
        })
      );
    },
  };

</script>

<svelte:head>
  <title>{$_("_page.stay.title")}</title>
  <meta name="description" content="Welcome to stay" />
  <link
    rel="stylesheet"
    href="https://unpkg.com/mono-icons@1.0.5/iconfont/icons.css"
  />
</svelte:head>

<div>
  <DataTable columns={getColumns("stay")} bind:data clickHandlers={handlers} />
  {#if isDeleteStayModalOpen}
    <Modal modalOptions={deleteModalOptions} />
  {/if}
</div>
