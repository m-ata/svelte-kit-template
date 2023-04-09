<script>
  import { validateUserToken } from "$lib/utils/validateToken";
  import Header from "../components/Header/Header.svelte";
  import "./styles.scss";
  import { onMount, afterUpdate } from "svelte";
  import { user } from "$lib/store/authStore";
  /**
   * @type {boolean | undefined}
   */
  let token;

  onMount(async () => {
    console.log($user);
    token = await validateUserToken($user);
  });

  const update = async () => {
    // @ts-ignore
    token = await validateUserToken($user);
  };

  afterUpdate(async () => {
    let someDependency = localStorage.getItem("auth-token");

    // @ts-ignore
    $: someDependency, update();
  });
</script>

<div class="app">
  {#if $user.loggedIn}
    <Header />
  {/if}
  <main>
    <slot />
  </main>

  <footer>
    <p>
      visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit
    </p>
  </footer>
</div>

<style>
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
