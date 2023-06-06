<script>
  import "@skeletonlabs/skeleton/themes/theme-skeleton.css";
  import "@skeletonlabs/skeleton/styles/all.css";
  import { validateUserToken } from "$lib/utils/validateToken";
  import Header from "../components/Header/Header.svelte";
  import Loader from "../components/Loader/Loader.svelte";
  import "./styles.scss";
  import { onMount, afterUpdate } from "svelte";
  import { user } from "$lib/store/authStore";
  
  import "$lib/i18n";
  import { MAX_TOAST, dismissToast, toasts } from "$lib/store/toastStore";
  import Toast from "../components/Toast/Toast.svelte";
  import { _, isLoading } from "svelte-i18n";
  import { page } from "$app/stores";

  /**
   * @type {boolean | undefined}
   */
  let token;

  onMount(async () => {
    token = await validateUserToken($user);
  });

  const update = async () => {
    // @ts-ignore
    token = await validateUserToken($user);
  };

  afterUpdate(async () => {
    let someDependency = localStorage.getItem("auth");

    // @ts-ignore
    someDependency, update();
  });
</script>

{#if $isLoading}
  <Loader />
{:else}
  <div>
    {#if $toasts}
      <div class="toast-container">
        {#each $toasts.reverse() as toast, i}
          {#if i < MAX_TOAST}
            <Toast
              type={toast.type}
              dismissible={toast.dismissible}
              on:dismiss={() => dismissToast(toast.id)}>{toast.message}</Toast
            >
          {/if}
        {/each}
      </div>
    {/if}
    <div class="app">
      {#if $user.loggedIn}
        <Header />
      {/if}
      <main>
        <slot />
      </main>

      <footer>
        <p>
          {$_("_page.home.visit")}<a href="https://kit.svelte.dev"
            >{$_("_page.home.link.svelteDocs")}</a
          >
          {$_("_page.home.svelte.learn")}
        </p>
      </footer>
    </div>
  </div>
{/if}

<style>
  .toast-container {
    position: absolute;
    top: 5px;
    right: 5px;
    z-index: 999;
  }
  .app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  main {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    width: 100%;
    max-width: 64rem;
    margin: 0 auto;
    box-sizing: border-box;
  }

  footer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 12px;
  }

  footer a {
    font-weight: bold;
  }

  @media (min-width: 480px) {
    footer {
      padding: 12px 0;
    }
  }
</style>
