import { fetchToken } from "$lib/api/auth";
import { goto } from "$app/navigation";
import { user } from "$lib/store/authStore";
import { get } from "svelte/store";
import type { TokenPayload } from "$lib/types";
import { addToast } from "$lib/store/toastStore";
import { _ } from "svelte-i18n";
import { activeTabConfig } from "$lib/store/active-tab-config.store";

// handling login with API service
export const loginFormSubmit = async (event: any) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  let json = Object.fromEntries(formData.entries());
  try { 
    const token = await fetchToken(json as TokenPayload);
    user.set({
      token: token,
      loggedIn: true,
    });
    addToast({
      message: get(_)("_page.login.success"),
      type: "success",
      dismissible: true,
      timeout: 3000,
    });
    goto("/dashboard");
    activeTabConfig.set({
      tab: 'dashboard',
      tabName: get(_)("_component.drawer.menu.dashboard"),
      total: 0
    })
  } catch {
    addToast({
      message: get(_)("_page.login.loginErrorMessage"),
      type: "error",
      dismissible: true,
      timeout: 3000,
    })
  }
};