<script lang="ts">
  import { _ } from "svelte-i18n";
  import chart from "$lib/images/icons/chart.svg";
  import calender from "$lib/images/icons/calender.svg";
  import users from "$lib/images/icons/users.svg";
  import type { TDrawerMenu } from "$lib/types/common.type";
  import { page } from "$app/stores";
  import { setTabConfig } from "$lib/utils/tabs-config.util";

  let menu: TDrawerMenu[] = [
    {
      label: $_("_component.drawer.menu.dashboard"),
      icon: chart,
      route: "/dashboard",
      onClick: () => setTabConfig('/dashboard'),
    },
    {
      label: $_("_component.drawer.menu.stays"),
      icon: calender,
      route: "/stays",
      onClick: () => setTabConfig('/stays'),
    },
    {
      label: $_("_component.drawer.menu.users"),
      icon: users,
      route: "/users",
      onClick: () => setTabConfig('/users'),
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
