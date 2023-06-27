<script lang="ts">
  import { _ } from "svelte-i18n";
  import chart from "$lib/images/icons/chart.svg";
  import calender from "$lib/images/icons/calender.svg";
  import users from "$lib/images/icons/users.svg";
  import type { TDrawerMenu } from "$lib/types/common.type";
  import { activeTabConfig } from "$lib/store/active-tab-config.store";
  import { stays } from "$lib/store/stay.store";
  import { page } from "$app/stores";

  let menu: TDrawerMenu[] = [
    {
      label: $_("_component.drawer.menu.dashboard"),
      icon: chart,
      route: "/dashboard",
      onClick: () => activeTabConfig.set({
        tab: 'dashboard',
        tabName: $_("_component.drawer.menu.dashboard"),
        total: 0
      }),
    },
    {
      label: $_("_component.drawer.menu.stay"),
      icon: calender,
      route: "/stay",
      onClick: () => activeTabConfig.set({
        tab: 'stays',
        tabName: $_("_component.drawer.menu.stay"),
        total: $stays?.length || 0
      }),
    },
    {
      label: $_("_component.drawer.menu.users"),
      icon: users,
      route: "/users",
      onClick: () => activeTabConfig.set({
        tab: 'users',
        tabName: $_("_component.drawer.menu.users"),
        total: 0
      }),
    },
  ];

</script>

<nav class="drawer">
  <ul>
    {#each menu as m}
      <li>
        <a href={m.route} class={$page.url.pathname === m.route ? 'active' : ''} on:click={m.onClick}>
          <img src={m.icon} alt="icon" />
          <span> {m.label} </span>
        </a>
      </li>
    {/each}
  </ul>
</nav>

<style lang="scss">
  @import "./style.scss";
</style>
