<script lang="ts">
  import { loginFormSubmit } from "./login";
  import { _ } from "svelte-i18n";
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

        <a class="forgot-password" href="/"> {$_("_page.login.label.forgetPassword")} </a>

        <button class="submit-btn" type="submit" name="submit">
          {$_("_page.login.loginButton")}
        </button>
      </form>
    </div>
  </div>
</section>

<style lang="scss">
  @import "./styles.scss";
</style>
