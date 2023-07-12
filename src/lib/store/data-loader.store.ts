import { browser } from "$app/environment";
import { writable } from "svelte/store";

const defaultValue: string = 'false';

const initialValue = (browser && window.localStorage.getItem("loading"))
  ? window.localStorage.getItem("loading") ?? defaultValue
  : defaultValue;

export const loading = writable(initialValue);

loading.subscribe(data => {
  if (browser) {
    window.localStorage.setItem("loading", data);
  }
});