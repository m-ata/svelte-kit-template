<script lang="ts">
  import loader from "$lib/images/gifs/loader.svg";
  import { fetchToken } from "$lib/api/auth";
  import { goto } from "$app/navigation";
  import { user } from "$lib/store/auth.store";
  import { get } from "svelte/store";
  import type { TokenPayload } from "$lib/types/token.type";
  import { addToast } from "$lib/store/toast.store";
  import { _ } from "svelte-i18n";
  import { activeTabConfig } from "$lib/store/active-tab-config.store";

  let isRequestPending: boolean = false;

  // handling login with API service
  const loginFormSubmit = async (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    let json = Object.fromEntries(formData.entries());
    try {
      isRequestPending = true;
      const token = await fetchToken(json as TokenPayload);
      user.set({
        token: token,
        loggedIn: true,
      });
      isRequestPending = false;
      addToast({
        message: get(_)("_page.login.success"),
        type: "success",
        dismissible: true,
        timeout: 3000,
      });
      goto("/dashboard");
      activeTabConfig.set({
        tab: "dashboard",
        tabName: get(_)("_component.drawer.menu.dashboard"),
        total: 0,
      });
    } catch {
      isRequestPending = false;
      addToast({
        message: get(_)("_page.login.loginErrorMessage"),
        type: "error",
        dismissible: true,
        timeout: 3000,
      });
    }
  };
</script>

<svelte:head>
  <title>Login</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
  <div class="login-container">
    <div class="sub-container">
      <div class="header">
        <h2>{$_("_page.login.heading")}</h2>
        <div class="underline-title" />
      </div>
      <form class="form" on:submit={loginFormSubmit}>
        <div class="input-group">
          <label for="user-email">
            {$_("_page.login.field.username")}
          </label>
          <input class="form-content" type="text" name="username" required />
        </div>

        <div class="input-group">
          <label for="user-password">
            {$_("_page.login.field.password")}
          </label>
          <input
            class="form-content"
            type="password"
            name="password"
            required
          />
        </div>

        <a class="forgot-password" href="/">
          {$_("_page.login.label.forgetPassword")}
        </a>

        <button class={`submit-btn ${isRequestPending ? 'disabled' : ''}`} type="submit" name="submit">
          {#if isRequestPending}
            <img src={loader} alt="loader" />
          {:else}
            {$_("_page.login.loginButton")}
          {/if}
        </button>
      </form>
    </div>
  </div>
</section>

<style lang="scss">
  @import "./styles.scss";
</style>
