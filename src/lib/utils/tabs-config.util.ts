import { activeTabConfig } from "$lib/store/active-tab-config.store";
import { _ } from "svelte-i18n";
import { get } from "svelte/store";
import { stays } from "$lib/store/stay.store";
import { users } from "$lib/store/user.store";

export const setTabConfig = (route: string) => {
  switch (route) {
    case "/dashboard":
      activeTabConfig.set({
        tab: "dashboard",
        tabName: get(_)("_component.drawer.menu.dashboard"),
        total: 0,
      });
      break;
    case "/stays":
      activeTabConfig.set({
        tab: "stays",
        tabName: get(_)("_component.drawer.menu.stays"),
        total: get(stays).length || 0,
      });
      break;
    case "/users":
      activeTabConfig.set({
        tab: "users",
        tabName: get(_)("_component.drawer.menu.users"),
        total: get(users).length || 0,
      });
      break;

    default:
      break;
  }
};
