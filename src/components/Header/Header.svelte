<script lang="ts">
  import logo from "$lib/images/logo.svg";
  import logoutImg from "$lib/images/icons/logout.svg";
  import { logout } from "$lib/api/auth";
  import { _ } from "svelte-i18n";
  import Modal from "../ConfirmModal/ConfirmModal.svelte";
  import LanguageDropDown from "./../LanguageDropDown/LanguageDropDown.svelte";
  import type { ModalOptions } from "$lib/types/modal.type";
  import { user } from "$lib/store/authStore";

  let isLogoutModalOpen: boolean = false;
  let mouseEnter: boolean = false;

  const logoutModalOptions = {
    heading: $_("_component.modal.logout.heading"),
    icon: logoutImg,
    content: `<p style='font-size: large; font-weight: 500'> ${$_(
      "_component.modal.logout.button.confirmText"
    )} </p>`,
    onConfirm: async () => {
      await logout();
      isLogoutModalOpen = false;
    },
    onCancel: () => {
      isLogoutModalOpen = false;
    },
    cancelBtnText: $_("_common.confirmation.button.no"),
    confirmBtnText: $_("_common.confirmation.button.yes"),
  } as ModalOptions;

  // mouse event handler for work around of z-index
  const mouseHandler = (isEnter: boolean): any => {
    mouseEnter = isEnter;
  };
</script>

<header class={isLogoutModalOpen || mouseEnter ? "z-100" : ""}>
  <div class="logo">
    <img src={logo} alt="Svelekit Logo" />
  </div>

  <div class="nav-right-item">
    <LanguageDropDown {mouseHandler} />

    {#if $user.loggedIn}
      <button
        type="button"
        class="logout-btn"
        on:click={() => (isLogoutModalOpen = true)}
      >
        <img src={logoutImg} alt="Logout" />
      </button>
    {/if}
  </div>

  {#if isLogoutModalOpen}
    <Modal modalOptions={logoutModalOptions} />
  {/if}
</header>

<style lang="scss">
  @import "./style.scss";
</style>
