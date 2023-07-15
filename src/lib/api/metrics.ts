import { appConfig } from "$lib/config";
import type { TApiArgs } from "$lib/types/common.type";
import { fetchProtected } from "./api";
import { loading } from "$lib/store/data-loader.store";
import { stats } from "$lib/store/stats.store";

// stay api handler which will handle every stay api based on endpoint
export const metricsApiHandler = async (args: TApiArgs) => {
  const { fetchFunction = fetch, payload, endpoint } = args;
  try {
    loading.set("true");
    const result = await fetchProtected({
      fetchFunction: fetchFunction,
      url: `${appConfig.API_BASE_URL}${endpoint}`,
      body: payload,
    });
    stats.set(result);
    loading.set("false");

    return result;
  } catch (error) {
    loading.set("false");
    console.error(`caught error`, error);
    throw error;
  }
};
