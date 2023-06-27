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
  import { DELETE_API, UPDATE_API, emptyUser } from "$lib/constants";
  import type { FormModalOptions, ModalOptions } from "$lib/types/modal.type";
  import Button from "../../components/Button/Button.svelte";
  import FormModal from "../../components/FormModal/FormModal.svelte";
  import ContentBar from "../../components/ContentBar/ContentBar.svelte";
  import refreshIcon from "$lib/images/icons/refresh.svg";
  import emailIcon from "$lib/images/icons/email.svg";
  import phoneIcon from "$lib/images/icons/phone.svg";
  import lockIcon from "$lib/images/icons/lock.svg";

  // component states
  let data: TUser[] = $users;
  let isDeleteUserModalOpen: boolean = false;
  let isEditUserModalOpen: boolean = false;
  let selectedUser: TUser | null = emptyUser;
  const deleteUserModalOptions = {
    heading: $_("_common.confirmation.heading"),
    content: `<p style='font-size: large; font-weight: 500'> ${$_(
      "_common.confirmation.deleteText",
      {
        values: {
          deleteType: "user",
        },
      }
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
    cancelBtnText: $_("_common.confirmation.button.no"),
    confirmBtnText: $_("_common.confirmation.button.yes"),
  } as ModalOptions;

  let editUserModalOptions = {
    heading: $_("_component.modal.user.edit.heading"),
    form: [
      {
        type: "inputText",
        label: $_("_component.modal.user.form.field.firstName"),
        value: selectedUser?.firstName,
        field: "firstName",
      },
      {
        type: "inputText",
        label: $_("_component.modal.user.form.field.lastName"),
        value: selectedUser?.lastName,
        field: "lastName",
      },
      {
        type: "email",
        label: $_("_component.modal.user.form.field.email"),
        icon: emailIcon,
        value: selectedUser?.email,
        field: "email",
      },
      {
        type: "phone",
        label: $_("_component.modal.user.form.field.phone"),
        icon: phoneIcon,
        value: selectedUser.phoneNumber,
        field: "phoneNumber",
      },
      {
        type: "inputText",
        label: $_("_component.modal.user.form.field.userName"),
        value: selectedUser.userName,
        field: "userName",
      },
      {
        type: "password",
        label: $_("_component.modal.user.form.field.password"),
        icon: lockIcon,
        value: selectedUser.userPassword,
        field: "userPassword",
      },
    ],
    onApply: (event: any) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      let json = Object.fromEntries(formData.entries());
      // replace values of form in selectedUser
      for (let key in selectedUser) {
        if (json[key] != null) {
          (selectedUser as any)[key] = json[key];
        }
      }
      if (json["userPassword"] && selectedUser) {
        (selectedUser as any)["userPassword"] = json["userPassword"];
      }
      // calling api
      userApiHandler({
        fetchFunction: fetch,
        payload: selectedUser,
        endpoint: UPDATE_API.USER,
      });
      isEditUserModalOpen = false;
    },
    onCancel: () => (isEditUserModalOpen = false),
    cancelBtnText: $_("_common.cancelText"),
    confirmBtnText: $_("_common.applyText"),
  } as FormModalOptions;

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
    edit: (user: TUser) => {
      isEditUserModalOpen = true;
      selectedUser = user;
      console.log(user);
      editUserModalOptions = {
        ...editUserModalOptions,
        form: editUserModalOptions.form.map((updatedForm) => {
          return {
            ...updatedForm,
            value: setFormValue(updatedForm.field),
          };
        }),
      };
    },
  };

  const setFormValue = (field: string) => {
    switch (field) {
      case "firstName":
        return selectedUser?.firstName;
      case "lastName":
        return selectedUser?.lastName;
      case "email":
        return selectedUser?.email;
      case "phoneNumber":
        return selectedUser?.phoneNumber;
      case "userName":
        return selectedUser?.userName;
      case "userPassword":
        return "";
      default:
        break;
    }
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

<DataTable columns={getColumns("user")} bind:data clickHandlers={handlers} />
{#if isDeleteUserModalOpen}
  <ConfirmationModal modalOptions={deleteUserModalOptions} />
{/if}

{#if isEditUserModalOpen}
  <FormModal modalOptions={editUserModalOptions} />
{/if}
