<script lang="ts">
    import { _ } from "svelte-i18n";
    import DataTable from "../../components/DataTable/DataTable.svelte";
    import { users } from "$lib/store/user.store";
    import type { TUserResponse, TUserDataTable } from "$lib/types/user.type";
    import { getColumns } from "$lib/utils/columns.util";
    const columns = ["firstName", "lastName", "userName", "email", "phoneNumber"]
    let data: TUserDataTable[];
    users.subscribe((userList: TUserResponse[]) => {
      if (userList?.length) {
        data = userList?.map((user: TUserResponse) => {
          const {firstName, lastName, userName,  email, phoneNumber} =
            user;
          return {
            firstName, 
            lastName, 
            userName, 
            email, 
            phoneNumber
          } as TUserDataTable;
        });
      }
    });
  </script>
  
  <svelte:head>
    <title>{$_("_page.user.title")}</title>
    <meta name="description" content="Welcome to user" />
  </svelte:head>
  
  <div>
    <DataTable columns={getColumns("user")} bind:data />
  </div>
  
  
  