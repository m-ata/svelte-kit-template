import { browser } from "$app/environment";
import { writable } from "svelte/store";
import type { TStay } from "$lib/types/stay.type";

const defaultValue: TStay[] = [];

const initialValue = (browser && window.localStorage.getItem("stays"))
  ? JSON.parse(window.localStorage.getItem("stays") || "[]") ?? defaultValue
  : defaultValue;

export const stays = writable(initialValue);
stays.subscribe(data => {
  if (browser) {
    window.localStorage.setItem("stays", JSON.stringify(data));
  }
});