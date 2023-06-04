import { getUsers } from "$lib/api/user";
import { users } from "$lib/store/user.store";
import { tick } from "svelte/internal";
import { get } from "svelte/store";
/** @type {import('./$types').PageLoad} */
export async function load({ fetch } : any) {
  await tick();
  getUsers({
    fetchFunction: fetch,
    });
  return {
    users: get(users),
  };
}
