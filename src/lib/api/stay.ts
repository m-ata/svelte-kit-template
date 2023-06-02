import { appConfig } from "$lib/config";
import { fetchProtected } from "$lib/api/api";
import { stays } from "$lib/store/stay.store";
import type { TStayArgs } from '$lib/types/stay.type';

export const getStays = async (args: TStayArgs) => {
  const { fetchFunction = fetch, stayPayload } = args;
  try {
    const result = await fetchProtected({
      fetchFunction: fetchFunction,
      url: `${appConfig.API_BASE_URL}/getStayList`,
      body: stayPayload
    });
    stays.set(result);
    return result;
  } catch (error) {
    console.error(`caught error`, error);
    throw error;
  }
};
