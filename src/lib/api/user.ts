import { appConfig } from "$lib/config";
import { fetchProtected } from "$lib/api/api";
import { users } from "$lib/store/user.store";
import type { TUser } from '$lib/types/user.type';
import type { TApiArgs } from "$lib/types/common.type";
import { DELETE_API, GET_API, UPDATE_API } from "$lib/constants";
import { get } from "svelte/store";

// stay api handler which will handle every stay api based on endpoint
export const userApiHandler = async (args: TApiArgs, isMount?: boolean) => {
  const { fetchFunction = fetch, payload, endpoint } = args;
  try {
    const result = await fetchProtected({
      fetchFunction: fetchFunction,
      url: `${appConfig.API_BASE_URL}${endpoint}`,
      body: payload,
    });
    let filteredStays;
    switch (endpoint) {
      case GET_API.USER:
        users.set(
          result?.map((resItem: TUser) => {
            return {
              ...resItem,
              isSelected: isMount
                ? false
                : get(users).find(
                    (foundItem: TUser) => foundItem.userId === resItem.userId
                  )?.isSelected ?? false,
            };
          })
        );
        break;
      case DELETE_API.USER:
        users.subscribe((stayList) => {
          filteredStays = stayList?.filter(
            (user: TUser) => user.userId !== payload.userId
          );
        });
        users.set(filteredStays);
        break;
      case UPDATE_API.USER:
        users.subscribe((stayList) => {
          filteredStays = stayList?.map(
            (user: TUser) => {
              return (user.userId === payload.userId) ? payload : {
                ...user,
              }
            }
          );
        });
        users.set(filteredStays);
        break;
      default:
        break;
    }

    return result;
  } catch (error) {
    console.error(`caught error`, error);
    throw error;
  }
};