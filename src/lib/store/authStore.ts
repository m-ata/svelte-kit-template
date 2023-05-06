// store.js

import { browser } from "$app/environment";
import { writable } from "svelte/store";
import { goto } from "$app/navigation";
import type { UserToken } from "$lib/types";

const defaultValue = {
  token: {},
  loggedIn: false,
};

const authToken = browser && window?.localStorage.getItem("auth") || '';

let initialValue;

if (authToken) {
    initialValue = JSON.parse(authToken);
} else {
    initialValue = defaultValue;
}

export const user = writable<UserToken>(initialValue);

user.subscribe(data => {
  if (browser) {
    window?.localStorage.setItem("auth", JSON.stringify(data));
  }
});

if (browser) {
  window?.addEventListener("storage", () => {
    const auth = JSON.parse(window.localStorage.getItem('auth') || '');
    if (!auth.loggedIn) {
      user.set(defaultValue);
      goto("/login");
    }
    if (auth.loggedIn) {
      console.log(auth.loggedIn)
      window.location.href = '/';
    }
  });
}
