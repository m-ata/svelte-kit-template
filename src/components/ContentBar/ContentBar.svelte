<script lang="ts">
  import Button from "../Button/Button.svelte";
  import refreshIcon from "$lib/images/icons/refresh.svg";
  import { _ } from "svelte-i18n";
  import { activeTabConfig } from "$lib/store/active-tab-config.store";
  import type { TActiveTabConfig } from "$lib/types/common.type";

  let tabConfig: TActiveTabConfig = {
    tab: "",
    tabName: "",
    total: 0,
  };

  export let clickHandlers: any = {};

  activeTabConfig.subscribe((config) => {
    tabConfig = config;
  });
</script>

<section>
  <div>
    <h1>
      {#if tabConfig.tab === 'stays'}
        {$_("_component.drawer.menu.stays")}
      {/if}
      {#if tabConfig.tab === 'dashboard'}
        {$_("_component.drawer.menu.dashboard")}
      {/if}
      {#if tabConfig.tab === 'users'}
        {$_("_component.drawer.menu.users")}
      {/if}
      
      {#if tabConfig.total}
        <span> ( {tabConfig.total} ) </span>
      {/if}
    </h1>
  </div>

  <div>
    <Button
      buttonText={$_("_common.button.refresh")}
      icon={refreshIcon}
      clickHandler={clickHandlers["refresh"]}
    />
  </div>
</section>

<style lang="scss">
  section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: rgb(248, 250, 252);
    border-bottom: 1px solid rgb(226, 232, 240);
    padding: 0 16px;
    width: calc(100vw - 250px);
    div {
      display: flex;
      align-items: center;

      h1 {
        font-size: 20px;
        font-weight: 600;
        line-height: 24px;
        letter-spacing: 0.15px;
      }
    }
  }
</style>
