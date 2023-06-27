<script lang="ts">
  import logo from "$lib/images/logo.svg";
  import logoutImg from "$lib/images/icons/logout.svg";
  import { logout } from "$lib/api/auth";
  import { _ } from "svelte-i18n";
  import Modal from "../ConfirmModal/ConfirmModal.svelte";
  import LanguageDropDown from "./../LanguageDropDown/LanguageDropDown.svelte";
  import type { ModalOptions } from "$lib/types/modal.type";

  let isLogoutModalOpen: boolean = false;

  const logoutModalOptions = {
    heading: $_("_component.modal.logout.heading"),
    icon: logoutImg,
    content: `<p style='font-size: large; font-weight: 500'> ${$_(
      "_component.modal.logout.button.confirmText"
    )} </p>`,
    onConfirm: () => logout(),
    onCancel: () => {
      isLogoutModalOpen = false;
    },
    cancelBtnText: $_("_common.confirmation.button.no"),
    confirmBtnText: $_("_common.confirmation.button.yes"),
  } as ModalOptions;
</script>

<header>
  <div class="logo">
    <img src={logo} alt="SvelteKit" />
  </div>

  <div>
    <LanguageDropDown />

    <button
      type="button"
      class="logout-btn"
      on:click={() => (isLogoutModalOpen = true)}
    >
      <img src={logoutImg} alt="Logout" />
    </button>
  </div>

  {#if isLogoutModalOpen}
    <Modal modalOptions={logoutModalOptions} />
  {/if}
</header>

<style lang="scss">
  @import "./style.scss";
</style>
