<script lang="ts">
  import { _, locale } from "svelte-i18n";
  //custom imports
  import { LANGUAGES } from "$lib/constants";
  import { language } from "$lib/store/language.store";
  // component state
  let selectedLang = '';

  export let mouseHandler: any;

  language.subscribe(lang => {
    selectedLang = lang
  })
</script>

<div class="sl-nav">
  <img src={`src/lib/images/flags/${selectedLang}.svg`} alt="flag" />
  <ul>
    <li 
      on:mouseenter={() => mouseHandler(true)} 
      on:mouseleave={() => mouseHandler(false)}
    >
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
