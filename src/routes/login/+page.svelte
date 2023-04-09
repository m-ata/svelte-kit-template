<script lang="ts">
  import welcome from "$lib/images/svelte-welcome.webp";
  import welcome_fallback from "$lib/images/svelte-welcome.png";
  import { loginFormSubmit } from "./login";
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
        <h2>LOGIN</h2>
        <div class="underline-title" /> 
      </div>
      <form class="form" on:submit={loginFormSubmit}>
        <label for="user-email" style="padding-top:13px"> &nbsp;Username </label>
        <input
          class="form-content"
          type="text"
          name="username"
          required
        />
        <div class="form-border" />
        <label for="user-password" style="padding-top:22px"
          >&nbsp;Password
        </label>
        <input
          class="form-content"
          type="password"
          name="password"
          required
        />
        <div class="form-border" />
        <a href="/about">
          <legend class="forgot-pass">Forgot password?</legend>
        </a>
        <button class="submit-btn" type="submit" name="submit"> LOGIN</button>
        <a href="/about" class="signup-link">Don't have account yet?</a>
      </form>
    </div>
  </div>
</section>

<style lang="scss">
    @import './styles.scss';
</style>
