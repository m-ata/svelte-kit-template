import { browser } from "$app/environment";
import { writable } from "svelte/store";
import type { TActiveTabConfig } from "$lib/types/common.type";

const defaultValue: TActiveTabConfig = {
    tab: '',
    total: 0,
    tabName: ''
};

const initialValue =
  browser && window.localStorage.getItem("active-tab-config")
    ? JSON.parse(window.localStorage.getItem("active-tab-config") || "[]") ?? defaultValue
    : defaultValue;

export const activeTabConfig = writable(initialValue);

activeTabConfig.subscribe((data) => {
  if (browser) {
    window.localStorage.setItem("active-tab-config", JSON.stringify(data));
  }
});
