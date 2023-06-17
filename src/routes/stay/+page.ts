import { getStays } from "$lib/api/stay";
import { stays } from "$lib/store/stay.store";
import { tick } from "svelte/internal";
import { get } from "svelte/store";
/** @type {import('./$types').PageLoad} */
export async function load() {
  return {
    stays: get(stays),
  };
}
