import { appConfig } from "$lib/config";
import { fetchProtected } from "$lib/api/api";
import { users } from "$lib/store/user.store";
import type { TUserArgs } from '$lib/types/user.type';

export const getUsers = async (args: TUserArgs) => {
  const { fetchFunction = fetch} = args;
  try {
    const result = await fetchProtected({
      fetchFunction: fetchFunction,
      url: `${appConfig.API_BASE_URL}/getUsers`,
    });
    users.set(result);
    return result;
  } catch (error) {
    console.error(`caught error`, error);
    throw error;
  }
};