import { browser } from "$app/environment";
import { init, register } from "svelte-i18n";

const defaultLocale = "en";

register("en", () => import("./translations/en-US.json"));
register("de", () => import("./translations/de-DE.json"));
register("nb", () => import("./translations/nb-NO.json"));

init({
  fallbackLocale: defaultLocale,
  initialLocale: browser ? window.localStorage.getItem('lang') : defaultLocale,
});
