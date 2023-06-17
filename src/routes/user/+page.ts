import { users } from "$lib/store/user.store";
import { get } from "svelte/store";
/** @type {import('./$types').PageLoad} */
export async function load() {
  return {
    users: get(users),
  };
}
