import { appConfig } from "$lib/config";
import { DELETE_API, GET_API } from "$lib/constants";
import { stays } from "$lib/store/stay.store";
import type { TApiArgs } from "$lib/types/common.type";
import type { TStay } from "$lib/types/stay.type";
import { get } from "svelte/store";
import { fetchProtected } from "./api";

// stay api handler which will handle every stay api based on endpoint
export const stayApiHandler = async (args: TApiArgs, isMount?: boolean) => {
    const { fetchFunction = fetch, payload, endpoint } = args;
    try {
      const result = await fetchProtected({
        fetchFunction: fetchFunction,
        url: `${appConfig.API_BASE_URL}${endpoint}`,
        body: payload,
      });
      let filteredStays;
      switch (endpoint) {
        case GET_API.STAY:
          stays.set(result.map((resItem: TStay) => {
            return {
              ...resItem,
              isSelected: isMount? false : get(stays).find((foundItem: TStay) => foundItem.stayId === resItem.stayId)?.isSelected ?? false
            }
          }))
          break;
        case DELETE_API.STAY:
          stays.subscribe(stayList => {
            filteredStays = stayList?.filter((stay: TStay) => stay.stayId !== payload.stayId)
          })
          stays.set(filteredStays);
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