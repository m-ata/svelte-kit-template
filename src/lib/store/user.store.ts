import { browser } from "$app/environment";
import { writable } from "svelte/store";
import type { TUserResponse } from "../types/user.type"

const defaultValue: TUserResponse[] = [];

const initialValue = browser
  ? JSON.parse(window.localStorage.getItem("users") || "{}") ?? defaultValue
  : defaultValue;

export const users = writable(initialValue);
users.subscribe(data => {
  if (browser) {
    window.localStorage.setItem("users", JSON.stringify(data));
  }
});