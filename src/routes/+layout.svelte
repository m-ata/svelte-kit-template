<script lang="ts">
  import { validateUserToken } from "$lib/utils/validateToken";
  import Header from "../components/Header/Header.svelte";
  import Drawer from "../components/Drawer/Drawer.svelte";
  import ContentBar from "../components/ContentBar/ContentBar.svelte";
  import Loader from "../components/Loader/Loader.svelte";
  import "./styles.scss";
  import { onMount, afterUpdate } from "svelte";
  import { user } from "$lib/store/authStore";

  import "$lib/i18n";
  import { MAX_TOAST, dismissToast, toasts } from "$lib/store/toastStore";
  import Toast from "../components/Toast/Toast.svelte";
  import { _, isLoading } from "svelte-i18n";
  import { userActivity } from "$lib/store/user-activity.store";
  import type { TUserActivity } from "$lib/types/user.type";
  import { MAX_USER_INACTIVITY } from "$lib/constants";
  import { fetchData } from "$lib/api/api";

  /**
   * @type {boolean | undefined}
   */
  let token;

  onMount(async () => {
    token = await validateUserToken($user);

    window.addEventListener("focus", () => fetchData());

    window.addEventListener(`touchstart`, trackUserActivity);
    window.addEventListener(`click`, trackUserActivity);
    window.addEventListener(`focus`, trackUserActivity);
    window.addEventListener(`scroll`, trackUserActivity);
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

  // track user activity
  const trackUserActivity = () => {
    user.subscribe((authUser) => {
      // user should be logged in to track activity
      if (authUser.loggedIn) {
        userActivity.subscribe((activity: TUserActivity) => {
          const { lastUserActivity } = activity;
          // compare if 5 minutes have passed since last activity
          if (lastUserActivity < Date.now() - MAX_USER_INACTIVITY) {
            fetchData();
          }
        });
      }
    });
    userActivity.set({ lastUserActivity: Date.now() });
  };

  const clickHandlers = {
    refresh: () => fetchData()
  }
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
      <Header />
      {#if $user.loggedIn}
        <Drawer />
      {/if}

      <main class={$user.loggedIn ? 'logged-in-layout' : ''}>
        {#if $user.loggedIn}
          <ContentBar clickHandlers={clickHandlers}/>
        {/if}

        <slot />
      </main>

    </div>
  </div>
{/if}

<style lang="scss">
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
    width: 100%;
    max-width: 64rem;
    margin: 0 auto;
    box-sizing: border-box;
    z-index: 99;

    &.logged-in-layout {
      width: calc(100vw - 100px) !important;
      left: 230px;
      top: 60px;
      position: fixed;
      max-width: unset;
      margin: 0;
      padding: 0;
      border-left: 2px solid rgb(226, 232, 240);
    }
  }
</style>
