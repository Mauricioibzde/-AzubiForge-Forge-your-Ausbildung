import type { AzubiForgeData } from "../types";

declare global {
  interface Window {
    AZUBIFORGE_DATA?: AzubiForgeData;
  }
}

export function getCourseData(): AzubiForgeData {
  if (!window.AZUBIFORGE_DATA) {
    throw new Error("AZUBIFORGE_DATA was not loaded. Check data.js script order in index.html.");
  }

  return window.AZUBIFORGE_DATA;
}
