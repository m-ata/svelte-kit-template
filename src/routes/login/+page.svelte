<script lang="ts">
  import welcome from "$lib/images/svelte-welcome.webp";
  import welcome_fallback from "$lib/images/svelte-welcome.png";
  import { loginFormSubmit } from "./login";
  import { _ } from "svelte-i18n";
</script>

<svelte:head>
  <title>Login</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
  <h1>
    <span class="welcome">
      <picture>
        <source srcset={welcome} type="image/webp" />
        <img src={welcome_fallback} alt="Welcome" />
      </picture>
    </span>
  </h1>

  <div class="card">
    <div class="card-content">
      <div class="card-title">
        <h2> {$_("_page.login.loginButton")} </h2>
        <div class="underline-title" /> 
      </div>
      <form class="form" on:submit={loginFormSubmit}>
        <label for="user-email" style="padding-top:13px"> {$_("_page.login.field.username")} </label>
        <input
          class="form-content"
          type="text"
          name="username"
          required
        />
        <div class="form-border" />
        <label for="user-password" style="padding-top:22px"
          > {$_("_page.login.field.username")}
        </label>
        <input
          class="form-content"
          type="password"
          name="password"
          required
        />
        <div class="form-border" />
        <a href="/about">
          <legend class="forgot-pass"> {$_("_page.login.label.forgetPassword")} </legend>
        </a>
        <button class="submit-btn" type="submit" name="submit"> {$_("_page.login.loginButton")} </button>
        <a href="/about" class="signup-link"> {$_("_page.login.label.signUpLink")} </a>
      </form>
    </div>
  </div>
</section>

<style lang="scss">
    @import './styles.scss';
</style>
