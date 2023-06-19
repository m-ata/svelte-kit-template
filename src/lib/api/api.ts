import type { FetchUnProtectedPayload } from "$lib/types";
import { browser } from "$app/environment";
import { user } from "$lib/store/authStore";
import { get } from "svelte/store";
import { refreshToken } from "./auth";
import { page } from "$app/stores";
import { stayApiHandler } from "./stay";
import { userApiHandler } from "./user";

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

// generic fetch data based on current active page

export const fetchData = (isMount?: boolean) => {
  page.subscribe((p) => {
    switch (p?.route?.id) {
      case "/stay":
        stayApiHandler({
          fetchFunction: fetch,
          // sample payload
          payload: {
            campId: "fafafafa-b2a8-4885-bace-875199e719aa",
            endDate: 4083077146160,
            startDate: 0,
          },
          endpoint: "/getStayList",
        }, isMount);
        break;
      case "/user":
        userApiHandler({
          fetchFunction: fetch,
          endpoint: "/getUsers"
        }, isMount);
        break;
      default:
        break;
    }
  });
};