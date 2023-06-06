import { getStays } from "$lib/api/stay";
import { stays } from "$lib/store/stay.store";
import { tick } from "svelte/internal";
import { get } from "svelte/store";
/** @type {import('./$types').PageLoad} */
export async function load({fetch} : any ) {
  await tick();
  getStays({
    fetchFunction: fetch,
    // sample payload
    stayPayload: {
      campId: "fafafafa-b2a8-4885-bace-875199e719aa",
      endDate: 4083077146160,
      startDate: 0,
    },
  });
  return {
    stays: get(stays),
  };
}
