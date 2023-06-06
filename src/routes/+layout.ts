import { locale, waitLocale } from "svelte-i18n";
import { browser } from "$app/environment";
import { page } from "$app/stores";
import { getStays } from "$lib/api/stay";
import { getUsers } from "$lib/api/user";

export const ssr = false;

export const load = async () => {
  if (browser) {
    locale.set(window.navigator.language);
  }
  await waitLocale();

  window.addEventListener("focus", () => {
    page.subscribe((p) => {
      switch (p?.route?.id) {
        case "/stay":
          getStays({
            fetchFunction: fetch,
            // sample payload
            stayPayload: {
              campId: "fafafafa-b2a8-4885-bace-875199e719aa",
              endDate: 4083077146160,
              startDate: 0,
            },
          });
          break;
        case "/user":
          getUsers({
            fetchFunction: fetch,
          });
          break;
        default:
          break;
      }
    });
  });
};
