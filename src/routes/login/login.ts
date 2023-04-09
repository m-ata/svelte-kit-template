import { fetchToken } from "$lib/api/auth";
import { goto } from "$app/navigation";
import { user } from "$lib/store/authStore";
import { writable } from "svelte/store";
import type { TokenPayload } from "$lib/types";
export const loginErrorMessage = writable("");
export const showLoginError = writable(false);

// handling login with API service
export const loginFormSubmit = async (event: any) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  let json = Object.fromEntries(formData.entries());
  try {
    const token = await fetchToken(json as TokenPayload);
    showLoginError.set(false);
    user.set({
      token: token,
      loggedIn: true,
    });
    goto("/");
  } catch {
    loginErrorMessage.set("Login Failed");
    showLoginError.set(true);
  }
};