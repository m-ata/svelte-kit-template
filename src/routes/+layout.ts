import { locale, waitLocale } from "svelte-i18n";
import { browser } from "$app/environment";

export const ssr = false;

export const load = async () => {
  if (browser) {
    locale.set(window.localStorage.getItem("lang"));
  }
  await waitLocale();

};
