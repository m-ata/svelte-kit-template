import type { TokenPayload } from "$lib/types";
import { get } from "svelte/store";
import { fetchProtected, fetchUnprotected } from "./api";
import { user } from "$lib/store/authStore";
import { users } from "$lib/store/user.store";
import { stays } from "$lib/store/stay.store";
import { tick } from "svelte/internal";
import { userActivity } from "$lib/store/user-activity.store";

export const fetchToken = async ({ username, password }: TokenPayload) => {
  return fetchUnprotected({
    url: `/token`,
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `grant_type=password&client_id=fishreg&username=${username}&password=${password}`,
  });
};

export const refreshToken = async () => {
  console.log(`refreshToken called`);
  const result = await fetchProtected({
    url: "/token",
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `grant_type=refresh_token&client_id=fishreg&refresh_token=${
      get(user).token.refresh_token
    }`,
  });
  user.set({ ...get(user), token: result });
  return true;
};

const resetStore = () => {
  // reset user store
  user.set({
    token: {},
    loggedIn: false,
  });
  // reset users store
  users.set([]);
  // reset stays store
  stays.set([]);
  userActivity.set({
    lastUserActivity: 0
  })
};

export const logout = async () => {
  try {
    await fetchProtected({ url: "/logout" });
  } catch {
    await tick();
  }
  try {
    resetStore();
    return true;
  } catch (error) {
    console.error(`logout caught error`, error);
    throw error;
  }
};
