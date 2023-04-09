import type { TokenPayload } from "$lib/types";
import { get } from "svelte/store";
import { fetchProtected, fetchUnprotected } from "./api";
import { user } from "$lib/store/authStore";
import { tick } from "svelte/internal";

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
    console.log(`refreshToken result`, result);
    console.log(`refreshToken would call`, { ...get(user), token: result });
    user.set({ ...get(user), token: result });
    return true;
  };

export const logout = async () => {
    try {
      await fetchProtected({ url: "/logout" });
    } catch {
      await tick();
    }
    try {
      user.set({
        token: {},
        loggedIn: false,
      });
      return true;
    } catch (error) {
      console.error(`logout caught error`, error);
      throw error;
    }
  };