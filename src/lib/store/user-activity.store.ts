import { browser } from "$app/environment";
import { writable } from "svelte/store";
import type { TUserActivity } from "../types/user.type"

const defaultValue: TUserActivity = {
    lastUserActivity: 0
};

const initialValue = browser
  ? JSON.parse(window.localStorage.getItem("user-activity") || "{}") ?? defaultValue
  : defaultValue;

export const userActivity = writable(initialValue);

userActivity.subscribe(data => {
  if (browser) {
    window.localStorage.setItem("user-activity", JSON.stringify(data));
  }
});