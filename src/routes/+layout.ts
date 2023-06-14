import { locale, waitLocale } from "svelte-i18n";
import { browser } from "$app/environment";
import { page } from "$app/stores";
import { getStays } from "$lib/api/stay";
import { getUsers } from "$lib/api/user";
import { userActivity } from "$lib/store/user-activity.store";
import type { TUserActivity } from "$lib/types/user.type"
import { MAX_USER_INACTIVITY } from "$lib/constants";
import { user } from "$lib/store/authStore";

export const ssr = false;

export const load = async () => {
  if (browser) {
    console.log("browser");
    locale.set(window.localStorage.getItem("lang"));
    window.addEventListener("storage", (event) => console.log(event), false);
  }
  await waitLocale();

  window.addEventListener("focus", () => handleRefreshData());

  window.addEventListener(`touchstart`, trackUserActivity);
  window.addEventListener(`click`, trackUserActivity);
  window.addEventListener(`focus`, trackUserActivity);
  window.addEventListener(`scroll`, trackUserActivity);
};

// refresh the data based on the active route
const handleRefreshData = () => {
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
};

// track user activity
const trackUserActivity = () => {
  user.subscribe(authUser => {
    // user should be logged in to track activity
    if (authUser.loggedIn) {
      userActivity.subscribe((activity: TUserActivity) => {
        const { lastUserActivity } = activity;
        // compare if 5 minutes have passed since last activity
        if (lastUserActivity < Date.now() - MAX_USER_INACTIVITY) {
          handleRefreshData();
        }
      });
      userActivity.set({ lastUserActivity: Date.now() });
    }
  });
};

const setLocale = (e: any) => {
  console.log(e);
};