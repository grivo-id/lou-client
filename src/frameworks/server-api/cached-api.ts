import { cache } from "react";
import { getServerAllAddOns, getServerCakeByName } from "./cakes-server-api";

export const getCachedCakeByName = cache(async (cakeName: string) => {
  return getServerCakeByName(cakeName);
});

export const getCachedAllAddOns = cache(async () => {
  return getServerAllAddOns();
});
