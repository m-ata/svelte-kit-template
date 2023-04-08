<script lang="ts">
  import welcome from "$lib/images/svelte-welcome.webp";
  import welcome_fallback from "$lib/images/svelte-welcome.png";
  import { goto } from "$app/navigation";

  let email = '', password = '';

  const handleChangeInput = (e: Event) => {
    const target = e?.target as HTMLSelectElement;

    if (target.name === 'email') {
        email = target.value;
    }
    
    if (target.name === 'password') {
        password = target.value;
    }

  } 

  const handleLogin = () => {
    if (email && password) {
        localStorage.setItem('auth-token', `${email}-${password}`);
        goto('/');
    } else {
        return
    }
    console.log('login');
  }
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
      <form class="form">
        <label for="user-email" style="padding-top:13px"> &nbsp;Email </label>
        <input
          id="user-email"
          class="form-content"
          type="email"
          name="email"
          autocomplete="on"
          required
          on:change={handleChangeInput}
        />
        <div class="form-border" />
        <label for="user-password" style="padding-top:22px"
          >&nbsp;Password
        </label>
        <input
          id="user-password"
          class="form-content"
          type="password"
          name="password"
          required
          on:change={handleChangeInput}
        />
        <div class="form-border" />
        <a href="#">
          <legend class="forgot-pass">Forgot password?</legend>
        </a>
        <button 
            on:click={handleLogin} 
            class="submit-btn" 
            type="button" 
            name="submit"> LOGIN</button>
        <a href="#" class="signup-link">Don't have account yet?</a>
      </form>
    </div>
  </div>
</section>

<style lang="scss">
    @import './styles.scss';
</style>
