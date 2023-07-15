import { browser } from "$app/environment";
import { writable } from "svelte/store";
import type { TStats } from "$lib/types/stats.type";

const defaultValue: TStats = {
    datasets: [],
    labels: []
}

const initialValue = (browser && window.localStorage.getItem("stats"))
  ? window.localStorage.getItem("stats") ?? defaultValue
  : defaultValue;

export const stats = writable(initialValue);

stats.subscribe(data => {
  if (browser) {
    window.localStorage.setItem("stats", JSON.stringify(data));
  }
});