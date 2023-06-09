<script lang="ts">
  import { page } from "$app/stores";
  import logo from "$lib/images/svelte-logo.svg";
  import logoutImg from "$lib/images/logout.svg";
  import { logout } from "$lib/api/auth";
  import { _ } from "svelte-i18n";
  import Modal from "./../Modal/Modal.svelte";
  import type { ModalOptions } from "$lib/types/modal.type";

  let isLogoutModalOpen: boolean = false;
  const logoutModalOptions = {
      heading: $_("_component.modal.logout.heading"),
      icon: logoutImg,
      content: `<p style='font-size: large; font-weight: 500'> ${$_("_component.modal.logout.button.confirmText")} </p>`,
      onApply: () => logout(),
      onCancel: () => {isLogoutModalOpen = false},
      cancelText: $_("_component.modal.logout.button.no"),
      applyText: $_("_component.modal.logout.button.yes")
    } as ModalOptions
</script>

<header>
  <div class="corner">
    <a href="https://kit.svelte.dev">
      <img src={logo} alt="SvelteKit" />
    </a>
  </div>

  <nav>
    <svg viewBox="0 0 2 3" aria-hidden="true">
      <path d="M0,0 L1,2 C1.5,3 1.5,3 2,3 L2,0 Z" />
    </svg>
    <ul>
      <li aria-current={$page.url.pathname === "/" ? "page" : undefined}>
        <a href="/">{$_("_page.home.title")}</a>
      </li>
      <li aria-current={$page.url.pathname === "/stay" ? "page" : undefined}>
        <a href="/stay">{$_("_page.stay.title")}</a>
      </li>
      <li aria-current={$page.url.pathname === "/user" ? "page" : undefined}>
        <a href="/user">{$_("_page.user.title")}</a>
      </li>
      
    </ul>
    <svg viewBox="0 0 2 3" aria-hidden="true">
      <path d="M0,0 L0,3 C0.5,3 0.5,3 1,2 L2,0 Z" />
    </svg>
  </nav>

  <button type="button" class="corner" on:click={() => isLogoutModalOpen = true}>
    <img src={logoutImg} alt="Logout" />
  </button>

  {#if isLogoutModalOpen}
    
    <Modal modalOptions={logoutModalOptions} />
  {/if}
</header>

<style lang="scss">
  @import "./style.scss";
</style>
