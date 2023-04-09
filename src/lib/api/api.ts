import type { FetchUnProtectedPayload } from "$lib/types";
import { browser } from "$app/environment";
import { user } from "$lib/store/authStore";
import { get } from "svelte/store";
import { refreshToken } from "./auth";

// Unprotected API
export const fetchUnprotected = async ({
    fetchFunction = fetch,
    url,
    method = "POST",
    headers = {},
    body = {},
  }: FetchUnProtectedPayload) => {
    const result = await fetchFunction(`${url}`, {
      method: method,
      body:
        !headers["Content-Type"] || headers["Content-Type"] === "application/json"
          ? JSON.stringify(body)
          : body,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    });
    if (result.status === 200) {
      return result.json();
    }
    throw result;
};

// Protected API
export const fetchProtected = async ({
    fetchFunction = fetch,
    url,
    method = "POST",
    headers = {},
    body = {},
  }: FetchUnProtectedPayload) => {
    if (!browser) return "";
    try {
      const result = await fetchUnprotected({
        fetchFunction: fetchFunction,
        url,
        method,
        headers: {
          ...headers,
          Authorization: `Bearer ${get(user).token.access_token}`,
        },
        body,
      });
      return result;
    } catch (error: any) {
      if (error.status === 403) {
        await refreshToken();
        const accessToken = get(user).token?.access_token;
        const result = await fetchUnprotected({
          fetchFunction: fetchFunction,
          url: url,
          method: method,
          headers: {
            ...headers,
            Authorization: `Bearer ${accessToken}`,
          },
          body: body,
        });
        return result;
      }
    }
  };