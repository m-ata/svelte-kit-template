import { browser } from "$app/environment";
import { writable } from "svelte/store";

const defaultValue: string = browser ? window.navigator.language : 'en';

const initialValue = (browser && window.localStorage.getItem("lang"))
  ? window.localStorage.getItem("lang") ?? defaultValue
  : defaultValue;

export const language = writable(initialValue);
language.subscribe(data => {
  if (browser) {
    window.localStorage.setItem("lang", data);
  }
});