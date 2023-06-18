import type { TStay } from "./stay.type";

export type TApiArgs = {
    fetchFunction: any;
    payload: TStay;
    endpoint: string
}