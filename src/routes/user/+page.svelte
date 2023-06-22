<script lang="ts">
  import { _ } from "svelte-i18n";
  import DataTable from "../../components/DataTable/DataTable.svelte";
  import { users } from "$lib/store/user.store";
  import type { TUser } from "$lib/types/user.type";
  import { getColumns } from "$lib/utils/columns.util";
  import { onMount } from "svelte";
  import { fetchData } from "$lib/api/api";
  import ConfirmationModal from "../../components/ConfirmModal/ConfirmModal.svelte";
  import { userApiHandler } from "$lib/api/user";
  import { DELETE_API } from "$lib/constants";
  import type { ModalOptions } from "$lib/types/modal.type";
  import Button from "../../components/Button/Button.svelte";
  import refreshIcon from "$lib/images/icons/refresh.svg";

  // component states
  let data: TUser[] = $users;
  let isDeleteUserModalOpen: boolean = false;
  let selectedUser: TUser | null;
  const deleteUserModalOptions = {
    heading: $_("_component.modal.logout.heading"),
    content: `<p style='font-size: large; font-weight: 500'> ${$_(
      "_common.confirmation.delete"
    )} </p>`,
    onConfirm: () => {
      users.subscribe((userList: TUser[]) => {
        const user = userList.find(
          (user: TUser) => user.userId === selectedUser?.userId
        );
        if (user?.userId)
          userApiHandler({
            fetchFunction: fetch,
            payload: user,
            endpoint: DELETE_API.USER,
          });
        selectedUser = null;
      });
      isDeleteUserModalOpen = false;
    },
    onCancel: () => (isDeleteUserModalOpen = false),
    cancelBtnText: $_("_component.modal.logout.button.no"),
    confirmBtnText: $_("_component.modal.logout.button.yes"),
  } as ModalOptions;

  const handlers = {
    delete: (user: TUser) => {
      isDeleteUserModalOpen = true;
      selectedUser = user;
    },
    selection: (selectedUser: TUser, target: any) => {
      users.set(
        $users.map((user: TUser) => {
          return {
            ...user,
            isSelected:
              user?.userId === selectedUser?.userId
                ? target.checked
                : user?.isSelected,
          };
        })
      );
    },
  };

  users.subscribe((userList: TUser[]) => {
    if (userList?.length) {
      data = userList?.map((user: TUser) => user);
    }
  });

  onMount(async () => {
    fetchData(true);
  });

  const refreshUsers = () => fetchData(true);
</script>

<svelte:head>
  <title>{$_("_page.user.title")}</title>
  <meta name="description" content="Welcome to user" />
  <link
    rel="stylesheet"
    href="https://unpkg.com/mono-icons@1.0.5/iconfont/icons.css"
  />
</svelte:head>

<div>
  <Button
    buttonText={$_("_common.button.refresh")}
    icon={refreshIcon}
    clickHandler={refreshUsers}
  />
  <DataTable columns={getColumns("user")} bind:data clickHandlers={handlers} />
  {#if isDeleteUserModalOpen}
    <ConfirmationModal modalOptions={deleteUserModalOptions} />
  {/if}
</div>
