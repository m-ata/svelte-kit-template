<script lang="ts">
  import { LANGUAGES } from "$lib/constants";
  import { language } from "$lib/store/language.store";
  import { _, locale } from "svelte-i18n";

  let selectedLang = '';

  language.subscribe(lang => {
    selectedLang = lang
  })
</script>

<div class="sl-nav">
  <img src={`src/lib/images/flags/en.svg`} alt="Logout" />
  
  <ul>
    <li>
      <b> {$_(`_common.language.${selectedLang}`)} </b> <i class="fa fa-angle-down" aria-hidden="true" />
      <div class="triangle" />
      <ul>
        {#each LANGUAGES as lang}
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <li on:click={() => {
            language.set(lang);
            locale.set(lang);
          }}>
            <img src={`src/lib/images/flags/${lang}.svg`} alt={lang} />
            <span class={`${selectedLang === lang ? 'active' : ''}`}> {$_(`_common.language.${lang}`)} </span>
          </li>
        {/each}
      </ul>
    </li>
  </ul>
</div>

<style lang="scss">
  @import "./style.scss";
</style>
