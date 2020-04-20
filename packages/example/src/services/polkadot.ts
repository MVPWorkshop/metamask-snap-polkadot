import {origin} from "./metamask";
import {PolkadotApi} from "@nodefactory/metamask-polkadot-types";

let api: PolkadotApi;

export async function getPolkadotApi(): Promise<PolkadotApi|undefined> {
    if (!api) {
        try {
            let index = await window.ethereum.requestIndex();
            api = await index.getPluginApi(origin);
        } catch (e) {
            console.log(e);
        }
    }
    return api;
}